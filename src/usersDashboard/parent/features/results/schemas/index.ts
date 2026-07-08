import { z } from "zod";

export const checkResultSchema = z.object({
  childId: z.string().min(1, "Select a child"),
  session: z.string().min(1, "Select a session"),
  term: z.string().min(1, "Select a term"),
});
export type CheckResultValues = z.infer<typeof checkResultSchema>;