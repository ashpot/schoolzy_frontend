const parse = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
};

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const todayIso = () => toIso(startOfToday());

export const isoFromOffset = (days: number) => {
  const d = startOfToday();
  d.setDate(d.getDate() + days);
  return toIso(d);
};

export const addMonthsIso = (iso: string, months: number) => {
  const d = parse(iso);
  d.setMonth(d.getMonth() + months);
  return toIso(d);
};

// Negative = in the past
export const daysFromToday = (iso: string) =>
  Math.round((parse(iso).getTime() - startOfToday().getTime()) / 86_400_000);

export const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = parse(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const formatNumber = (n: number) => n.toLocaleString("en-US");
export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const formatCompactNaira = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `₦${+(n / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `₦${+(n / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `₦${+(n / 1_000).toFixed(1)}K`;
  return `₦${n}`;
};

export const yearlySavePct = (monthly: number, yearly: number) =>
  monthly > 0 ? Math.max(0, Math.round((1 - yearly / (monthly * 12)) * 100)) : 0;

export const daysLabel = (days: number) =>
  days === 0 ? "Today" : days < 0 ? `${-days}d overdue` : `${days} ${days === 1 ? "day" : "days"}`;

export const daysLabelLong = (days: number) =>
  days === 0 ? "Due today" : days < 0 ? `${-days} days overdue` : `${days} ${days === 1 ? "day" : "days"}`;

export const initials2 = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase() || "?";