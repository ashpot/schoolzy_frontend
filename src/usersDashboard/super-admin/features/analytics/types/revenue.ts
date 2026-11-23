import type { MetricDelta } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";

export type RevenuePeriod = "monthly" | "quarterly" | "yearly";
export type RevenueMetricKey = "mrr" | "arr" | "avg" | "ltv";
export type RateKey = "renewal" | "success" | "outstanding" | "refund";

export interface RevenueMetric {
  key: RevenueMetricKey;
  value: number; // naira
  delta: MetricDelta;
}

export interface RevenuePoint {
  label: string;
  current: number;
  previous: number;
}

export interface PlanRevenue {
  name: string;
  value: number;
}

export interface MethodShare {
  method: string;
  pct: number;
}

export interface RevenueRate {
  key: RateKey;
  value: string;
  tone: Tone;
  delta: MetricDelta;
}

export interface TopPayer {
  id: string;
  name: string;
  location: string;
  plan: string;
  amountPaid: number;
  renewalDate: string; // yyyy-mm-dd
  lifetime: number;
}

export interface RevenueData {
  metrics: RevenueMetric[];
  trend: RevenuePoint[];
  byPlan: PlanRevenue[];
  byMethod: MethodShare[];
  rates: RevenueRate[];
  topSchools: TopPayer[];
  insights: string[];
}