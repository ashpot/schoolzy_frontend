import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { RenewalStatus, SubStatus } from "../types";

export const subStatusTone: Record<SubStatus, Tone> = {
  Active: "green",
  Trial: "blue",
  Expired: "red",
  Suspended: "gray",
};

export const renewalTone: Record<RenewalStatus, Tone> = {
  Overdue: "red",
  "Due Today": "amber",
  "Due in 7 Days": "amber",
  Upcoming: "blue",
};

const PLAN_TONES: Record<string, Tone> = { premium: "blue", standard: "green", basic: "gray" };
export const planTone = (name: string): Tone => PLAN_TONES[name.toLowerCase()] ?? "gray";

const TILE_TONES: Tone[] = ["blue", "green", "red", "amber", "purple"];

// Same school always gets the same tinted tile
export const schoolTileClass = (name: string) => {
  const sum = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0);
  return toneIconTile[TILE_TONES[sum % TILE_TONES.length]];
};

export const usageBarTone = (pct: number): Tone => (pct >= 95 ? "red" : pct >= 80 ? "amber" : "blue");