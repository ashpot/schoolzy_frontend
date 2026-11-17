import { API_BASE_URL } from "@/shared/config/api";
import type { UserKind } from "./types";

const BASE = `${API_BASE_URL}/platform/users/`;

// TODO: paths are guesses; confirm with the backend docs
const SEGMENT: Record<UserKind, string> = {
  admin: "school-admins",
  teacher: "teachers",
  parent: "parents",
  student: "students",
};

export const USERS_ENDPOINTS = {
  LIST: (kind: UserKind) => `${BASE}${SEGMENT[kind]}/`,
  ACTION: (kind: UserKind, id: string, action: "login-as" | "reset-password" | "deactivate" | "activate") =>
    `${BASE}${SEGMENT[kind]}/${id}/${action}/`,
  SEND_EMAIL: (id: string) => `${BASE}${SEGMENT.admin}/${id}/send-email/`,
  INVITE_ADMIN: `${BASE}${SEGMENT.admin}/invite/`,
} as const;