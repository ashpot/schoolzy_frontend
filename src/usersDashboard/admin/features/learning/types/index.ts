// lesson notes
export type FileType = "PDF" | "DOC" | "DOCX" | "PPT";

// Attendance
export type AttendanceStatus = "present" | "absent" | "late" | "unmarked";

export interface AttendanceStudent {
  id: string;
  name: string;
  admNo: string;
  avatar?: string;
  status: AttendanceStatus;
  timeMarked: string | null;
}

export type LessonNoteStatus = "pending" | "approved" | "rejected";

export interface LessonNote {
  id: string;
  title: string;
  term: string;
  week: string;
  subject: string;
  class: string;
  teacher: { name: string };
  dateUploaded: string;
  file: { type: FileType; size: string; url: string };
  description: string;        // NEW
  status: LessonNoteStatus;   // NEW
}