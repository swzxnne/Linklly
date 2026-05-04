# Linklly Frontend

React + TypeScript frontend built with Vite.

Pages:

- `/auth`: login and register
- `/home`: private dashboard for updating profile and adding/removing links
- `/settings`: authenticated settings page for password reset, logout, and profile deletion
- `/profile/:username`: public profile page that anyone can view without authentication

Run the frontend:

```bash
cd frontend
npm run dev
```

Vite prints the local URL in the terminal. Configure the backend API URL with:

```text
VITE_API_BASE_URL=http://localhost:3000
```

The UI stores the JWT token in `localStorage` after login and sends it as:

```http
Authorization: Bearer <token>
```

Source files live in `src/`.
