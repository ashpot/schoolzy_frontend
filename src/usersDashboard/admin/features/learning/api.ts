import { API_BASE_URL } from "@/shared/config/api";

export const LEARNING_ENDPOINTS = {
  LESSON_NOTES: `${API_BASE_URL}/learning/lesson-notes/`,
  SUBJECTS: `${API_BASE_URL}/academics/subjects/`,
  // Docs say ?class-group= but the server only honours ?class_group=
  STUDENTS_BY_GROUP: (classGroupId: number) => `${API_BASE_URL}/users/?class_group=${classGroupId}`,
  ATTENDANCE: `${API_BASE_URL}/academics/attendance/`,
  ATTENDANCE_BULK: `${API_BASE_URL}/academics/attendance/bulk/`,
};