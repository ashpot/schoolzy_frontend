import type { MetricDelta } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import type { ChartPoint } from "./index";

export type GrowthPeriod = "month" | "quarter" | "year";
export type GrowthMetricKey = "new" | "total" | "trial" | "converted";

export interface GrowthMetric {
  key: GrowthMetricKey;
  value: number;
  delta: MetricDelta;
}

export interface FunnelStage {
  label: string;
  value: number;
}

export interface Region {
  code: string;
  state: string;
  count: number;
  x: number; // percent from left
  y: number; // percent from top
}

export interface FastGrower {
  id: string;
  name: string;
  location: string;
  students: number;
  teachers: number;
  growth: number; // percent
}

export interface HealthRow {
  id: string;
  name: string;
  location: string;
  score: number;
  plan: string;
}

export interface GrowthData {
  metrics: GrowthMetric[];
  joined: ChartPoint[];
  funnel: FunnelStage[];
  regions: Region[];
  fastest: FastGrower[];
  health: HealthRow[];
  insights: string[];
}