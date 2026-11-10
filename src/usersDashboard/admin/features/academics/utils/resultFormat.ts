import { gradeStyles } from "@/shared/utils/gradeUtils";

export const ordinal = (n: number | null): string => {
  if (n === null) return "—";
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

export const fmt = (n: number | null, digits = 2): string =>
  n === null ? "—" : String(Number(n.toFixed(digits)));

// Safe lookup: backend may send "" or an unexpected grade
export const gradeBadge = (grade: string): string =>
  (gradeStyles as Record<string, string>)[grade] ??
  "border border-border-line02 bg-bg-input text-text-muted";

export const formatLongDate = (iso?: string | null): string => {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

export const getInitials = (name: string): string =>
  name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();