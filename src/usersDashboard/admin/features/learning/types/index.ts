// lesson notes
export type FileType = "PDF" | "DOC" | "DOCX" | "PPT";

export interface LessonNote {
  id: string;
  title: string;
  term: string;
  week: string;
  subject: string;
  class: string;
  teacher: {
    name: string;
    avatar?: string;
  };
  dateUploaded: string;
  file: {
    type: FileType;
    size: string;
    url: string;
  };
  description?: string;
}

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