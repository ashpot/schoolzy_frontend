import { API_BASE_URL } from "@/shared/config/api";

export const USERS_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/users/`,
  LIST_CLASS_GROUPS: `${API_BASE_URL}/sections/class-groups/`,
} as const;