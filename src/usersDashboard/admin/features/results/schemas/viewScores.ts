import { z } from "zod";

export const viewScoresFilterSchema = z.object({
  class:      z.string().min(1, "Class is required"),
  classGroup: z.string().min(1, "Class group is required"),
  subject:    z.string().min(1, "Subject is required"),
  term:       z.string().min(1, "Term is required"),
});

export type ViewScoresFilterValues = z.infer<typeof viewScoresFilterSchema>;