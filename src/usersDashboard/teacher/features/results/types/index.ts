export interface ResultStudent {
  id: string;
  name: string;
  admissionNo: string;
}

export interface ScoreEntry {
  studentId: string;
  assignment: number | null;
  test: number | null;
  exam: number | null;
}

export interface AssessmentTypeOption {
  value: string;
  label: string;
  maxScore: number;
}

export interface OmittedStudent {
  id: string;
  name: string;
  admissionNo: string;
  reason: string;
  score: number | null;
}

export interface SubjectResultRow {
  subject: string;
  assessment: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
}

export interface StudentResultSheet {
  studentName: string;
  admissionNo: string;
  className: string;
  term: string;
  session: string;
  teacherName: string;
  subjects: SubjectResultRow[];
  totalScore: number;
  average: number;
  overallGrade: string;
  overallRemark: string;
  position: string;
}

export interface CsvImportRow {
  studentId: string;
  studentName: string;
  assignment: number;
  test: number;
  exam: number;
}

export interface SubjectResultRow2 {
  studentId: string;
  studentName: string;
  admissionNo: string;
  assessmentScore: number;
  examScore: number;
  totalScore: number;
  grade: string;
  position: number;
  remark: string;
}

export interface UploadedScoreRow {
  studentId: string;
  studentName: string;
  admissionNo: string;
  assignment: number;
  test: number;
  exam: number;
  total: number;
  grade: string;
  status: "Submitted" | "Draft";
}