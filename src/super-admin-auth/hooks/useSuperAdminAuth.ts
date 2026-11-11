import { useMutation } from "@tanstack/react-query";
import type {
  LoginValues,
  ForgotPasswordValues,
  VerifyCodeValues,
  SetPasswordValues,
} from "../schemas";
import type { LoginResponse } from "../types";

export const useSuperAdminLogin = () =>
  useMutation({
    mutationFn: async (payload: LoginValues): Promise<LoginResponse> => {
      // TODO: Replace with actual API call
      // return api.post("/platform/auth/signin/", { user: payload.email, password: payload.password });
      await new Promise((r) => setTimeout(r, 1000));
      return {
        success: true,
        token: "mock-super-admin-token",
        user: { id: 1, fullname: "Super Admin", email: payload.email, role: "SuperAdmin" },
      };
    },
  });

// Also used for "Resend code". The response must be identical whether or not
// the email exists (anti-enumeration).
export const useForgotPassword = () =>
  useMutation({
    // @ts-ignore
    mutationFn: async (payload: ForgotPasswordValues) => {
      // TODO: Replace with actual API call
      // return api.post("/platform/auth/forgot-password/", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true };
    },
  });

export const useVerifyResetCode = () =>
  useMutation({
    // @ts-ignore
    mutationFn: async (payload: VerifyCodeValues & { email: string }) => {
      // TODO: Replace with actual API call
      // return api.post("/platform/auth/verify-code/", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, resetToken: "mock-reset-token" };
    },
  });

export const useSetNewPassword = () =>
  useMutation({
    // @ts-ignore
    mutationFn: async (payload: { password: SetPasswordValues["password"]; resetToken: string }) => {
      // TODO: Replace with actual API call
      // return api.post("/platform/auth/reset-password/", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true };
    },
  });