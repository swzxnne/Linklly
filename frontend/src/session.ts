import type { Session } from "./types";

const keys = {
  token: "linklly_token",
  username: "linklly_username",
};

export function getSession(): Session {
  return {
    token: localStorage.getItem(keys.token) ?? "",
    username: localStorage.getItem(keys.username) ?? "",
  };
}

export function saveSession(session: Partial<Session>) {
  if (session.token !== undefined) localStorage.setItem(keys.token, session.token);
  if (session.username !== undefined) localStorage.setItem(keys.username, session.username);
}

export function clearSession() {
  localStorage.removeItem(keys.token);
  localStorage.removeItem(keys.username);
}

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
}
