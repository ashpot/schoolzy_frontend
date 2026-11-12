import type {
  ActivityType,
  ApiDashboard,
  ApiPlatformHealth,
  ChartPoint,
  DashboardData,
  HealthMetric,
  HealthStatus,
  StatCardData,
  Trend,
} from "../types";
import { daysUntil, formatCompactNaira, titleCase, timeAgo } from "./format";

const num = (v: unknown): number | null => {
  const n = typeof v === "string" ? Number(v) : (v as number);
  return typeof n === "number" && Number.isFinite(n) ? n : null;
};

const countTrend = (n: number): Trend => (n > 0 ? "up" : "unchanged");
const signed = (n: number) => `${n > 0 ? "+" : ""}${n}`;

function mapStats(s: ApiDashboard["summary"]): StatCardData[] {
  const revTrend: Trend =
    s.revenue_trend === "up" || s.revenue_trend === "down" ? s.revenue_trend : "unchanged";
  const pct = s.revenue_change_percentage;

  return [
    {
      id: "totalSchools",
      label: "Total Schools",
      value: s.total_schools.toLocaleString(),
      delta: `+${s.schools_added_this_month} this month`,
      trend: countTrend(s.schools_added_this_month),
      tone: "blue",
    },
    {
      id: "activeSchools",
      label: "Active Schools",
      value: s.active_schools.toLocaleString(),
      delta: `${s.admin_logins_today} admin logins today`,
      trend: countTrend(s.admin_logins_today),
      tone: "green",
    },
    {
      id: "totalStudents",
      label: "Total Students",
      value: s.total_students.toLocaleString(),
      delta: `+${s.students_added_this_week} this week`,
      trend: countTrend(s.students_added_this_week),
      tone: "purple",
    },
    {
      id: "monthlyRevenue",
      label: "Monthly Revenue",
      value: formatCompactNaira(s.revenue_this_month),
      delta: pct == null ? "No change vs last month" : `${signed(pct)}% vs last month`,
      trend: revTrend,
      tone: "amber",
    },
  ];
}

function mapHealth(h: ApiPlatformHealth): { metrics: HealthMetric[]; status: HealthStatus } {
  const storage = num(h.storage_percentage);
  const uptime = num(h.api_uptime);
  const response = num(h.average_response_time);
  const sessions = num(h.active_sessions);

  const metrics: HealthMetric[] = [
    {
      id: "uptime",
      label: "API Uptime",
      value: uptime == null ? "—" : `${uptime}%`,
      progress: uptime,
      tone: "green",
    },
    {
      id: "response",
      label: "Response Time",
      value: response == null ? "—" : `${response}ms`,
      progress: null,
      tone: "green",
    },
    {
      id: "storage",
      label: "Storage Usage",
      value: storage == null ? "—" : `${storage}%`,
      progress: storage,
      tone: storage != null && storage >= 85 ? "red" : "amber",
    },
    {
      id: "sessions",
      label: "Active Sessions",
      value: sessions == null ? "—" : sessions.toLocaleString(),
      progress: null,
      tone: "blue",
    },
  ];

  const status: HealthStatus =
    uptime == null
      ? { label: "Status unavailable", tone: "gray" }
      : uptime >= 99
        ? { label: "Operational", tone: "green" }
        : { label: "Degraded", tone: "amber" };

  return { metrics, status };
}

function guessActivityType(raw?: string): ActivityType {
  const t = (raw ?? "").toLowerCase();
  if (t.includes("school")) return "school";
  if (t.includes("payment")) return "payment";
  if (t.includes("user") || t.includes("role")) return "user";
  if (t.includes("subscription") || t.includes("plan")) return "subscription";
  if (t.includes("support") || t.includes("ticket")) return "support";
  return "other";
}

export function mapDashboard(api: ApiDashboard): DashboardData {
  const currentMonth = new Date().getMonth();
  const growthSource = api.school_growth_chart ?? [];
  const health = mapHealth(api.platform_health ?? ({} as ApiPlatformHealth));

  const revenue: ChartPoint[] = (api.revenue_chart ?? []).map((p) => ({
    label: p.month,
    value: num(p.revenue) ?? 0,
  }));

  const growth: ChartPoint[] = growthSource.map((p, i) => ({
    label: p.month,
    value: num(p.schools) ?? 0,
    highlight: i === currentMonth,
  }));

  return {
    stats: mapStats(api.summary),
    revenue,
    growth,
    schools: (api.recent_schools ?? []).map((s) => ({
      id: String(s.id),
      name: s.name,
      slug: s.slug,
      plan: s.plan ?? "No plan",
      status: titleCase(s.status ?? "unknown"),
      createdAt: s.created_at,
    })),
    payments: (api.recent_payments ?? []).map((p, i) => ({
      id: String(p.id ?? i),
      school: p.school_name ?? p.school ?? "—",
      amount: num(p.amount),
      plan: p.plan_name ?? p.plan ?? "—",
      date: p.paid_at ?? p.created_at ?? p.date ?? null,
      status: titleCase(p.status ?? "unknown"),
    })),
    activity: (api.recent_activities ?? []).map((a, i) => ({
      id: String(a.id ?? i),
      type: guessActivityType(a.type ?? a.event_type),
      title: a.title ?? a.message ?? "Platform event",
      detail: a.description ?? a.school_name ?? "",
      time: timeAgo(a.created_at),
    })),
    renewals: (api.upcoming_renewals ?? []).map((r, i) => ({
      id: String(r.id ?? i),
      school: r.school_name ?? r.school ?? "—",
      plan: r.plan_name ?? r.plan ?? "—",
      amount: num(r.amount),
      daysLeft: r.days_left ?? daysUntil(r.expires_at ?? r.renewal_date),
    })),
    health: health.metrics,
    healthStatus: health.status,
  };
}