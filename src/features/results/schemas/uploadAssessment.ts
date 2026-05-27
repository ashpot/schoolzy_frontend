import { z } from "zod";

export const uploadFilterSchema = z.object({
  class:          z.string().min(1, "Class is required"),
  classGroup:     z.string().min(1, "Class group is required"),
  subject:        z.string().min(1, "Subject is required"),
  assessmentType: z.string().min(1, "Assessment type is required"),
});

export type UploadFilterValues = z.infer<typeof uploadFilterSchema>;