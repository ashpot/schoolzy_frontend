import { API_BASE_URL } from "@/shared/config/api";

export const SETTINGS_ENDPOINTS = {
  SCHOOL_SETTINGS: `${API_BASE_URL}/public/settings/`,
} as const;