import { daysFromToday } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { ChartPoint, Invoice, InvoiceDisplay, PayMethod, Transaction } from "../types";
import { METHODS } from "./constants";

// A pending invoice past its due date shows as Overdue.
export const invoiceDisplay = (i: Invoice): InvoiceDisplay =>
  i.status === "Pending" && daysFromToday(i.dueDate) < 0 ? "Overdue" : i.status;

// Sums amounts into the last `months` calendar months (oldest first).
export function monthlyRevenue<T>(
  items: T[],
  pick: (item: T) => { date: string; amount: number } | null,
  months = 7
): ChartPoint[] {
  const now = new Date();
  const buckets = Array.from({ length: months }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString("en-US", { month: "short" }), value: 0 };
  });
  for (const item of items) {
    const p = pick(item);
    if (!p) continue;
    const [y, m] = p.date.slice(0, 10).split("-").map(Number);
    const bucket = buckets.find((b) => b.key === `${y}-${m - 1}`);
    if (bucket) bucket.value += p.amount;
  }
  return buckets.map(({ label, value }) => ({ label, value }));
}

export function planRevenue(txns: Transaction[]) {
  const totals = new Map<string, number>();
  for (const t of txns) if (t.status === "Successful") totals.set(t.plan, (totals.get(t.plan) ?? 0) + t.amount);
  return Array.from(totals, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

export function methodShares(txns: Transaction[]): { method: PayMethod; pct: number }[] {
  const total = txns.length || 1;
  return METHODS.map((method) => ({
    method,
    pct: Math.round((txns.filter((t) => t.method === method).length / total) * 100),
  }));
}