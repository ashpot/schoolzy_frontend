export type AttendanceStatusValue = "Present" | "Absent" | "Late" | null;

export interface AttendanceStudent {
  id: string;
  name: string;
  admissionNumber: string;
  status: AttendanceStatusValue;
  timeMarked: string | null;
}

export interface RecentAttendanceRecord {
  id: string;
  className: string;
  date: string;
  present: number;
  absent: number;
  late: number;
  totalStudents: number;
  rate: number;
}

export type FileType = "PDF" | "DOC" | "PPT";

export interface LessonNote {
  id: string;
  title: string;
  subject: string;
  className: string;
  teacher: string;
  dateUploaded: string;
  term: string;
  week: string;
  fileType: FileType;
  fileSizeMb: number;
}