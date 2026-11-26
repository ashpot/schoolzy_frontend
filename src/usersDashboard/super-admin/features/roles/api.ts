import { API_BASE_URL } from "@/shared/config/api";

const BASE = `${API_BASE_URL}/platform/roles/`;

// TODO: paths are guesses; confirm with the backend docs
export const ROLES_ENDPOINTS = {
  LIST: BASE, // GET / POST
  ROLE: (id: string) => `${BASE}${id}/`, // PATCH name + description
  PERMISSIONS: (id: string) => `${BASE}${id}/permissions/`, // PUT the full matrix
} as const;