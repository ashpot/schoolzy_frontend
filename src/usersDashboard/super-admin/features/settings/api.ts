import { API_BASE_URL } from "@/shared/config/api";

const BASE = `${API_BASE_URL}/platform/settings/`;

// TODO: paths are guesses; confirm with the backend docs
export const SETTINGS_ENDPOINTS = {
  PLATFORM: BASE, // GET all sections
  SECTION: (s: "general" | "branding" | "security" | "localization") => `${BASE}${s}/`, // PATCH (branding = multipart)
  MAINTENANCE: `${BASE}maintenance/`,
  SYSTEM_ACTION: (a: "clear-cache" | "optimize-database" | "diagnostics") => `${BASE}system/${a}/`,
  GATEWAYS: `${BASE}gateways/`,
  GATEWAY: (id: string) => `${BASE}gateways/${id}/`, // PATCH
  GATEWAY_TEST: (id: string) => `${BASE}gateways/${id}/test/`,
  COMMS: `${BASE}communications/`,
  EMAIL: `${BASE}communications/email/`,
  SMS: `${BASE}communications/sms/`,
  TEST_SEND: (kind: "email" | "sms") => `${BASE}communications/${kind}/test/`,
  TEMPLATES: `${BASE}communications/templates/`,
  TEMPLATE: (id: string) => `${BASE}communications/templates/${id}/`,
} as const;