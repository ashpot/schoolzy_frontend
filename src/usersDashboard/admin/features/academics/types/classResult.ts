export interface ClassSubjectScore {
  subject: string;
  score: number;
}

export interface ClassStudentScore {
  id: string;
  admissionNumber: string;
  fullName: string;
  scores: ClassSubjectScore[];
  totalSubjects: number;
  marksObtainable: number;
  cumulativeTotal: number;
}

export interface ClassResultData {
  className: string;
  classGroup: string;
  term: string;
  session: string;
  totalStudents: number;
  classAverage: number;
  topStudent: string;
  passRate: number;
  subjects: string[]; // dynamic column headers
  students: ClassStudentScore[];
}