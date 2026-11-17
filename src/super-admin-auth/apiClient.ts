import { API_BASE_URL } from "@/shared/config/api";
import { tokenStorage } from "./utils/tokenStorage";
import { SA_ROUTES } from "./utils/constants";
import { debugLog } from "./utils/debug";

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, message: string, data: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface Options {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown; // plain objects are sent as JSON, FormData as multipart
  auth?: boolean; // default true
}

// Handles {message}, {error}, {detail} and DRF field errors like {"field": ["msg"]}
function extractErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") return "Request failed";
  const obj = data as Record<string, unknown>;
  const direct = obj.message ?? obj.error ?? obj.detail;
  if (direct) return String(direct);

  const parts = Object.entries(obj)
    .map(([key, value]) => {
      const msg = Array.isArray(value) ? value.join(" ") : typeof value === "string" ? value : null;
      if (!msg) return null;
      return key === "non_field_errors" ? msg : `${key}: ${msg}`;
    })
    .filter(Boolean);

  return parts.length ? parts.join(" · ") : "Request failed";
}

// Makes FormData readable in the console (files become a short description).
function describeBody(body: unknown) {
  if (!(body instanceof FormData)) return body;
  return Object.fromEntries(
    Array.from(body.entries()).map(([key, value]) => [
      key,
      value instanceof File ? `[File ${value.name} · ${Math.round(value.size / 1024)}KB]` : value,
    ])
  );
}

// `url` is normally a full URL from a feature's api.ts. A bare path also works.
export async function apiFetch<T>(
  url: string,
  { method = "GET", body, auth = true }: Options = {}
): Promise<T> {
  const target = /^https?:\/\//i.test(url) ? url : `${API_BASE_URL}${url}`;
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = { Accept: "application/json" };
  // Never set Content-Type for FormData: the browser must add its own multipart boundary.
  if (body !== undefined && !isFormData) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = tokenStorage.get();
    if (token) headers.Authorization = `Token ${token}`;
  }

  debugLog(`→ ${method} ${target}`, describeBody(body));

  let res: Response;
  try {
    res = await fetch(target, {
      method,
      headers,
      body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
    });
  } catch {
    debugLog(`✖ ${method} ${target} network error`);
    throw new ApiError(0, "Network error. Check your connection.");
  }

  const data = await res.json().catch(() => null);
  debugLog(`← ${res.status} ${method} ${target}`, data);

  if (!res.ok) {
    // Expired or revoked token: end the session everywhere.
    if (res.status === 401 && auth) {
      tokenStorage.clear();
      if (window.location.pathname !== SA_ROUTES.login) window.location.assign(SA_ROUTES.login);
    }
    throw new ApiError(res.status, extractErrorMessage(data), data);
  }

  return data as T;
}