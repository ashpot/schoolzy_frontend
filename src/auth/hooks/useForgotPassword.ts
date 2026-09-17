import { useMutation } from "@tanstack/react-query";
import type {
  ForgotPasswordEmailValues,
  OtpValues,
  NewPasswordValues,
} from "../schema/forgotPasswordSchema";

export const useSendResetCode = () => {
  return useMutation({
    mutationFn: async (values: ForgotPasswordEmailValues) => {
      // TODO: Replace with actual API call
      // return api.post("/auth/forgot-password/", values);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, email: values.email };
    },
  });
};

export const useVerifyResetCode = () => {
  return useMutation({
    // @ts-ignore
    mutationFn: async (values: OtpValues) => {
      // TODO: Replace with actual API call
      // return api.post("/auth/verify-reset-code/", values);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true };
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    // @ts-ignore
    mutationFn: async (values: NewPasswordValues) => {
      // TODO: Replace with actual API call
      // return api.post("/auth/reset-password/", { password: values.password });
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true };
    },
  });
};