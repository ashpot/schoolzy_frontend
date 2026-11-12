import { useMutation } from "@tanstack/react-query";
import { apiFetch, ApiError } from "../api";
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
      const res = await apiFetch<LoginResponse>("/platform/auth/login/", {
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
    mutationFn: () =>
      apiFetch<{ success: boolean }>("/platform/auth/logout/", { method: "POST" }),
  });

// ───────────── STILL MOCKED (endpoints not ready) ─────────────

// Also used for "Resend code". The response must be identical whether or not
// the email exists (anti-enumeration).
export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (payload: ForgotPasswordValues) => {
      // TODO: Replace with actual API call
      // return apiFetch("/platform/auth/forgot-password/", { method: "POST", body: payload, auth: false });
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, email: payload.email };
    },
  });

export const useVerifyResetCode = () =>
  useMutation({
    // @ts-ignore
    mutationFn: async (payload: VerifyCodeValues & { email: string }) => {
      // TODO: Replace with actual API call
      // return apiFetch("/platform/auth/verify-code/", { method: "POST", body: payload, auth: false });
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, resetToken: "mock-reset-token" };
    },
  });

export const useSetNewPassword = () =>
  useMutation({
    // @ts-ignore
    mutationFn: async (payload: {
      password: SetPasswordValues["password"];
      resetToken: string;
    }) => {
      // TODO: Replace with actual API call
      // return apiFetch("/platform/auth/reset-password/", { method: "POST", body: payload, auth: false });
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true };
    },
  });