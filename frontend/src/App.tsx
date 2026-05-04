import { FormEvent, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import {
  clearSession,
  getApiBaseUrl,
  getSession,
  saveSession,
} from "./session";
import type { LinkItem, PublicProfile, Session, Status } from "./types";

type Route =
  | { name: "auth" }
  | { name: "home" }
  | { name: "settings" }
  | { name: "profile"; username?: string };

function getRoute(): Route {
  const path = window.location.pathname.replace(/\/$/, "");
  const parts = path.split("/").filter(Boolean);
  const last = parts.at(-1);

  if (last === "home") return { name: "home" };
  if (last === "settings") return { name: "settings" };
  if (last === "auth") return { name: "auth" };
  if (last === "profile") {
    return {
      name: "profile",
      username: new URLSearchParams(window.location.search).get("username") ?? undefined,
    };
  }
  if (parts.includes("profile")) {
    return { name: "profile", username: last };
  }

  return getSession().token ? { name: "home" } : { name: "auth" };
}

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function getRouteStatus(route: Route): Status {
  if (route.name === "auth") {
    return { message: "Ready to sign in", tone: "ready" };
  }

  if (route.name === "home") {
    return { message: "Home dashboard ready", tone: "ready" };
  }

  if (route.name === "settings") {
    return { message: "Settings ready", tone: "ready" };
  }

  if (route.username) {
    return { message: "Public profile ready", tone: "ready" };
  }

  return { message: "Enter a username to view a public profile", tone: "ready" };
}

function getFormValues<T extends Record<string, string>>(event: FormEvent<HTMLFormElement>): T {
  event.preventDefault();
  return Object.fromEntries(new FormData(event.currentTarget).entries()) as T;
}

function Shell({
  title,
  status,
  actions,
  children,
  compact = false,
}: {
  title: string;
  status: Status;
  actions?: React.ReactNode;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <main className={`app-shell ${compact ? "app-shell--centered" : ""}`}>
      <header className="topbar">
        <button className="brand-lockup" type="button" onClick={() => navigate("/")}>
          <span>
            <strong>Linklly</strong>
            <small>{title}</small>
          </span>
        </button>
        {actions}
      </header>

      <section className="status-strip" aria-live="polite">
        <span className={`status-light status-light--${status.tone}`} />
        <span>{status.message}</span>
      </section>

      {children}
    </main>
  );
}

function AuthPage({
  apiBaseUrl,
  setStatus,
  status,
  refreshSession,
}: {
  apiBaseUrl: string;
  setStatus: (status: Status) => void;
  status: Status;
  refreshSession: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  useEffect(() => {
    if (getSession().token) navigate("/home");
  }, []);

  async function register(event: FormEvent<HTMLFormElement>) {
    const values = getFormValues<{ email: string; username: string; password: string }>(event);

    try {
      setStatus({ message: "Creating account", tone: "busy" });
      const response = await api.register(apiBaseUrl, values);
      saveSession({ username: values.username });
      refreshSession();
      setLoginUsername(values.username);
      setMode("login");
      setStatus({ message: response.message, tone: "ready" });
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    const values = getFormValues<{ username: string; password: string }>(event);

    try {
      setStatus({ message: "Signing in", tone: "busy" });
      const response = await api.login(apiBaseUrl, values);
      saveSession({ username: values.username, token: response.token });
      refreshSession();
      setStatus({ message: response.message, tone: "ready" });
      navigate("/home");
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  return (
    <Shell
      compact
      title=""
      status={status}
    >
      <section className="auth-layout">
        <section className="panel">
          <header className="panel-heading">
            <span>Account Access</span>
          </header>

          <div className="tabs" role="tablist" aria-label="Authentication mode">
            <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>
              Login
            </button>
            <button className={mode === "register" ? "active" : ""} type="button" onClick={() => setMode("register")}>
              Register
            </button>
          </div>

          {mode === "login" ? (
            <form key="login-form" className="form-stack" onSubmit={login}>
              <label>
                Username
                <input
                  name="username"
                  autoComplete="username"
                  value={loginUsername}
                  onChange={(event) => setLoginUsername(event.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <span className="password-control">
                  <input
                    name="password"
                    type={showLoginPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowLoginPassword((value) => !value)}>
                    {showLoginPassword ? "Hide" : "Show"}
                  </button>
                </span>
              </label>
              <button className="primary-button" type="submit">Sign In</button>
            </form>
          ) : (
            <form key="register-form" className="form-stack" onSubmit={register}>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={registerEmail}
                  onChange={(event) => setRegisterEmail(event.target.value)}
                  required
                />
              </label>
              <label>
                Username
                <input
                  name="username"
                  autoComplete="username"
                  value={registerUsername}
                  onChange={(event) => setRegisterUsername(event.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <span className="password-control">
                  <input
                    name="password"
                    type={showRegisterPassword ? "text" : "password"}
                    minLength={8}
                    autoComplete="new-password"
                    value={registerPassword}
                    onChange={(event) => setRegisterPassword(event.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowRegisterPassword((value) => !value)}>
                    {showRegisterPassword ? "Hide" : "Show"}
                  </button>
                </span>
              </label>
              <button className="primary-button" type="submit">Register</button>
            </form>
          )}
        </section>
      </section>
    </Shell>
  );
}

function HomePage({
  apiBaseUrl,
  session,
  setStatus,
  status,
}: {
  apiBaseUrl: string;
  session: Session;
  setStatus: (status: Status) => void;
  status: Status;
}) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const shareUrl = useMemo(
    () => `${window.location.origin}/profile/${encodeURIComponent(session.username)}`,
    [session.username],
  );

  useEffect(() => {
    if (!session.token) {
      navigate("/auth");
      return;
    }
    void loadLinks();
  }, [session.token]);

  async function loadLinks() {
    try {
      setStatus({ message: "Loading links", tone: "busy" });
      const response = await api.getLinks(apiBaseUrl, session.token);
      setLinks(response.links);
      setStatus({ message: "Links loaded", tone: "ready" });
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    const values = getFormValues<{ name: string; bio: string }>(event);

    try {
      setStatus({ message: "Saving profile", tone: "busy" });
      const response = await api.updateProfile(apiBaseUrl, session.token, values);
      setStatus({ message: response.message, tone: "ready" });
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  async function createLink(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const values = getFormValues<{ title: string; url: string }>(event);

    try {
      setStatus({ message: "Adding link", tone: "busy" });
      const response = await api.createLink(apiBaseUrl, session.token, values);
      form.reset();
      setStatus({ message: response.message, tone: "ready" });
      await loadLinks();
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  async function editLink(link: LinkItem) {
    const title = window.prompt("Title", link.title);
    if (title === null) return;
    const url = window.prompt("URL", link.url);
    if (url === null) return;

    try {
      setStatus({ message: "Updating link", tone: "busy" });
      const response = await api.updateLink(apiBaseUrl, session.token, link.id, { title, url });
      setStatus({ message: response.message, tone: "ready" });
      await loadLinks();
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  async function deleteLink(id: number) {
    if (!window.confirm("Remove this link?")) return;

    try {
      setStatus({ message: "Removing link", tone: "busy" });
      const response = await api.deleteLink(apiBaseUrl, session.token, id);
      setStatus({ message: response.message, tone: "ready" });
      await loadLinks();
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus({ message: "Profile link copied", tone: "ready" });
    } catch {
      setStatus({ message: "Could not copy profile link", tone: "error" });
    }
  }

  return (
    <Shell
      title={session.username ? `User: ${session.username}` : "Home"}
      status={status}
      actions={
        <nav className="top-actions" aria-label="Home actions">
          <button type="button" onClick={() => navigate(`/profile/${encodeURIComponent(session.username)}`)}>Public</button>
          <button type="button" onClick={() => navigate("/settings")}>Settings</button>
        </nav>
      }
    >
      <section className="dashboard-grid">
        <section className="panel">
          <header className="panel-heading">
            <span>Update Profile</span>
          </header>
          <form className="form-stack" onSubmit={updateProfile}>
            <label>
              Name
              <input name="name" placeholder="Suzanne" />
            </label>
            <label>
              Bio
              <textarea name="bio" rows={5} placeholder="Building Linklly" />
            </label>
            <button className="primary-button" type="submit">Save</button>
          </form>
          <label className="share-field">
            Share page
            <button className="copy-field" type="button" onClick={copyShareUrl}>
              {shareUrl}
            </button>
          </label>
        </section>

        <section className="panel links-panel">
          <header className="panel-heading">
            <span>Manage Links</span>
            <button className="icon-button" type="button" onClick={loadLinks}>R</button>
          </header>

          <form className="link-form" onSubmit={createLink}>
            <label>
              Title
              <input name="title" placeholder="GitHub" required />
            </label>
            <label>
              URL
              <input name="url" type="url" placeholder="https://github.com/swzxnne" required />
            </label>
            <button className="primary-button" type="submit">Add</button>
          </form>

          <div className="link-list">
            {links.length === 0 ? (
              <div className="empty-state">No links yet</div>
            ) : (
              links.map((link) => (
                <article className="link-card" key={link.id}>
                  <div>
                    <h3>{link.title}</h3>
                    <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
                  </div>
                  <span className="score">{link.clickCount}</span>
                  <div className="card-actions">
                    <button type="button" onClick={() => editLink(link)}>Edit</button>
                    <button type="button" onClick={() => deleteLink(link.id)}>Delete</button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </Shell>
  );
}

function SettingsPage({
  apiBaseUrl,
  session,
  setStatus,
  status,
  refreshSession,
}: {
  apiBaseUrl: string;
  session: Session;
  setStatus: (status: Status) => void;
  status: Status;
  refreshSession: () => void;
}) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (!session.token) navigate("/auth");
  }, [session.token]);

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const values = getFormValues<{ oldPassword: string; newPassword: string }>(event);

    try {
      setStatus({ message: "Resetting password", tone: "busy" });
      const response = await api.resetPassword(apiBaseUrl, session.token, values);
      form.reset();
      setStatus({ message: response.message, tone: "ready" });
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  async function deleteProfile() {
    if (!window.confirm("Delete your profile permanently?")) return;

    try {
      setStatus({ message: "Deleting profile", tone: "busy" });
      const response = await api.deleteProfile(apiBaseUrl, session.token);
      clearSession();
      refreshSession();
      setStatus({ message: response.message, tone: "ready" });
      navigate("/auth");
    } catch (error) {
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  function logout() {
    clearSession();
    refreshSession();
    navigate("/auth");
  }

  return (
    <Shell
      title="Settings"
      status={status}
      actions={
        <nav className="top-actions" aria-label="Settings actions">
          <button type="button" onClick={() => navigate("/home")}>Home</button>
        </nav>
      }
    >
      <section className="settings-grid">
        <section className="panel">
          <header className="panel-heading">
            <span>Password</span>
          </header>
          <form className="form-stack" onSubmit={resetPassword}>
            <label>
              Old password
              <span className="password-control">
                <input
                  name="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  required
                />
                <button type="button" onClick={() => setShowOldPassword((value) => !value)}>
                  {showOldPassword ? "Hide" : "Show"}
                </button>
              </span>
            </label>
            <label>
              New password
              <span className="password-control">
                <input
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  minLength={8}
                  required
                />
                <button type="button" onClick={() => setShowNewPassword((value) => !value)}>
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </span>
            </label>
            <button className="danger-button" type="submit">Reset</button>
          </form>
        </section>

        <section className="panel">
          <header className="panel-heading">
            <span>Danger Zone</span>
          </header>
          <button className="secondary-button full-width" type="button" onClick={logout}>
            Logout
          </button>
          <button className="danger-button full-width" type="button" onClick={deleteProfile}>
            Delete Profile
          </button>
        </section>
      </section>
    </Shell>
  );
}

function PublicProfilePage({
  apiBaseUrl,
  routeUsername,
  session,
  status,
  setStatus,
}: {
  apiBaseUrl: string;
  routeUsername?: string;
  session: Session;
  status: Status;
  setStatus: (status: Status) => void;
}) {
  const [username, setUsername] = useState(routeUsername ?? "");
  const [profile, setProfile] = useState<PublicProfile | null>(null);

  useEffect(() => {
    if (routeUsername) void loadProfile(routeUsername);
  }, [routeUsername]);

  async function loadProfile(target = username) {
    if (!target.trim()) {
      setStatus({ message: "Enter a username to view a public profile", tone: "ready" });
      return;
    }

    try {
      setStatus({ message: "Loading public profile", tone: "busy" });
      const response = await api.getPublicProfile(apiBaseUrl, target.trim());
      setProfile(response.data);
      setUsername(response.data.username);
      window.history.replaceState({}, "", `/profile/${encodeURIComponent(response.data.username)}`);
      setStatus({ message: "Public profile loaded", tone: "ready" });
    } catch (error) {
      setProfile(null);
      setStatus({ message: (error as Error).message, tone: "error" });
    }
  }

  function openLink(link: LinkItem) {
    void api.trackClick(apiBaseUrl, link.id);
  }

  const displayName = profile?.profile?.name || profile?.username || "No profile loaded";
  const bio = profile?.profile?.bio || (profile ? "This user has not added a bio yet." : "Shared links will appear here.");

  return (
    <Shell
      title="Public Profile"
      status={status}
      actions={
        <nav className="top-actions" aria-label="Public profile navigation">
          {session.token ? (
            <button type="button" onClick={() => navigate("/settings")}>Settings</button>
          ) : (
            <button type="button" onClick={() => navigate("/auth")}>Login</button>
          )}
          <button type="button" onClick={() => navigate("/home")}>Home</button>
        </nav>
      }
    >
      <section className="public-grid">
        <section className="panel">
          <header className="panel-heading">
            <span>Profile</span>
          </header>
          <div className="public-card">
            <div>
              <h2>{displayName}</h2>
              <p>{bio}</p>
            </div>
          </div>
        </section>

        <section className="panel">
          <header className="panel-heading">
            <span>Links</span>
          </header>
          <div className="public-links">
            {!profile || profile.links.length === 0 ? (
              <div className="empty-state">{profile ? "No links shared yet" : "No profile loaded"}</div>
            ) : (
              profile.links.map((link) => (
                <article className="public-link" key={link.id}>
                  <a href={link.url} target="_blank" rel="noreferrer" onClick={() => openLink(link)}>
                    {link.title || link.url}
                  </a>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </Shell>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);
  const [session, setSession] = useState<Session>(getSession);
  const apiBaseUrl = getApiBaseUrl();
  const [status, setStatus] = useState<Status>(() => getRouteStatus(getRoute()));

  useEffect(() => {
    const onRouteChange = () => setRoute(getRoute());
    window.addEventListener("popstate", onRouteChange);
    return () => window.removeEventListener("popstate", onRouteChange);
  }, []);

  useEffect(() => {
    setStatus(getRouteStatus(route));
  }, [route.name, route.name === "profile" ? route.username : undefined]);

  function refreshSession() {
    setSession(getSession());
  }

  if (route.name === "home") {
    return (
      <HomePage
        apiBaseUrl={apiBaseUrl}
        session={session}
        status={status}
        setStatus={setStatus}
      />
    );
  }

  if (route.name === "settings") {
    return (
      <SettingsPage
        apiBaseUrl={apiBaseUrl}
        session={session}
        status={status}
        setStatus={setStatus}
        refreshSession={refreshSession}
      />
    );
  }

  if (route.name === "profile") {
    return (
      <PublicProfilePage
        apiBaseUrl={apiBaseUrl}
        routeUsername={route.username}
        session={session}
        status={status}
        setStatus={setStatus}
      />
    );
  }

  return (
    <AuthPage
      apiBaseUrl={apiBaseUrl}
      status={status}
      setStatus={setStatus}
      refreshSession={refreshSession}
    />
  );
}
