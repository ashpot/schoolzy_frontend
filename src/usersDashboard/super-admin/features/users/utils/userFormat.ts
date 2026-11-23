import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { PlatformUser, UserKind, UserStatus } from "../types";

export const KIND_LABEL: Record<UserKind, string> = {
  admin: "School Administrator",
  teacher: "Teacher",
  parent: "Parent",
  student: "Student",
};

export const statusTone: Record<UserStatus, Tone> = {
  Active: "green",
  Inactive: "gray",
  Locked: "red",
};

const AVATARS = [
  "bg-sa-avatar-green",
  "bg-sa-avatar-amber",
  "bg-sa-avatar-purple",
  "bg-sa-avatar-blue",
  "bg-sa-avatar-red",
  "bg-sa-avatar-teal",
  "bg-sa-avatar-pink",
] as const;

// Same name always gets the same colour
export function avatarClass(name: string) {
  const sum = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATARS[sum % AVATARS.length];
}

// "Mrs. Folake Balogun" -> "FB"
export const initials = (name: string) =>
  name
    .replace(/^(mrs?|dr|engr|prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

export const formatDate = (iso: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const formatDateTime = (iso: string | null) => {
  if (!iso) return "Never";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${formatDate(iso)} · ${time}`;
};

export const countStatus = (users: PlatformUser[], status: UserStatus) =>
  users.filter((u) => u.status === status).length;

export const recentCount = (users: PlatformUser[], days: number) => {
  const cutoff = Date.now() - days * 86_400_000;
  return users.filter((u) => new Date(u.createdAt).getTime() >= cutoff).length;
};