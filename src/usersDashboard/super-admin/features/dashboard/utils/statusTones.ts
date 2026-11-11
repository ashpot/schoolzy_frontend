import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { Plan, SchoolStatus, PaymentStatus } from "../types";

export const RENEWAL_URGENT_DAYS = 7;

export const planTone: Record<Plan, Tone> = {
  Premium: "blue",
  Standard: "green",
  Basic: "gray",
};

export const schoolStatusTone: Record<SchoolStatus, Tone> = {
  Active: "green",
  Trial: "amber",
  Suspended: "red",
};

export const paymentStatusTone: Record<PaymentStatus, Tone> = {
  Paid: "green",
  Pending: "amber",
  Failed: "red",
};