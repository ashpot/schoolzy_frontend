import { useMutation } from "@tanstack/react-query";
import { apiFetch, ApiError } from "../apiClient";
import { SA_AUTH_ENDPOINTS } from "../api";
import type {
  LoginValues,
  ForgotPasswordValues,
  VerifyCodeValues,
  SetPasswordValues,
} from "../schemas";
import type { LoginResponse } from "../types";

// ───────────── LIVE ENDPOINTS ─────────────

export const useSuperAdminLogin = () =>
  useMutation({
    mutationFn: async ({ email, password }: LoginValues): Promise<LoginResponse> => {
      const res = await apiFetch<LoginResponse>(SA_AUTH_ENDPOINTS.LOGIN, {
        method: "POST",
        body: { email, password },
        auth: false,
      });
      // Never accept a non-platform account, even with a valid token.
      if (!res.token || res.user?.role !== "SUPER_ADMIN") {
        throw new ApiError(403, "Not authorized");
      }
      return res;
    },
  });

export const useSuperAdminLogout = () =>
  useMutation({
    mutationFn: () => apiFetch<{ success: boolean }>(SA_AUTH_ENDPOINTS.LOGOUT, { method: "POST" }),
  });

// ───────────── STILL MOCKED (endpoints not ready) ─────────────

// Also used for "Resend code". The response must be identical whether or not
// the email exists (anti-enumeration).
export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (payload: ForgotPasswordValues) => {
      // TODO: Replace with actual API call
      // return apiFetch(SA_AUTH_ENDPOINTS.FORGOT_PASSWORD, { method: "POST", body: payload, auth: false });
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, email: payload.email };
    },
  });

export const useVerifyResetCode = () =>
  useMutation({
    mutationFn: async (_payload: VerifyCodeValues & { email: string }) => {
      // TODO: Replace with actual API call (rename _payload to payload when you use it)
      // return apiFetch(SA_AUTH_ENDPOINTS.VERIFY_CODE, { method: "POST", body: payload, auth: false });
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, resetToken: "mock-reset-token" };
    },
  });

export const useSetNewPassword = () =>
  useMutation({
    mutationFn: async (_payload: {
      password: SetPasswordValues["password"];
      resetToken: string;
    }) => {
      // TODO: Replace with actual API call (rename _payload to payload when you use it)
      // return apiFetch(SA_AUTH_ENDPOINTS.RESET_PASSWORD, { method: "POST", body: payload, auth: false });
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true };
    },
  });