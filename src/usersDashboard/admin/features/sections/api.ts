import { API_BASE_URL } from "@/shared/config/api";

export const SECTIONS_ENDPOINTS = {
  CREATE_SECTION: `${API_BASE_URL}/sections/sections/`,
  CREATE_CLASS: `${API_BASE_URL}/sections/classes/`,
  CREATE_CLASS_GROUP: `${API_BASE_URL}/sections/class-groups/`,
  LIST_SECTIONS: `${API_BASE_URL}/sections/sections/`,
  LIST_CLASSES: `${API_BASE_URL}/sections/classes/`,
  LIST_CLASS_GROUPS: `${API_BASE_URL}/sections/class-groups/`,
} as const;