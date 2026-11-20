import { z } from "zod";

export const replySchema = z.object({
  text: z.string().trim().min(2, "Write a message (at least 2 characters)").max(2000, "Keep it under 2000 characters"),
  kind: z.enum(["reply", "note"]),
});
export type ReplyValues = z.infer<typeof replySchema>;

export const assignSchema = z.object({ agent: z.string() }); // "" = unassigned
export type AssignValues = z.infer<typeof assignSchema>;

export const createTicketSchema = z.object({
  subject: z.string().trim().min(5, "Add a subject (at least 5 characters)").max(120, "Keep the subject under 120 characters"),
  category: z.enum(["Technical", "Billing", "Account", "Onboarding"]),
  priority: z.enum(["Critical", "High", "Medium", "Low"]),
});
export type CreateTicketValues = z.infer<typeof createTicketSchema>;

export const chatSchema = z.object({
  text: z.string().trim().min(1, "Type a message").max(1000, "Keep it under 1000 characters"),
});
export type ChatValues = z.infer<typeof chatSchema>;