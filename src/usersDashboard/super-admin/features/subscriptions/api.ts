import { API_BASE_URL } from "@/shared/config/api";

const BASE = `${API_BASE_URL}/platform/subscriptions/`;

// TODO: paths are guesses; confirm with the backend docs
export const SUBSCRIPTIONS_ENDPOINTS = {
  PLANS: `${BASE}plans/`, // GET / POST
  PLAN: (id: string) => `${BASE}plans/${id}/`, // PATCH / DELETE
  LIST: BASE,
  DETAIL: (id: string) => `${BASE}${id}/`,
  ACTION: (id: string, action: "renew" | "invoice" | "reminder" | "suspend" | "change-plan") =>
    `${BASE}${id}/${action}/`,
} as const;