import { z } from "zod";

export const forgotPasswordEmailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});
export type ForgotPasswordEmailValues = z.infer<typeof forgotPasswordEmailSchema>;

export const otpSchema = z.object({
  code: z.string().length(4, "Enter the 4-digit code"),
});
export type OtpValues = z.infer<typeof otpSchema>;

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "At least one uppercase letter")
      .regex(/[a-z]/, "At least one lowercase letter")
      .regex(/[0-9]/, "At least one number")
      .regex(/[^A-Za-z0-9]/, "At least one special character"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type NewPasswordValues = z.infer<typeof newPasswordSchema>;