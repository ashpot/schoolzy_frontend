import { z } from "zod";

export const locateStudentSchema = z.object({
  class:      z.string().min(1, "Class is required"),
  classGroup: z.string().min(1, "Class group is required"),
  subject:    z.string().min(1, "Subject is required"),
  student:    z.string().min(1, "Student is required"),
});

export type LocateStudentValues = z.infer<typeof locateStudentSchema>;

export const omittedScoreSchema = z.object({
  assessmentType: z.string().min(1, "Assessment type is required"),
  // score: z.coerce
  //   .number({ invalid_type_error: "Score is required" })
  //   .min(0, "Must be at least 0"),
  score: z.number().min(1, "Must be at least 0"),

});

export type OmittedScoreValues = z.infer<typeof omittedScoreSchema>;