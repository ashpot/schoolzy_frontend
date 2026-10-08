import { getTenant } from "@/shared/utils/tenant";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
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
  // console.log(url, { ...rest, body, headers: finalHeaders })

  if (res.status === 401) {
    localStorage.removeItem("schoolzy_token");
    localStorage.removeItem("schoolzy_user");
    window.location.href = "/auth/signin";
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || errorBody.error || errorBody.detail || "Request failed");
  }
  // console.log("apiRequest response:", res.json());
  return res.json();
}