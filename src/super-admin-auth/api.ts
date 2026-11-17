import { API_BASE_URL } from "@/shared/config/api";

export const SA_AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/platform/auth/login/`,
  LOGOUT: `${API_BASE_URL}/platform/auth/logout/`,
  // TODO: confirm these paths when the backend ships them
  FORGOT_PASSWORD: `${API_BASE_URL}/platform/auth/forgot-password/`,
  VERIFY_CODE: `${API_BASE_URL}/platform/auth/verify-code/`,
  RESET_PASSWORD: `${API_BASE_URL}/platform/auth/reset-password/`,
} as const;