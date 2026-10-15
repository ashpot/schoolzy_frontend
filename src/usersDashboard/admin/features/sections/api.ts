import { API_BASE_URL } from "@/shared/config/api";

export const SECTIONS_ENDPOINTS = {
  CREATE_SECTION: `${API_BASE_URL}/sections/sections/`,
  CREATE_CLASS: `${API_BASE_URL}/sections/classes/`,
  CREATE_CLASS_GROUP: `${API_BASE_URL}/sections/class-groups/`,
  CREATE_DENOMINATOR: `${API_BASE_URL}/sections/class-average-denominators/`,
  LIST_SECTIONS: `${API_BASE_URL}/sections/sections/`,
  LIST_CLASSES: `${API_BASE_URL}/sections/classes/`,
  LIST_CLASS_GROUPS: `${API_BASE_URL}/sections/class-groups/`,
  LIST_DENOMINATORS: `${API_BASE_URL}/sections/class-average-denominators/`,
  ASSIGN_CLASS_TEACHER: `${API_BASE_URL}/academics/assigned-classes/`,
  LIST_ASSIGNED_CLASSES: `${API_BASE_URL}/academics/assigned-classes/`,
} as const;