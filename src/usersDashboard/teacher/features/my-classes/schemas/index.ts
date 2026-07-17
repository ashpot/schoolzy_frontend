import { z } from "zod";

export const classListFilterSchema = z.object({
  classId: z.string().min(1, "Select a class"),
  termId: z.string().min(1, "Select a term"),
});

export type ClassListFilterValues = z.infer<typeof classListFilterSchema>;

export const attendanceFilterSchema = z.object({
  classId: z.string().min(1, "Select a class"),
  groupId: z.string().min(1, "Select a group"),
  termId: z.string().min(1, "Select a term"),
  session: z.string().min(1, "Session is required"),
});

export type AttendanceFilterValues = z.infer<typeof attendanceFilterSchema>;