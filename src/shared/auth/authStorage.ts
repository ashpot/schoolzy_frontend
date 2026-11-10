export type Role = "Admin" | "Teacher" | "Student" | "Parent";

export interface SessionUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  role: string;
}

const TOKEN_KEY = "schoolzy_token";
const USER_KEY = "schoolzy_user";

const ROLES: Record<string, Role> = {
  admin: "Admin", teacher: "Teacher", student: "Student", parent: "Parent",
};

export const normalizeRole = (role?: string | null): Role | null =>
  role ? ROLES[role.trim().toLowerCase()] ?? null : null;

export const getToken = (): string | null => {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
};

export const getUser = (): SessionUser | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch { return null; }
};

export const setSession = (token: string, user: SessionUser): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Wipes everything on this origin (token, user, school_details, ...)
// so the next person on this browser inherits nothing.
export const clearSession = (): void => {
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch { /* storage unavailable */ }
};

// A session only counts if there is a token AND a user with a role we recognise.
// This also prevents redirect loops when the stored role is missing or unexpected.
export const isAuthenticated = (): boolean =>
  Boolean(getToken() && normalizeRole(getUser()?.role));