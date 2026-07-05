import { z } from "zod";

// Upload Lesson Note
export const uploadLessonNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  class: z.string().min(1, "Class is required"),
  subject: z.string().min(1, "Subject is required"),
  teacher: z.string().min(1, "Teacher is required"),
  file: z
    .any()
    .refine(
      (val) => val instanceof FileList && val.length > 0,
      "Please upload a file"
    )
    .refine(
      (val) =>
        !(val instanceof FileList) ||
        val.length === 0 ||
        val[0].size <= 20 * 1024 * 1024,
      "File must be under 20 MB"
    ),
  description: z.string().optional(),
});
export type UploadLessonNoteValues = z.infer<typeof uploadLessonNoteSchema>;

// Load Attendance
export const loadAttendanceSchema = z.object({
  class: z.string().min(1, "Class is required"),
  classGroup: z.string().min(1, "Class group is required"),
  date: z.string().min(1, "Date is required"),
});
export type LoadAttendanceValues = z.infer<typeof loadAttendanceSchema>;