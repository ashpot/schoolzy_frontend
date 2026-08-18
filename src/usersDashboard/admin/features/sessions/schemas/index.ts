import { z } from "zod";

export const sessionSchema = z.object({
  name:      z.string().min(1, "Session name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate:   z.string().min(1, "End date is required"),
  isActive:  z.boolean(),
});
export type SessionValues = z.infer<typeof sessionSchema>;

export const termSchema = z.object({
  name:            z.string().min(1, "Term name is required"),
  sessionId:       z.string().min(1, "Session is required"),
  tag:             z.enum(["1", "2", "3"]), // real API values
  startDate:       z.string().min(1, "Start date is required"),
  endDate:         z.string().min(1, "End date is required"),
  isActive:        z.boolean(),
  resultPublished: z.boolean(),
});
export type TermValues = z.infer<typeof termSchema>;