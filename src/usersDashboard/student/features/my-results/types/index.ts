export type Grade = "A" | "B" | "C" | "D" | "E" | "F";

export interface ResultSubjectScore {
  id: string;
  subject: string;
  assessmentScore: number;
  examScore: number;
  totalScore: number;
  grade: Grade;
  remark: string;
}

export interface ResultSheet {
  studentName: string;
  admissionNumber: string;
  className: string;
  session: string;
  term: string;
  formTeacher: string;
  subjects: ResultSubjectScore[];
  classPosition: number;
  classSize: number;
  overallAverage: number;
  overallRemark: string;
}