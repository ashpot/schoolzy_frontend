import { getTenant } from "@/shared/utils/tenant";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Handles {message}, {error}, {detail} and DRF field errors like {"field": ["msg"]}
function extractErrorMessage(body: any): string {
  if (!body || typeof body !== "object") return "Request failed";
  const direct = body.message || body.error || body.detail;
  if (direct) return String(direct);

  const parts = Object.entries(body)
    .map(([key, value]) => {
      const msg = Array.isArray(value) ? value.join(" ") : typeof value === "string" ? value : null;
      if (!msg) return null;
      return key === "non_field_errors" ? msg : `${key}: ${msg}`;
    })
    .filter(Boolean);

  return parts.length ? parts.join(" · ") : "Request failed";
}

export async function apiRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { skipAuth, headers, body, ...rest } = options;

  const tenant = getTenant();
  const token = localStorage.getItem("schoolzy_token");
  const isFormData = body instanceof FormData;

  const finalHeaders: HeadersInit = {
    // Never set Content-Type for FormData — the browser must add its own multipart boundary
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(tenant ? { "X-Tenant-Domain": `${tenant}.schoolzy.com.ng` } : {}),
    ...(token && !skipAuth ? { Authorization: `Token ${token}` } : {}),
    ...headers,
  };

  const res = await fetch(url, { ...rest, body, headers: finalHeaders });

  if (res.status === 401) {
    localStorage.removeItem("schoolzy_token");
    localStorage.removeItem("schoolzy_user");
    window.location.href = "/auth/signin";
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new ApiError(extractErrorMessage(errorBody), res.status);
  }

  return res.json();
}