import type { ApiErrorBody, LinkItem, PublicProfile } from "./types";

type RequestOptions = RequestInit & {
  token?: string;
  public?: boolean;
};

async function request<T>(baseUrl: string, path: string, options: RequestOptions = {}): Promise<T> {
  const cleanBaseUrl = baseUrl.trim().replace(/\/$/, "");
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token && !options.public) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${cleanBaseUrl}${path}`, {
    ...options,
    headers,
  });
  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const body = data as ApiErrorBody | string;
    const message = typeof body === "string"
      ? body
      : body.message ?? body.error ?? "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export const api = {
  register(baseUrl: string, body: { email: string; username: string; password: string }) {
    return request<{ message: string }>(baseUrl, "/register", {
      method: "POST",
      body: JSON.stringify(body),
      public: true,
    });
  },

  login(baseUrl: string, body: { username: string; password: string }) {
    return request<{ message: string; token: string }>(baseUrl, "/login", {
      method: "POST",
      body: JSON.stringify(body),
      public: true,
    });
  },

  getPublicProfile(baseUrl: string, username: string) {
    return request<{ message: string; data: PublicProfile }>(
      baseUrl,
      `/profile/${encodeURIComponent(username)}`,
      { public: true },
    );
  },

  updateProfile(baseUrl: string, token: string, body: { name: string; bio: string }) {
    return request<{ message: string }>(baseUrl, "/profile", {
      method: "PATCH",
      token,
      body: JSON.stringify(body),
    });
  },

  resetPassword(baseUrl: string, token: string, body: { oldPassword: string; newPassword: string }) {
    return request<{ message: string }>(baseUrl, "/reset", {
      method: "PATCH",
      token,
      body: JSON.stringify(body),
    });
  },

  deleteProfile(baseUrl: string, token: string) {
    return request<{ message: string }>(baseUrl, "/delete", {
      method: "DELETE",
      token,
    });
  },

  getLinks(baseUrl: string, token: string) {
    return request<{ message: string; links: LinkItem[] }>(baseUrl, "/links", { token });
  },

  createLink(baseUrl: string, token: string, body: { title: string; url: string }) {
    return request<{ message: string; link: LinkItem }>(baseUrl, "/links", {
      method: "POST",
      token,
      body: JSON.stringify(body),
    });
  },

  updateLink(baseUrl: string, token: string, id: number, body: { title: string; url: string }) {
    return request<{ message: string; link: LinkItem }>(baseUrl, `/links/${id}`, {
      method: "PATCH",
      token,
      body: JSON.stringify(body),
    });
  },

  deleteLink(baseUrl: string, token: string, id: number) {
    return request<{ message: string }>(baseUrl, `/links/${id}`, {
      method: "DELETE",
      token,
    });
  },

  trackClick(baseUrl: string, id: number) {
    return request<{ message: string; link: LinkItem }>(baseUrl, `/links/${id}/click`, {
      method: "POST",
      public: true,
    });
  },
};
