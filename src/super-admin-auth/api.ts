import { tokenStorage } from "./utils/tokenStorage";
import { SA_ROUTES } from "./utils/constants";
import { debugLog } from "./utils/debug";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "https://api.schoolzy.com.ng/api/v1").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, message: string, data: unknown = null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

interface Options {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean; // default true
}

export async function apiFetch<T>(path: string, { method = "GET", body, auth = true }: Options = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = tokenStorage.get();
    if (token) headers.Authorization = `Token ${token}`;
  }

  debugLog(`→ ${method} ${path}`, body);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    debugLog(`✖ ${method} ${path} network error`);
    throw new ApiError(0, "Network error. Check your connection.");
  }

  const data = await res.json().catch(() => null);
  debugLog(`← ${res.status} ${method} ${path}`, data);

  if (!res.ok) {
    // Expired or revoked token: end the session everywhere.
    if (res.status === 401 && auth) {
      tokenStorage.clear();
      if (window.location.pathname !== SA_ROUTES.login) window.location.assign(SA_ROUTES.login);
    }
    const message = (data as { error?: string; message?: string } | null)?.error
      ?? (data as { message?: string } | null)?.message
      ?? "Request failed";
    throw new ApiError(res.status, message, data);
  }

  return data as T;
}