export const formatNumber = (n: number) => n.toLocaleString("en-US");

export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
};

// "2026-07-10" + 14 → "2026-07-24"
export const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return "";
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const signed = (n: number) => (n > 0 ? `+${n}` : `${n}`);