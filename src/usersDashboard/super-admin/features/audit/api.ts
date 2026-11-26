import { API_BASE_URL } from "@/shared/config/api";

const BASE = `${API_BASE_URL}/platform/audit-logs/`;

// TODO: paths are guesses; confirm with the backend docs
export const AUDIT_ENDPOINTS = {
  LIST: BASE, // GET (read-only: audit logs can never be edited or deleted)
  DETAIL: (id: string) => `${BASE}${id}/`,
} as const;