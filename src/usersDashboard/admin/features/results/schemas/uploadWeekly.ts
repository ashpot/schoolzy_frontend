import { z } from "zod";

export const weeklySetupSchema = z.object({
  class:      z.string().min(1, "Class is required"),
  classGroup: z.string().min(1, "Class group is required"),
  subject:    z.string().min(1, "Subject is required"),
});

export type WeeklySetupValues = z.infer<typeof weeklySetupSchema>;