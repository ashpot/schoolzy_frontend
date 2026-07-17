import { z } from "zod";

export const attendanceSetupSchema = z.object({
  classId: z.string().min(1, "Select a class"),
  groupId: z.string().min(1, "Select a group"),
  date: z.string().min(1, "Select a date"),
});
export type AttendanceSetupValues = z.infer<typeof attendanceSetupSchema>;

export const uploadLessonNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Select a subject"),
  classId: z.string().min(1, "Select a class"),
  week: z.string().min(1, "Select a week"),
  file: z.instanceof(FileList).refine((f) => f.length > 0, "Attach a file"),
});
export type UploadLessonNoteValues = z.infer<typeof uploadLessonNoteSchema>;