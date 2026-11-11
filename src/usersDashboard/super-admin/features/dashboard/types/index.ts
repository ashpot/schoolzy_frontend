import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";

export type StatId = "totalSchools" | "activeSchools" | "totalStudents" | "monthlyRevenue";
export type Plan = "Premium" | "Standard" | "Basic";
export type SchoolStatus = "Active" | "Trial" | "Suspended";
export type PaymentStatus = "Paid" | "Pending" | "Failed";
export type ActivityType = "school" | "payment" | "user" | "subscription" | "support";
export type HealthId = "uptime" | "response" | "storage" | "sessions";
export type QuickActionId = "addSchool" | "announce" | "payments" | "newPlan";

export interface StatCardData {
  id: StatId;
  label: string;
  value: string;
  delta: string;
  tone: Tone;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface RecentSchool {
  id: string;
  name: string;
  location: string;
  plan: Plan;
  status: SchoolStatus;
  students: number;
}

export interface RecentPayment {
  id: string;
  school: string;
  amount: number;
  plan: string;
  date: string; // ISO yyyy-mm-dd
  status: PaymentStatus;
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
  plan: Plan;
  amount: number;
  daysLeft: number;
}

export interface HealthMetric {
  id: HealthId;
  label: string;
  value: string;
  progress: number; // 0–100
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
}