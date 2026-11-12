export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const formatCompactNaira = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `₦${+(n / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `₦${+(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `₦${+(n / 1_000).toFixed(1)}K`;
  return `₦${n}`;
};

export const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const timeAgo = (iso?: string | null) => {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const mins = Math.max(0, Math.round((Date.now() - t) / 60_000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

export const daysUntil = (iso?: string | null): number | null => {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? null : Math.max(0, Math.ceil((t - Date.now()) / 86_400_000));
};

// "PROVISIONING" → "Provisioning", "in_progress" → "In progress"
export const titleCase = (s: string) =>
  s.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());