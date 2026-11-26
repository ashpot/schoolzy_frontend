import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().trim().min(3, "Role name is required (at least 3 characters)").max(40, "Keep the name under 40 characters"),
  description: z.string().trim().min(5, "Add a short description (at least 5 characters)").max(160, "Keep it under 160 characters"),
});
export type RoleValues = z.infer<typeof roleSchema>;