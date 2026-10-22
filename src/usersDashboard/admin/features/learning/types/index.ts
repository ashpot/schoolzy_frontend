export type FileType = "PDF" | "DOC" | "DOCX" | "PPT" | "PPTX" | "FILE";

// ─── Attendance — UI shapes ───────────────────────────────────────────────────
// "unmarked" is client-only; the backend only knows Present / Absent / Late
export type AttendanceStatus = "present" | "absent" | "late" | "unmarked";

export interface AttendanceStudent {
  id: string;
  name: string;
  admNo: string; // "" when the backend has none
  photo: string | null;
  status: AttendanceStatus;
}

export interface AttendanceSession {
  classGroupId: string;
  className: string;
  date: string; // YYYY-MM-DD, captured when the class was loaded
}

export interface AttendanceDraft extends AttendanceSession {
  marks: Record<string, AttendanceStatus>; // studentId → status
  dirty: boolean;
  search: string;
  page: number;
}

export interface LoadedAttendance {
  students: AttendanceStudent[];
  prefilled: boolean; // true when attendance already existed for that date
}

// ─── Attendance — backend shapes ──────────────────────────────────────────────
export type ApiAttendanceStatus = "Present" | "Absent" | "Late";

export interface StudentResponse {
  id: number;
  first_name: string;
  last_name: string;
  admission_number: string | null;
  photo: string | null;
  role: string;
  is_active: boolean;
  class_group: { id: number; name: string } | null; // nested object, not an id
}

export interface AttendanceRecordResponse {
  id: number;
  status: ApiAttendanceStatus;
  remark: string;
  date: string;
  date_created: string;
  student: number;
  class_group: number;
  taken_by: number;
}

export interface AttendanceBulkPayload {
  class_group: number;
  date: string;
  attendance: { student: number; status: ApiAttendanceStatus }[];
}

export interface AttendanceBulkResponse {
  message: string;
  count: number;
  attendance: AttendanceRecordResponse[];
}

// ─── Lesson notes — backend shapes ────────────────────────────────────────────
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

// ─── Lesson notes — UI shapes ─────────────────────────────────────────────────
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