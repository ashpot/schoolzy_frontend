export interface ResultSubject {
  subject: string;
  ca: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
}

export interface ResultSheet {
  studentName: string;
  admissionNo: string;
  class: string;
  session: string;
  term: string;
  average: number;
  position: string;
  remark: string;
  subjects: ResultSubject[];
}