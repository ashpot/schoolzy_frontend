export type FileType = "PDF" | "DOC" | "DOCX" | "PPT" | "PPTX" | "FILE";

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

// Lesson notes — backend shapes
export interface LessonNoteResponse {
  id: number;
  subject_name?: string; // absent when subject is null
  class_group_name: string;
  title: string;
  content: string | null;
  note: string | null; // absolute file URL
  status: string; // only "Under Review" seen so far
  date_added: string;
  teacher: number;
  subject: number | null;
  class_group: number;
}

export interface SubjectResponse {
  id: number;
  name: string;
  code: string;
  elective: boolean;
  section: number | null;
}

export interface UserNameResponse {
  id: number;
  first_name: string;
  last_name: string;
}

// Lesson notes — UI shapes
export interface LessonNote {
  id: string;
  title: string;
  subjectId: number | null;
  subject: string;
  classGroupId: number;
  class: string;
  teacherId: number;
  teacher: string;
  dateUploaded: string;
  fileUrl: string | null;
  fileType: FileType | null;
  description: string;
  status: string;
}

export type ReviewStatus = "Approved" | "Rejected";

export interface ClassGroupOption {
  value: string;
  label: string;
  section: number | null;
}

export interface LessonNoteFilters {
  classGroup: string;
  subject: string;
  teacher: string;
  search: string;
}