import { z } from "zod";

export const resultSetupSchema = z.object({
  class:      z.string().min(1, "Class is required"),
  classGroup: z.string().min(1, "Class group is required"),
  subject:    z.string().min(1, "Subject is required"),
});

export type ResultSetupValues = z.infer<typeof resultSetupSchema>;