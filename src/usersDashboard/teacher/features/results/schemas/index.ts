import { z } from "zod";

export const resultSetupSchema = z.object({
  classId: z.string().min(1, "Required"),
  subjectId: z.string().min(1, "Required"),
  term: z.string().min(1, "Required"),
});
export type ResultSetupValues = z.infer<typeof resultSetupSchema>;

export const uploadOmittedFiltersSchema = z.object({
  classId: z.string().min(1, "Required"),
  subjectId: z.string().min(1, "Required"),
  term: z.string().min(1, "Required"),
  assessmentType: z.string().min(1, "Required"),
});
export type UploadOmittedFiltersValues = z.infer<typeof uploadOmittedFiltersSchema>;

export const uploadResultsFiltersSchema = z.object({
  classId: z.string().min(1, "Required"),
  subjectId: z.string().min(1, "Required"),
  assessmentType: z.string().min(1, "Required"),
  term: z.string().min(1, "Required"),
});
export type UploadResultsFiltersValues = z.infer<typeof uploadResultsFiltersSchema>;

export const viewResultsSearchSchema = z.object({
  classId: z.string().min(1, "Required"),
  studentId: z.string().min(1, "Required"),
  term: z.string().min(1, "Required"),
  session: z.string().min(1, "Required"),
});
export type ViewResultsSearchValues = z.infer<typeof viewResultsSearchSchema>;

export const importScoresFiltersSchema = z.object({
  classId: z.string().min(1, "Required"),
  subjectId: z.string().min(1, "Required"),
  term: z.string().min(1, "Required"),
});
export type ImportScoresFiltersValues = z.infer<typeof importScoresFiltersSchema>;

export const viewSubjectResultFiltersSchema = z.object({
  subjectId: z.string().min(1, "Required"),
  classId: z.string().min(1, "Required"),
  term: z.string().min(1, "Required"),
  session: z.string().min(1, "Required"),
});
export type ViewSubjectResultFiltersValues = z.infer<typeof viewSubjectResultFiltersSchema>;

export const viewUploadedScoresFiltersSchema = z.object({
  classId: z.string().min(1, "Required"),
  subjectId: z.string().min(1, "Required"),
  term: z.string().min(1, "Required"),
  session: z.string().min(1, "Required"),
});
export type ViewUploadedScoresFiltersValues = z.infer<typeof viewUploadedScoresFiltersSchema>;