export const formatCompactNaira = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `₦${+(n / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `₦${+(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `₦${+(n / 1_000).toFixed(1)}K`;
  return `₦${n}`;
};

export const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${date} · ${time}`;
};

export const percentOf = (used: number, limit: number) =>
  limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;