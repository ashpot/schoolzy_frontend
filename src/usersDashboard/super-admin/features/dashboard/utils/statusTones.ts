import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";

export const RENEWAL_URGENT_DAYS = 7;

const planMap: Record<string, Tone> = {
  premium: "blue",
  standard: "green",
  basic: "gray",
};

const schoolStatusMap: Record<string, Tone> = {
  active: "green",
  trial: "amber",
  provisioning: "amber",
  pending: "amber",
  suspended: "red",
};

const paymentStatusMap: Record<string, Tone> = {
  paid: "green",
  success: "green",
  successful: "green",
  pending: "amber",
  failed: "red",
};

// Unknown values fall back to grey so a new backend status never breaks the UI.
const lookup = (map: Record<string, Tone>, key: string): Tone => map[key.toLowerCase()] ?? "gray";

export const planTone = (plan: string) => lookup(planMap, plan);
export const schoolStatusTone = (status: string) => lookup(schoolStatusMap, status);
export const paymentStatusTone = (status: string) => lookup(paymentStatusMap, status);