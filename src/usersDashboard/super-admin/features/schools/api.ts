import { API_BASE_URL } from "@/shared/config/api";

const BASE = `${API_BASE_URL}/platform/schools/`;

export const SCHOOLS_ENDPOINTS = {
  LIST: `${BASE}overview/`, // live: paginated list + overview stats
  // TODO: paths below are guesses; confirm with the backend docs
  CREATE: BASE, // multipart/form-data (logo upload)
  DETAIL: (id: string) => `${BASE}${id}/`,
  SUSPEND: (id: string) => `${BASE}${id}/suspend/`,
  REACTIVATE: (id: string) => `${BASE}${id}/reactivate/`,
  APPROVE: (id: string) => `${BASE}${id}/approve/`,
  REJECT: (id: string) => `${BASE}${id}/reject/`,
  IMPERSONATE: (id: string) => `${BASE}${id}/login-as-admin/`,
  USERS: (id: string) => `${BASE}${id}/users/`,
  ACADEMICS: (id: string) => `${BASE}${id}/academics/`,
  FINANCE: (id: string) => `${BASE}${id}/finance/`,
  SUBSCRIPTION: (id: string) => `${BASE}${id}/subscription/`,
  RENEW: (id: string) => `${BASE}${id}/subscription/renew/`,
  ACTIVITY: (id: string) => `${BASE}${id}/activity-logs/`,
} as const;