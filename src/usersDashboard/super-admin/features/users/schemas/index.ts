import { z } from "zod";

export const sendEmailSchema = z.object({
  subject: z.string().trim().min(3, "Add a subject (at least 3 characters)").max(120, "Keep the subject under 120 characters"),
  message: z.string().trim().min(10, "Write a message (at least 10 characters)").max(2000, "Keep the message under 2000 characters"),
});
export type SendEmailValues = z.infer<typeof sendEmailSchema>;

export const inviteAdminSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Enter the full name")
    .max(80, "Name is too long")
    .refine((v) => v.split(/\s+/).length >= 2, "Enter first and last name"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  schoolId: z.string().min(1, "Select a school"),
});
export type InviteAdminValues = z.infer<typeof inviteAdminSchema>;