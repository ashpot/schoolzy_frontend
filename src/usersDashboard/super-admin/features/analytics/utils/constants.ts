import type { Period } from "../types";
import type { RevenuePeriod } from "../types/revenue";
import type { GrowthPeriod } from "../types/growth";

export const PERIODS: { id: Period; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
  { id: "year", label: "This Year" },
];

export const DEFAULT_PERIOD: Period = "30d";

export const REVENUE_PERIODS: { id: RevenuePeriod; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "yearly", label: "Yearly" },
];

export const GROWTH_PERIODS: { id: GrowthPeriod; label: string }[] = [
  { id: "month", label: "Last Month" },
  { id: "quarter", label: "Quarter" },
  { id: "year", label: "Year" },
];

export const compact = (n: number) =>
  n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${+(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K` : String(n);