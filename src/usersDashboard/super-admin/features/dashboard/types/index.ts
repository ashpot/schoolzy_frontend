import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";

/* ───────────── API shapes (GET /platform/dashboard/) ───────────── */

export interface ApiSummary {
  total_schools: number;
  schools_added_this_month: number;
  active_schools: number;
  admin_logins_today: number;
  total_students: number;
  students_added_this_week: number;
  revenue_this_month: number;
  revenue_last_month: number;
  revenue_change_percentage: number | null;
  revenue_trend: string;
}

export interface ApiRecentSchool {
  id: number;
  name: string;
  slug: string | null;
  status: string;
  plan: string | null;
  created_at: string;
}

// TODO: shapes below are guesses (lists were empty). Tighten once real data exists.
export interface ApiPayment {
  id?: number | string;
  school_name?: string;
  school?: string;
  amount?: number | string;
  plan?: string;
  plan_name?: string;
  status?: string;
  paid_at?: string;
  created_at?: string;
  date?: string;
}

export interface ApiActivity {
  id?: number | string;
  type?: string;
  event_type?: string;
  title?: string;
  message?: string;
  description?: string;
  school_name?: string;
  created_at?: string;
}

export interface ApiRenewal {
  id?: number | string;
  school_name?: string;
  school?: string;
  plan?: string;
  plan_name?: string;
  amount?: number | string;
  days_left?: number;
  expires_at?: string;
  renewal_date?: string;
}

export interface ApiPlatformHealth {
  api_uptime: number | null;
  average_response_time: number | null;
  storage_used: number | null;
  storage_total: number | null;
  storage_percentage: number | null;
  active_sessions: number | null;
}

export interface ApiDashboard {
  summary: ApiSummary;
  revenue_chart: { month: string; revenue: number }[];
  school_growth_chart: { month: string; schools: number }[];
  recent_schools: ApiRecentSchool[];
  recent_payments: ApiPayment[];
  recent_activities: ApiActivity[];
  upcoming_renewals: ApiRenewal[];
  platform_health: ApiPlatformHealth;
}

export interface ApiDashboardResponse {
  success: boolean;
  data: ApiDashboard;
}

/* ───────────── View shapes (what components receive) ───────────── */

export type Trend = "up" | "down" | "unchanged";
export type StatId = "totalSchools" | "activeSchools" | "totalStudents" | "monthlyRevenue";
export type ActivityType = "school" | "payment" | "user" | "subscription" | "support" | "other";
export type HealthId = "uptime" | "response" | "storage" | "sessions";
export type QuickActionId = "addSchool" | "announce" | "payments" | "newPlan";

export interface StatCardData {
  id: StatId;
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  tone: Tone;
}

export interface ChartPoint {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface RecentSchool {
  id: string;
  name: string;
  slug: string | null;
  plan: string;
  status: string;
  createdAt: string;
}

export interface RecentPayment {
  id: string;
  school: string;
  amount: number | null;
  plan: string;
  date: string | null;
  status: string;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  time: string;
}

export interface Renewal {
  id: string;
  school: string;
  plan: string;
  amount: number | null;
  daysLeft: number | null;
}

export interface HealthMetric {
  id: HealthId;
  label: string;
  value: string;
  progress: number | null; // null = no bar
  tone: Tone;
}

export interface HealthStatus {
  label: string;
  tone: Tone;
}

export interface QuickActionData {
  id: QuickActionId;
  label: string;
  tone: Tone;
  to: string;
}

export interface DashboardData {
  stats: StatCardData[];
  revenue: ChartPoint[];
  growth: ChartPoint[];
  schools: RecentSchool[];
  payments: RecentPayment[];
  activity: ActivityItem[];
  renewals: Renewal[];
  health: HealthMetric[];
  healthStatus: HealthStatus;
}