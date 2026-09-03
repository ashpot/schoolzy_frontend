import { API_BASE_URL } from "@/shared/config/api";

export const USERS_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/users/`,
  LIST_BY_ROLE: (role: string) => `${API_BASE_URL}/users/?role=${role}`,
  LIST_CLASS_GROUPS: `${API_BASE_URL}/sections/class-groups/`,
} as const;