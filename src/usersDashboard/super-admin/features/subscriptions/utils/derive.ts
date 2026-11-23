import type { BillingCycle, RenewalRow, RenewalStatus, Subscription } from "../types";
import { daysFromToday } from "./format";

export const periodMonths = (b: BillingCycle) => (b === "Annual" ? 12 : 1);

export function renewalStatus(days: number): RenewalStatus {
  if (days < 0) return "Overdue";
  if (days === 0) return "Due Today";
  return days <= 7 ? "Due in 7 Days" : "Upcoming";
}

export const toRenewalRow = (s: Subscription): RenewalRow => {
  const days = daysFromToday(s.expires);
  return { ...s, days, renewalStatus: renewalStatus(days) };
};