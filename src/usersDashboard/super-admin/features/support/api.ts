import { API_BASE_URL } from "@/shared/config/api";

const BASE = `${API_BASE_URL}/platform/support/`;

// TODO: paths are guesses; confirm with the backend docs
export const SUPPORT_ENDPOINTS = {
  TICKETS: `${BASE}tickets/`, // GET / POST
  TICKET: (id: string) => `${BASE}tickets/${id}/`, // PATCH / DELETE
  REPLY: (id: string) => `${BASE}tickets/${id}/replies/`,
  ASSIGN: (id: string) => `${BASE}tickets/${id}/assign/`,
  CONVERSATIONS: `${BASE}conversations/`,
  MESSAGES: (id: string) => `${BASE}conversations/${id}/messages/`,
} as const;