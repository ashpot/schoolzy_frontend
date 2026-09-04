import type { GradeCaption } from "@/shared/utils/gradeUtils";

export interface SubjectResult {
  id: string;
  subject: string;
  assignment: number;
  assignmentMax: number;
  test: number;
  testMax: number;
  exam: number;
  examMax: number;
  total: number;
  totalMax: number;
  grade: GradeCaption;
  subjectPosition: string; // "7th", "1st", etc.
}

export interface PsychomotiveSkillScore {
  skill: string;
  score: number; // 1-5
  remark: string;
}

export interface AttendanceRecord {
  timesSchoolOpened: number;
  timesPresent: number;
  timesEarly: number;
  timesLate: number;
  timesAbsent: number;
}

export interface ResultComments {
  classTeacherComment: string;
  principalComment: string;
}

export interface StudentResultData {
  studentId: string;
  admissionNumber: string;
  fullName: string;
  className: string;
  section: string;
  term: string;
  session: string;
  positionInClass: string; // "12th"
  classSize: number;
  averageScore: number;
  overallGrade: GradeCaption;
  attendancePercentage: number;
  subjects: SubjectResult[];
  psychomotive: PsychomotiveSkillScore[];
  attendance: AttendanceRecord;
  comments: ResultComments;
}