import { z } from "zod";

// Upload Lesson Note (teacher is taken from the auth token by the backend)
export const uploadLessonNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  classGroup: z.string().min(1, "Class is required"),
  subject: z.string().min(1, "Subject is required"),
  file: z
    .any()
    .refine((val) => val instanceof FileList && val.length > 0, "Please upload a file")
    .refine(
      (val) => !(val instanceof FileList) || val.length === 0 || val[0].size <= 20 * 1024 * 1024,
      "File must be under 20 MB"
    ),
  description: z.string().optional(),
});
export type UploadLessonNoteValues = z.infer<typeof uploadLessonNoteSchema>;

// Load Attendance (date is applied automatically, class comes from the group)
export const loadAttendanceSchema = z.object({
  classGroup: z.string().min(1, "Please select a class group"),
});
export type LoadAttendanceValues = z.infer<typeof loadAttendanceSchema>;