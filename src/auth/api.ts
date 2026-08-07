import { API_BASE_URL } from "@/shared/config/api";

export const AUTH_ENDPOINTS = {
  REGISTER_SCHOOL: `${API_BASE_URL}/platform/auth/register-school/`,
  SIGNIN: `${API_BASE_URL}/auth/signin/`,
  SIGNOUT: `${API_BASE_URL}/auth/signout/`,
} as const;