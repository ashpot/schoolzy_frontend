import { API_BASE_URL } from "@/shared/config/api";
import type { Period } from "./types";

// TODO: path is a guess; confirm with the backend docs
export const ANALYTICS_ENDPOINTS = {
  OVERVIEW: (period: Period) => `${API_BASE_URL}/platform/analytics/?period=${period}`,
} as const;