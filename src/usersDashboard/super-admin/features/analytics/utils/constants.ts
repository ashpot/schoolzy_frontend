import type { Period } from "../types";

export const PERIODS: { id: Period; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
  { id: "year", label: "This Year" },
];

export const DEFAULT_PERIOD: Period = "30d";

export const compact = (n: number) =>
  n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${+(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K` : String(n);