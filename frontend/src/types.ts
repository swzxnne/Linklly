export type StatusTone = "ready" | "busy" | "error";

export type Status = {
  message: string;
  tone: StatusTone;
};

export type Session = {
  token: string;
  username: string;
};

export type LinkItem = {
  id: number;
  title: string;
  url: string;
  clickCount: number;
  userId: number;
};

export type Profile = {
  name: string;
  bio: string;
};

export type PublicProfile = {
  username: string;
  email: string;
  profile: Profile | null;
  links: LinkItem[];
};

export type ApiErrorBody = {
  message?: string;
  error?: string;
};
