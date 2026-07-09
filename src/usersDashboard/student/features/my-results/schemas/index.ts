import { z } from "zod";

export const checkResultSchema = z.object({
  term: z.string().min(1, "Select a term"),
  session: z.string().min(1, "Select a session"),
});

export type CheckResultValues = z.infer<typeof checkResultSchema>;