import { z } from "zod";

export const gradeSchema = z.object({
  caption:  z.string().min(1, "Caption is required"),
  minScore: z.number().min(0).max(100),
  maxScore: z.number().min(0).max(100),
  remark:   z.string().min(1, "Remark is required"),
  section:  z.string().min(1, "Please select a section"),
});
export type GradeFormValues = z.infer<typeof gradeSchema>;

export const subjectSchema = z.object({
  subjectName: z.string().min(2, "Subject name is required"),
  code:        z.string().min(2, "Subject code is required"),
  section:     z.string().min(1, "Please select a section"),
  elective:    z.boolean(),
});
export type SubjectFormValues = z.infer<typeof subjectSchema>;

export const assessmentTypeSchema = z.object({
  name:            z.string().min(1, "Name is required"),
  section:         z.string().min(1, "Please select a section"),
  code:            z.string().min(1, "Code is required"),
  terminalPercent: z.number().min(0).max(100),
  baseMark:        z.number().min(0).max(100),
  weekly:          z.boolean(),
});
export type AssessmentTypeFormValues = z.infer<typeof assessmentTypeSchema>;

export const attendanceSchema = z.object({
  timesSchoolOpened: z.number().min(0, "Must be 0 or more"),
  timesPresent: z.number().min(0, "Must be 0 or more"),
  timesEarly: z.number().min(0, "Must be 0 or more"),
  timesLate: z.number().min(0, "Must be 0 or more"),
  timesAbsent: z.number().min(0, "Must be 0 or more"),
});
export type AttendanceFormValues = z.infer<typeof attendanceSchema>;

export const psychomotiveSchema = z.object({
  scores: z.array(z.object({
    skill: z.string(),
    score: z.number().min(1).max(5),
  })),
});
export type PsychomotiveFormValues = z.infer<typeof psychomotiveSchema>;

export const resultCommentSchema = z.object({
  classTeacherComment: z.string().optional(),
  principalComment: z.string().optional(),
});
export type ResultCommentFormValues = z.infer<typeof resultCommentSchema>;