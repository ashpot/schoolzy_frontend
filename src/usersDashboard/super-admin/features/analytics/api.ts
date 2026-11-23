import { API_BASE_URL } from "@/shared/config/api";
import type { Period } from "./types";
import type { RevenuePeriod } from "./types/revenue";
import type { GrowthPeriod } from "./types/growth";

// TODO: paths are guesses; confirm with the backend docs
export const ANALYTICS_ENDPOINTS = {
  OVERVIEW: (period: Period) => `${API_BASE_URL}/platform/analytics/?period=${period}`,
  REVENUE: (period: RevenuePeriod) => `${API_BASE_URL}/platform/analytics/revenue/?period=${period}`,
  GROWTH: (period: GrowthPeriod) => `${API_BASE_URL}/platform/analytics/school-growth/?period=${period}`,
} as const;