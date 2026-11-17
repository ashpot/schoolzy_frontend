import type { SchoolSubscription } from "../types/detail";
import { PLAN_DEFAULTS } from "../utils/constants";
import { mockDelay } from "./mockApi";

// TODO: Delete once the subscription endpoint exists (tab is gated off by LIVE_TABS).
export async function mockFetchSubscription(_id: string): Promise<SchoolSubscription> {
  await mockDelay(500);
  const p = PLAN_DEFAULTS.Premium;
  return {
    plan: "Premium",
    billingCycle: "Annual",
    renewalDate: "2026-12-01",
    nextInvoice: p.price,
    usage: {
      students: { used: 1240, limit: p.students },
      teachers: { used: 68, limit: p.teachers },
      storage: { used: 14.2, limit: p.storageGb },
    },
    timeline: [
      { id: "1", label: "Trial Started", date: "2025-11-17", done: true },
      { id: "2", label: "Subscription Activated", date: "2025-12-01", done: true },
      { id: "3", label: "Last Renewal", date: "2025-12-01", done: true },
      { id: "4", label: "Next Renewal", date: "2026-12-01", done: false },
    ],
    planSummary: p,
  };
}