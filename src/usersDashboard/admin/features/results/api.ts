import { API_BASE_URL } from "@/shared/config/api";

export const RESULTS_ENDPOINTS = {
  // The doc shows a stray "/" after the subject param; the working request has none
  SCORESHEET: (termId: string, classGroupId: string, subjectId: string) =>
    `${API_BASE_URL}/results/scoresheet/?term=${termId}&class_group=${classGroupId}&subject=${subjectId}`,
  BULK_SCORES: `${API_BASE_URL}/results/bulk/`,
  ASSESSMENT_TYPES: `${API_BASE_URL}/academics/assessment-types/`,
} as const;