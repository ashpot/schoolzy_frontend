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

// Add-metric form (title + section id)
export const psychomotiveMetricSchema = z.object({
  title:   z.string().min(2, "Title is required"),
  section: z.string().min(1, "Please select a section"),
});
export type PsychomotiveMetricFormValues = z.infer<typeof psychomotiveMetricSchema>;

export const attendanceSummaryFilterSchema = z.object({
  classGroup: z.string().min(1, "Please select a class group"),
  term: z.string().min(1, "Please select a term"),
});
export type AttendanceSummaryFilterValues = z.infer<typeof attendanceSummaryFilterSchema>;

// Class is implied by the class group and session by the term
export const manageScoreFilterSchema = z.object({
  classGroup: z.string().min(1, "Please select a class group"),
  subject: z.string().min(1, "Please select a subject"),
  assessmentType: z.string().min(1, "Please select an assessment type"),
  term: z.string().min(1, "Please select a term"),
});
export type ManageScoreFilterValues = z.infer<typeof manageScoreFilterSchema>;
export const studentResultSearchSchema = z.object({
  studentName: z.string().min(1, "Enter a student name"),
  studentId: z.string().min(1, "Pick a student from the suggestions"),
  sessionId: z.string().min(1, "Please select a session"),
  termId: z.string().min(1, "Please select a term"),
});
export type StudentResultSearchValues = z.infer<typeof studentResultSearchSchema>;

export const psychomotiveSchema2 = z.object({
  scores: z.array(
    z.object({
      skill: z.string(),
      score: z.number().min(0).max(5),
    })
  ),
});
export type PsychomotiveFormValues2 = z.infer<typeof psychomotiveSchema2>;

export const resultCommentSchema = z.object({
  classTeacherComment: z.string().max(500, "Keep it under 500 characters"),
  principalComment: z.string().max(500, "Keep it under 500 characters"),
});
export type ResultCommentFormValues = z.infer<typeof resultCommentSchema>;