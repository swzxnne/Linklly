# Backend Code Review — Linklly

Friendly review for first portfolio project. Lots of solid foundations: Prisma schema, bcrypt for passwords, JWT auth, validation middleware, ownership checks on link mutations. Below are issues to fix before showing this off, grouped by severity.

Files reviewed:

- [src/app.ts](../src/app.ts)
- [src/controllers/auth.controller.ts](../src/controllers/auth.controller.ts)
- [src/controllers/user.controller.ts](../src/controllers/user.controller.ts)
- [src/controllers/link.controller.ts](../src/controllers/link.controller.ts)
- [src/middlewares/validate.middleware.ts](../src/middlewares/validate.middleware.ts)
- [src/routes/auth.route.ts](../src/routes/auth.route.ts)
- [src/routes/user.route.ts](../src/routes/user.route.ts)
- [src/routes/link.route.ts](../src/routes/link.route.ts)
- [src/utils/jwt.ts](../src/utils/jwt.ts)
- [lib/prisma.ts](../lib/prisma.ts)
- [prisma/schema.prisma](../prisma/schema.prisma)

---

## CRITICAL — fix before any deployment

### 1. JWT secret hardcoded in source

[src/utils/jwt.ts:3](../src/utils/jwt.ts#L3)

```ts
const JWT_SECRET = "1234567890qwertyuiopasdfghjkl";
```

Anyone reading the repo can forge tokens for any user. Move to env var.

```ts
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not set");
```

Add `JWT_SECRET=...` to `.env`. Confirm `.env` is in `.gitignore`.

### 2. JWT `expiresIn` format invalid — `'1hr'`

[src/utils/jwt.ts:6](../src/utils/jwt.ts#L6)

```ts
jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" });
```

`jsonwebtoken` uses the `ms` library. `'1hr'` is **not** a valid unit — valid is `'1h'`, `'60m'`, `3600`, etc. Newer versions throw, older silently misinterpret. Tokens may never expire or sign call may crash.
Fix: `expiresIn: '1h'`.

### 3. `resetPassword` writes to wrong field — runtime crash

[src/controllers/user.controller.ts:78-81](../src/controllers/user.controller.ts#L78-L81)

```ts
await prisma.user.update({
  where: { id: userId },
  data: { password: newHashPassword }, // ❌ field is `hashPassword`
});
```

Schema field is `hashPassword` ([prisma/schema.prisma:14](../prisma/schema.prisma#L14)). This always throws, password reset is fully broken. Change to `data: { hashPassword: newHashPassword }`.

### 4. `deleteUser` will fail — missing cascade

[prisma/schema.prisma:10-42](../prisma/schema.prisma#L10-L42)

`User` has `links` and `profile` foreign keys. Without `onDelete: Cascade`, deleting a user with any link/profile throws Postgres FK violation. Same for `Link → ClickEvent`.

Fix schema:

```prisma
model Profile {
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  ...
}
model Link {
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  ...
}
model ClickEvent {
  link Link @relation(fields: [linkId], references: [id], onDelete: Cascade)
  ...
}
```

Then `prisma migrate dev`.

### 5. Public profile leaks email (PII)

[src/controllers/user.controller.ts:12-22](../src/controllers/user.controller.ts#L12-L22)

`/profile/:username` is unauthenticated and returns `email`. Anyone can scrape email addresses by username. Drop `email: true` from the select. Public profile should expose username, profile (bio, name), links only.

### 6. Click endpoint unauthenticated + unrate-limited — count inflation

[src/routes/link.route.ts:17](../src/routes/link.route.ts#L17)

```ts
router.post("/links/:id/click", incrementClick);
```

Anyone can spam this and inflate any link's count. At minimum, rate-limit by IP + linkId. Better: dedupe by IP/session window.

### 7. No URL validation on link `url` — XSS / open redirect risk

[src/controllers/link.controller.ts:7-16](../src/controllers/link.controller.ts#L7-L16)

User can submit `javascript:alert(1)` or `data:` URLs. When the frontend renders these as anchors, they execute on click. Validate scheme is `http`/`https` only.

```ts
import validator from "validator";
if (
  !validator.isURL(url, {
    protocols: ["http", "https"],
    require_protocol: true,
  })
) {
  return res.status(400).json({ message: "Invalid URL" });
}
```

### 8. Username enumeration on login

[src/controllers/auth.controller.ts:35-47](../src/controllers/auth.controller.ts#L35-L47)

Returns `404 "User not found"` vs `401 "Invalid password"`. Attacker learns which usernames exist. Always return same generic 401 for both cases:

```ts
return res.status(401).json({ message: "Invalid credentials" });
```

Same applies to register: `"User already exists"` vs `"Email already exists"` reveals account existence — consider unifying.

---

## HIGH — security & correctness

### 9. No rate limiting anywhere

`/register`, `/login`, `/reset`, `/click` all unrestricted. Brute-force passwords trivial. Add `express-rate-limit`:

```ts
import rateLimit from "express-rate-limit";
app.use("/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));
```

### 10. CORS wildcard

[src/app.ts:15-25](../src/app.ts#L15-L25)

```ts
res.header("Access-Control-Allow-Origin", "*");
```

Any site can call your API from a victim's browser. Use the `cors` package with an allowlist:

```ts
import cors from "cors";
app.use(cors({ origin: ["https://linklly.app", "http://localhost:5173"] }));
```

### 11. No security headers (no `helmet`)

Add `helmet`:

```ts
import helmet from "helmet";
app.use(helmet());
```

### 12. Error responses leak internals

[src/controllers/link.controller.ts:21](../src/controllers/link.controller.ts#L21), [user.controller.ts:50](../src/controllers/user.controller.ts#L50), [user.controller.ts:108](../src/controllers/user.controller.ts#L108)

```ts
res.status(500).json({ message: "Failed", error: error.message });
```

Returns raw Prisma/DB errors to clients. Log server-side, return generic message:

```ts
console.error(error);
res.status(500).json({ message: "Internal error" });
```

### 13. `verifyToken` return type unsafe

[src/utils/jwt.ts:9-11](../src/utils/jwt.ts#L9-L11) + [validate.middleware.ts:21](../src/middlewares/validate.middleware.ts#L21)

`jwt.verify` returns `string | JwtPayload`. Destructuring `.userId` blindly works only if payload is object. Tighten:

```ts
import jwt, { type JwtPayload } from "jsonwebtoken";
export const verifyToken = (token: string): JwtPayload & { userId: number } => {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded === "string" || typeof decoded.userId !== "number") {
    throw new Error("Invalid token payload");
  }
  return decoded as JwtPayload & { userId: number };
};
```

### 14. Weak password policy

[validate.middleware.ts:50-52](../src/middlewares/validate.middleware.ts#L50-L52)

Only length ≥ 8. No check for digits/symbols/common passwords. Use `validator.isStrongPassword` or zxcvbn.

### 15. Email/username not normalized

Email stored as typed (`Foo@Bar.com` ≠ `foo@bar.com`). Use `validator.normalizeEmail` and `email.toLowerCase().trim()` before insert and lookup. Otherwise duplicate signups possible.

### 16. TOCTOU in `checkExisting`

[validate.middleware.ts:54-81](../src/middlewares/validate.middleware.ts#L54-L81)

Two findUnique calls then create — race between two concurrent registrations. Prisma's unique constraint already protects you; just rely on it and catch `P2002`:

```ts
try { await prisma.user.create(...) }
catch (e) { if (e.code === "P2002") return res.status(409)... }
```

Drop the pre-check entirely.

### 17. No body-size limit / no global error handler

- `express.json()` defaults to 100kb — explicit is better: `express.json({ limit: "10kb" })`.
- No `app.use((err, req, res, next) => ...)` global handler. Express 5 catches async errors but default handler may leak stack traces in dev.

### 18. `bcrypt` cost factor 10

Acceptable but 12 is current OWASP recommendation for new apps.

### 19. No HTTPS enforcement / no `trust proxy`

When behind a reverse proxy, set `app.set("trust proxy", 1)` and redirect HTTP→HTTPS in production.

### 20. `incrementClick` not in transaction

[link.controller.ts:118-132](../src/controllers/link.controller.ts#L118-L132)

ClickEvent insert and link update are separate. If first succeeds and second fails, counts diverge. Wrap in `prisma.$transaction([...])`.

---

## MEDIUM — REST API design

### 21. Routes inconsistent and not RESTful

[src/routes/](../src/routes/)

| Current                  | Issue                                      | Suggested                        |
| ------------------------ | ------------------------------------------ | -------------------------------- |
| `POST /register`         | Not under resource                         | `POST /api/v1/auth/register`     |
| `POST /login`            | Same                                       | `POST /api/v1/auth/login`        |
| `PATCH /profile`         | No resource id (good for "me" but unclear) | `PATCH /api/v1/users/me/profile` |
| `GET /profile/:username` | Mixes "me" semantics with public           | `GET /api/v1/users/:username`    |
| `PATCH /reset`           | Verb-based, not resource                   | `PUT /api/v1/users/me/password`  |
| `DELETE /delete`         | Verb in path                               | `DELETE /api/v1/users/me`        |
| `POST /links/:id/click`  | Singular sub-resource                      | `POST /api/v1/links/:id/clicks`  |

Mount versioned prefix: `app.use("/api/v1", router)`. Don't mount three routers all at `/` — collision risk if any path overlaps.

### 22. Plural nouns missing on top-level

`/profile`, `/reset`, `/delete` → `/users`, `/users/me/password`. Standard REST uses plural collection nouns.

### 23. HTTP verbs misused

- `PATCH /reset` for password change → `PUT` (replacement) or `POST` to a `/password` action endpoint.
- `DELETE /delete` — verb redundant in path.

### 24. Wrong status code on error path

[validate.middleware.ts:78-80](../src/middlewares/validate.middleware.ts#L78-L80)

```ts
catch (error) {
  return res.status(409).json({ message: "Error checking existing users" });
}
```

DB error → 500, not 409 (conflict).

[user.controller.ts:107-109](../src/controllers/user.controller.ts#L107-L109)

```ts
} else {
  return res.status(404).json({ error });   // generic error → 500
}
```

### 25. `updateLink` empty-string falsy bug

[link.controller.ts:66-67](../src/controllers/link.controller.ts#L66-L67)

```ts
title: title || existingLink.title,
url: url || existingLink.url,
```

If client sends `title: ""` to clear, it silently keeps the old value. Use explicit undefined check:

```ts
title: title !== undefined ? title : existingLink.title,
```

(Or validate that title is non-empty if required.)

### 26. No input validation on `createLink` / `updateLink`

[link.controller.ts:7](../src/controllers/link.controller.ts#L7)

`title`, `url` taken from body without checks. Missing values → Prisma throws 500 instead of clean 400. Add validators (length, presence, URL format).

### 27. No pagination

`GET /profile/:username` returns **all** links. `GET /links` returns all. With many links this is slow + DoS vector. Add `?limit=&offset=` or cursor pagination.

### 28. No length caps on user-supplied strings

`bio`, `name`, `title`, `url`, `username`, `email` have no max length in schema or validation. User can submit megabyte strings → DB bloat. Add Prisma `@db.VarChar(...)` and validate in middleware.

### 29. `registerNewUser` missing try/catch

[auth.controller.ts:7-28](../src/controllers/auth.controller.ts#L7-L28)

Express 5 forwards async errors but you have no global handler. A unique-constraint clash (after race) would crash with default error response leaking details.

### 30. `incrementClick` doesn't verify link exists before insert

ClickEvent FK to a non-existent linkId throws Postgres error → 500. Either check existence or catch P2003.

---

## LOW — code quality / nits

### 31. `(req as any).user` everywhere

Cast loses types. Define and export the `AuthRequest` interface (you already have it in [validate.middleware.ts:6](../src/middlewares/validate.middleware.ts#L6)) and use it in controllers.

### 32. `user!` non-null assertions after `if (user == null) return`

[auth.controller.ts:39](../src/controllers/auth.controller.ts#L39), [user.controller.ts:67](../src/controllers/user.controller.ts#L67) — TS already narrows after the guard, drop the `!`.

### 33. Mixed import paths for prisma

[user.controller.ts:3](../src/controllers/user.controller.ts#L3) uses `"../../lib/prisma"` while others use `"../../lib/prisma.ts"`. Pick one (no `.ts` is more conventional).

### 34. Inconsistent response shapes

Some endpoints return `{ message, user }`, others `{ message, data }`, errors mix `{ error }` vs `{ message }`. Standardize:

```ts
{ data: ..., error: null }
// or
{ error: { code, message } }
```

### 35. (see Dead Code section below)

### 36. `"start": "ts-node src/app.ts"` in production

[package.json](../package.json) — production should run compiled JS (`tsc && node dist/app.js`), not `ts-node`. Slower startup, larger memory.

### 37. `validator` imported but `express-validator` listed in deps and never used

Pick one (express-validator integrates better with middleware chains).

### 38. CORS preflight returns 204 but allows `*` with `Authorization` header

Browsers refuse `Authorization` from wildcard origin if credentials needed. With token in header (no cookies) you're OK now, but if you ever switch to cookie auth, this breaks.

### 39. `Profile` created in separate call, not transaction

[auth.controller.ts:10-25](../src/controllers/auth.controller.ts#L10-L25)

If `profile.create` fails after `user.create` succeeds, you have an orphan user. Use `prisma.$transaction` or nested write:

```ts
prisma.user.create({
  data: {
    email,
    username,
    hashPassword: newHashPassword,
    profile: { create: { bio: "", name: "" } },
  },
});
```

### 40. `clickCount` no default

[schema.prisma:31](../prisma/schema.prisma#L31). Add `@default(0)` so app code doesn't have to set it.

### 41. Hardcoded port

[app.ts:6](../src/app.ts#L6) — `const port = 3000;` should read `process.env.PORT ?? 3000`.

---

## DEAD CODE — delete these

Unused code rots, confuses reviewers, and bloats the repo. Drop everything below.

### D1. `DBSERVER.ts` — entire file unused

[DBSERVER.ts](../DBSERVER.ts)

`JsonDB` class never imported anywhere in `src/` or `lib/`. Project switched to Prisma + Postgres. File is leftover from earlier learning phase. **Delete the file.**

Verified:

```
grep -rn "JsonDB\|DBSERVER" src/ lib/   → no matches
```

### D2. `db.json` — companion to deleted file

[db.json](../db.json)

Only read/written by `DBSERVER.ts`. Once that's gone, this is orphan data. **Delete.**

### D3. `doc.md` at repo root — JsonDB tutorial

[doc.md](../doc.md)

Beginner tutorial for the deleted `JsonDB` class. Belongs in a learning notebook, not the project repo. **Delete** (or move out of repo to personal notes).

### D4. Unused `User` type import

[src/controllers/auth.controller.ts:4](../src/controllers/auth.controller.ts#L4)

```ts
import type { User } from "../../generated/prisma/client.ts";
```

`User` never referenced in the file. **Delete the line.**

### D5. Unused dependency: `express-validator`

[package.json](../package.json)

Listed in `dependencies` but never imported. Project uses the `validator` package instead (different library). **Remove from package.json:**

```bash
npm uninstall express-validator
```

### D6. Unused devDependency: `@types/bcrypt`

[package.json](../package.json)

You're using `bcrypt-ts` (which ships its own TS types), not `bcrypt`. The `@types/bcrypt` package is for the C++ `bcrypt` package, unrelated. **Remove:**

```bash
npm uninstall @types/bcrypt
```

### D7. Unused devDependency: `@types/dotenv`

`dotenv` ships its own TypeScript types since v8.2. Also `@types/dotenv` is deprecated. **Remove:**

```bash
npm uninstall @types/dotenv
```

### D8. Dead CORS branch — manual handler will be duplicated

[src/app.ts:15-25](../src/app.ts#L15-L25)

Once you switch to the `cors` npm package (#10), the manual middleware block becomes dead code. Don't leave both — delete the hand-rolled headers.

### D9. Verify `generated/prisma/` is git-ignored

[lib/prisma.ts:3](../lib/prisma.ts#L3) and [auth.controller.ts:4](../src/controllers/auth.controller.ts#L4) import from `generated/prisma/`. If `prisma generate` produces this folder on each install, committing it = dead artifact. Add `generated/` to `.gitignore` if not already.

### D10. `frontend/` folder scope unclear

[frontend/](../frontend/)

If part of this project, fine. If separate experiment, split into own repo or proper monorepo. Mixed unclear scope confuses reviewers.

---

## What's already good

- Bcrypt with proper async hash + compare.
- Ownership check before update/delete on links.
- Prisma `omit: { hashPassword: true }` on register response.
- JWT in `Authorization: Bearer` header (avoids CSRF cookie complications).
- Input validation middleware separated from controllers.
- Schema uses unique constraints on email + username.
- Sensible status codes mostly (201 on create, 401 on auth fail, 403 on forbidden).

Solid bones. Fix the critical four (#1–#4) immediately — those are real bugs/breaches. Rest is polish that will make this a strong portfolio piece.
