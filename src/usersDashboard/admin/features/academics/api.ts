import { API_BASE_URL } from "@/shared/config/api";

export const ACADEMICS_ENDPOINTS = {
  CREATE_GRADE: `${API_BASE_URL}/academics/grades/`,
  CREATE_SUBJECT: `${API_BASE_URL}/academics/subjects/`,
  CREATE_ASSESSMENT_TYPE: `${API_BASE_URL}/academics/assessment-types/`,
  CREATE_PSYCHOMOTIVE: `${API_BASE_URL}/academics/psychomotive-evaluation/`,
  LIST_SECTIONS: `${API_BASE_URL}/sections/sections/`,
  LIST_GRADES: `${API_BASE_URL}/academics/grades/`,
  LIST_SUBJECTS: `${API_BASE_URL}/academics/subjects/`,
  LIST_ASSESSMENT_TYPES: `${API_BASE_URL}/academics/assessment-types/`,
  CLASS_RESULT: (classGroupId: string, termId: string) =>
  `${API_BASE_URL}/results/classes/${classGroupId}/?term=${termId}`,
  ASSIGN_SUBJECTS_TO_TEACHER: (teacherId: string) =>
  `${API_BASE_URL}/academics/teachers/${teacherId}/assign-subjects/`,
} as const;