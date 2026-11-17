import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { SchoolStatus } from "../types";

export const schoolStatusTone: Record<SchoolStatus, Tone> = {
  Active: "green",
  Trial: "amber",
  Pending: "amber",
  Suspended: "red",
  Expired: "gray",
  Unknown: "gray",
};

const PLAN_TONES: Record<string, Tone> = {
  premium: "blue",
  standard: "green",
  basic: "gray",
};

// Plan names come from the backend, so unknown or missing plans fall back to grey.
export const planTone = (plan: string | null): Tone =>
  plan ? PLAN_TONES[plan.toLowerCase()] ?? "gray" : "gray";

const AVATARS = [
  "bg-sa-avatar-green",
  "bg-sa-avatar-amber",
  "bg-sa-avatar-purple",
  "bg-sa-avatar-blue",
  "bg-sa-avatar-red",
  "bg-sa-avatar-teal",
  "bg-sa-avatar-pink",
] as const;

// Same school name always gets the same colour
export function avatarClass(name: string) {
  const sum = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATARS[sum % AVATARS.length];
}

export const getInitial = (name: string) => name.trim()[0]?.toUpperCase() ?? "?";