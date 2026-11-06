import { z } from "zod";

// Class is implied by the class group, and the endpoint needs a term
export const resultSetupSchema = z.object({
  term: z.string().min(1, "Term is required"),
  classGroup: z.string().min(1, "Class group is required"),
  subject: z.string().min(1, "Subject is required"),
});

export type ResultSetupValues = z.infer<typeof resultSetupSchema>;