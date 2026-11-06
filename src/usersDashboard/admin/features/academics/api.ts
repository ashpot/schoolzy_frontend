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
  LIST_TERMS: `${API_BASE_URL}/academics/terms/`,
  LIST_SESSIONS: `${API_BASE_URL}/academics/sessions/`,
  CLASS_RESULT: (classGroupId: string, termId: string) =>
    `${API_BASE_URL}/results/classes/${classGroupId}/?term=${termId}`,
  ASSIGN_SUBJECTS_TO_TEACHER: (teacherId: string) =>
    `${API_BASE_URL}/academics/teachers/${teacherId}/assign-subjects/`,
  LIST_PSYCHOMOTIVE: `${API_BASE_URL}/academics/psychomotive-evaluation/`,
  ATTENDANCE_ANALYTICS: (classGroupId: string, termId: string) =>
    `${API_BASE_URL}/academics/attendance/analytics/?class_group_id=${classGroupId}&term_id=${termId}`,
} as const;