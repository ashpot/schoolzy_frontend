import { API_BASE_URL } from "@/shared/config/api";

export const ACADEMICS_ENDPOINTS = {
  CREATE_GRADE: `${API_BASE_URL}/academics/grades/`,
  CREATE_SUBJECT: `${API_BASE_URL}/academics/subjects/`,
  CREATE_ASSESSMENT_TYPE: `${API_BASE_URL}/academics/assessment-types/`,
  LIST_SECTIONS: `${API_BASE_URL}/sections/sections/`,
  LIST_GRADES: `${API_BASE_URL}/academics/grades/`,
  LIST_SUBJECTS: `${API_BASE_URL}/academics/subjects/`,
  LIST_ASSESSMENT_TYPES: `${API_BASE_URL}/academics/assessment-types/`,
} as const;