export interface SchoolDetails {
  favicon?: string | null;
  logo?: string | null;
  school_name?: string;
  school_slug?: string;
  subscription_plan?: string;
  subscription_price?: string;
}

export const SCHOOL_DETAILS_KEY = "school_details";

export function getSchoolDetails(): SchoolDetails | null {
  try {
    return JSON.parse(localStorage.getItem(SCHOOL_DETAILS_KEY) ?? "null");
  } catch {
    return null;
  }
}

// "95000.00" -> "₦95,000"
export function formatNaira(value?: string): string {
  const n = Number(value);
  if (!value || Number.isNaN(n)) return "—";
  if (n === 0) return "Free";
  return `₦${n.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}

type PlanTone = { badge: string; dot: string };

const PLAN_TONES: Record<string, PlanTone> = {
  free: { badge: "bg-bg-soft text-text-muted01 border-border-line02", dot: "bg-text-muted" },
  basic: { badge: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500" },
  standard: { badge: "bg-indigo-50 text-indigo-700 border-indigo-100", dot: "bg-indigo-500" },
  premium: { badge: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500" },
};

export const getPlanTone = (plan?: string): PlanTone =>
  PLAN_TONES[(plan ?? "").toLowerCase()] ?? PLAN_TONES.free;