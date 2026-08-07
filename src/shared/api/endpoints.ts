export const API_BASE_URL = "https://api.schoolzy.com.ng/api/v1";

export const ENDPOINTS = {
  // 1. AUTHENTICATION
  AUTH: {
    REGISTER_SCHOOL: "/platform/auth/register-school/",
    SIGNIN: "/auth/signin/",
    SIGNOUT: "/auth/signout/",
  },

  // 2. DASHBOARDS
  DASHBOARDS: {
    ADMIN: "/dashboard/admin/",
    TEACHER: "/dashboard/teacher/",
    STUDENT: "/dashboard/student/",
    PARENT: "/dashboard/parent/",
  },

  // 3. CREATE ACTIONS
  CREATE: {
    USER: "/users/",
    SECTION: "/sections/sections/",
    CLASS: "/sections/classes/",
    CLASS_GROUP: "/sections/class-group/", // Singular as per backend doc
    SESSION: "/academics/session/",       // Singular as per backend doc
    TERM: "/academics/terms/",
    GRADE: "/academics/grade/",           // Singular as per backend doc
    SUBJECT: "/academics/subjects/",
    ASSESSMENT_TYPE: "/academics/assessment-types/",
  },

  // 4. VIEW ACTIONS
  USERS: {
    LIST: "/users/",
    BY_ID: (id: string | number) => `/users/${id}/`,
    BY_ROLE: (role: string) => `/users/?role=${encodeURIComponent(role)}`,
    BY_CLASS_GROUP: (classGroupId: string | number) => `/users/?class-group=${classGroupId}`,
  },

  SECTIONS: {
    LIST: "/sections/sections/",
    BY_ID: (id: string | number) => `/sections/sections/${id}/`,
  },

  CLASSES: {
    LIST: "/sections/classes/",
    BY_ID: (id: string | number) => `/sections/classes/${id}/`,
    BY_SECTION: (sectionId: string | number) => `/sections/classes/?section=${sectionId}`,
  },

  CLASS_GROUPS: {
    LIST: "/sections/class-groups/",
    BY_ID: (id: string | number) => `/sections/class-groups/${id}/`,
    BY_CLASS: (classId: string | number) => `/sections/class-groups/?class=${classId}`,
  },

  SESSIONS: {
    LIST: "/academics/sessions/",
    BY_ID: (id: string | number) => `/academics/sessions/${id}/`,
  },

  TERMS: {
    LIST: "/academics/terms/",
    BY_ID: (id: string | number) => `/academics/term/${id}/`, // Singular 'term' in backend doc for single ID
  },

  GRADES: {
    LIST: "/academics/grades/",
    BY_ID: (id: string | number) => `/academics/grades/${id}/`,
  },

  SUBJECTS: {
    LIST: "/academics/subjects/",
    BY_ID: (id: string | number) => `/academics/subjects/${id}/`,
    BY_SECTION: (sectionId: string | number) => `/academics/subjects/?section=${sectionId}`,
  },

  ASSESSMENT_TYPES: {
    LIST: "/academics/assessment-types/",
    BY_ID: (id: string | number) => `/academics/assessment-types/${id}/`,
    BY_SECTION: (sectionId: string | number) => `/academics/assessment-types/?section=${sectionId}`,
  },

  // 6. ASSIGNMENTS
  ASSIGNMENTS: {
    STUDENT_PARENT: "/student-parents/",
    ASSIGN_CLASS_TEACHER: "/academics/assigned-classes/",
    ASSIGN_SUBJECTS_TEACHER: (teacherId: string | number) => `/academics/teachers/${teacherId}/assign-subjects/`,
  },

  // 7. MESSAGING
  MESSAGING: {
    CONVERSATIONS: "/conversations/",
    CONVERSATION_MESSAGES: "/conversations/messages/",
    SEND_MESSAGE: "/messages/send/",
  },

  // 8. NOTIFICATIONS
  NOTIFICATIONS: {
    LIST: "/notifications/",
    READ_ALL: "/notifications/read-all/",
  },

  // 9. PROFILE & ACCOUNT
  PROFILE: {
    EDIT_PERSONAL: "/users/me/profile/",
    EDIT_BUSINESS: "/users/me/business/",
    DISABLE_ACCOUNT: "/users/me/disable/",
    DELETE_ACCOUNT: "/users/me/delete/",
  },

  RESET_PASSWORD: {
    SEND_PHONE_OTP: "/reset/password/send-phone-otp/",
    SEND_EMAIL_OTP: "/reset/password/send-email-otp/",
    CONFIRM_PHONE_OTP: "/reset/password/confirm-phone/",
    CONFIRM_EMAIL_OTP: "/reset/password/confirm-email/",
  },
} as const;

export type Endpoints = typeof ENDPOINTS;