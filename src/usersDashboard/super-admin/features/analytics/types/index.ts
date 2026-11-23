import type { MetricDelta } from "@/usersDashboard/super-admin/shared/components/MetricCard";

export type Period = "today" | "7d" | "30d" | "90d" | "year";
export type MetricKey = "schools" | "users" | "dau" | "mau" | "uptime" | "session";
export type HealthKey = "api" | "db" | "load" | "storage" | "email" | "sms";

export interface MetricData {
  key: MetricKey;
  value: number | string;
  delta: MetricDelta;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface RoleShare {
  label: string;
  value: number; // head count
}

export interface UsageData {
  lessonNotes: number;
  results: number;
  attendance: number;
  onlineTests: number;
  feesPaid: number; // naira
  inventorySales: number;
}

export interface TopSchool {
  id: string;
  name: string;
  location: string;
  score: number;
  activeUsers: number;
  attendanceRate: number;
  results: number;
}

export interface HealthItem {
  key: HealthKey;
  value: string;
  progress: number; // 0-100
  warn: boolean;
}

export interface AnalyticsData {
  metrics: MetricData[];
  dailyActive: ChartPoint[];
  logins: ChartPoint[];
  roles: RoleShare[];
  usage: UsageData;
  topSchools: TopSchool[];
  health: HealthItem[];
  insights: string[];
}