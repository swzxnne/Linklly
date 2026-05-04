# Linklly Backend Postman Documentation

Base URL:

```text
http://localhost:3000
```

Import the collection:

1. Open Postman.
2. Select **Import**.
3. Choose `docs/Linklly.postman_collection.json`.
4. Use the collection variables:
   - `base_url`: `http://localhost:3000`
   - `token`: set automatically after a successful login, or paste a JWT manually.
   - `username`: update when testing public profile lookup.
   - `link_id`: update with an existing link ID for update/delete/click routes.

Protected routes require:

```http
Authorization: Bearer {{token}}
```

## Auth

### Register User

`POST /register`

Body:

```json
{
  "email": "suzanne@example.com",
  "username": "suzanne",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "suzanne@example.com",
    "username": "suzanne"
  }
}
```

Common errors:

- `400` invalid values, invalid email, or password shorter than 8 characters
- `409` username or email already exists

### Login User

`POST /login`

Body:

```json
{
  "username": "suzanne",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "User logged in successfully",
  "token": "JWT_TOKEN"
}
```

Common errors:

- `400` missing username/password
- `404` user not found
- `401` invalid password

## Profile

### Get Public Profile

`GET /profile/:username`

Example:

```http
GET /profile/suzanne
```

Success response:

```json
{
  "message": "User profile found",
  "data": {
    "username": "suzanne",
    "email": "suzanne@example.com",
    "profile": {
      "bio": "Building Linklly",
      "name": "Suzanne"
    },
    "links": []
  }
}
```

Common errors:

- `400` username is required
- `404` user not found
- `500` database connection failed

### Edit Profile

`PATCH /profile`

Requires bearer token.

Body:

```json
{
  "name": "Suzanne",
  "bio": "Building Linklly"
}
```

Success response:

```json
{
  "message": "Profile updated",
  "user": {
    "id": 1,
    "userId": 1,
    "bio": "Building Linklly",
    "name": "Suzanne"
  }
}
```

Common errors:

- `401` missing or invalid token
- `500` update failed

### Reset Password

`PATCH /reset`

Requires bearer token.

Body:

```json
{
  "oldPassword": "password123",
  "newPassword": "newpassword123"
}
```

Success response:

```json
{
  "message": "Password updated successfully"
}
```

Common errors:

- `401` missing or invalid token, or invalid old password
- `400` new password must be different from old password
- `404` user not found
- `500` server error

### Delete User

`DELETE /delete`

Requires bearer token.

Success response:

```json
{
  "message": "User deleted successfully"
}
```

Common errors:

- `401` missing or invalid token
- `404` user not found or delete failed

## Links

### Create Link

`POST /links`

Requires bearer token.

Body:

```json
{
  "title": "GitHub",
  "url": "https://github.com/swzxnne"
}
```

Success response:

```json
{
  "message": "Link created",
  "link": {
    "id": 1,
    "title": "GitHub",
    "url": "https://github.com/swzxnne",
    "clickCount": 0,
    "userId": 1
  }
}
```

Common errors:

- `401` missing or invalid token
- `500` failed to create link

### Get My Links

`GET /links`

Requires bearer token.

Success response:

```json
{
  "message": "Links retrieved",
  "links": [
    {
      "id": 1,
      "title": "GitHub",
      "url": "https://github.com/swzxnne",
      "clickCount": 0,
      "userId": 1
    }
  ]
}
```

Common errors:

- `401` missing or invalid token
- `500` failed to fetch links

### Update Link

`PATCH /links/:id`

Requires bearer token.

Body:

```json
{
  "title": "Updated GitHub",
  "url": "https://github.com/swzxnne/Linklly"
}
```

Success response:

```json
{
  "message": "Link updated",
  "link": {
    "id": 1,
    "title": "Updated GitHub",
    "url": "https://github.com/swzxnne/Linklly",
    "clickCount": 0,
    "userId": 1
  }
}
```

Common errors:

- `401` missing or invalid token
- `403` link belongs to another user
- `404` link not found
- `500` failed to update link

### Delete Link

`DELETE /links/:id`

Requires bearer token.

Success response:

```json
{
  "message": "Link deleted successfully"
}
```

Common errors:

- `401` missing or invalid token
- `403` link belongs to another user
- `404` link not found
- `500` failed to delete link

### Track Link Click

`POST /links/:id/click`

This endpoint is public and does not require a token.

Success response:

```json
{
  "message": "Click tracked",
  "link": {
    "id": 1,
    "title": "GitHub",
    "url": "https://github.com/swzxnne",
    "clickCount": 1,
    "userId": 1
  }
}
```

Common errors:

- `500` failed to track click
