import { API_BASE_URL } from "@/shared/config/api";

export const SESSIONS_ENDPOINTS = {
  CREATE_SESSION: `${API_BASE_URL}/academics/sessions/`,
  CREATE_TERM: `${API_BASE_URL}/academics/terms/`,
  LIST_SESSIONS: `${API_BASE_URL}/academics/sessions/`,
  LIST_TERMS: `${API_BASE_URL}/academics/terms/`
} as const;