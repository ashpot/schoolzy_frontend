import { API_BASE_URL } from "@/shared/config/api";

export const USERS_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/users/`,
} as const;