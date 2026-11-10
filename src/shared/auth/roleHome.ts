import { normalizeRole, type Role, type SessionUser } from "./authStorage";

// TODO: set these to your real dashboard paths (I haven't seen Routing.tsx's protected section)
export const ROLE_HOME: Record<Role, string> = {
  Admin: "/admin-dashboard",
  Teacher: "/teacher-dashboard",
  Student: "/student-dashboard",
  Parent: "/parent-dashboard",
};

export const homeForUser = (user: SessionUser | null): string => {
  const role = normalizeRole(user?.role);
  return role ? ROLE_HOME[role] : "/auth/signin";
};

// Only allow internal paths ("/x"), never "//evil.com" or "https://..."
export const safeRedirect = (target: string | undefined | null, fallback: string): string =>
  target && target.startsWith("/") && !target.startsWith("//") ? target : fallback;