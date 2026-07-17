export interface Student {
  id:        string;
  name:      string;
  studentId: string;
}

export interface AssessmentTypeOption {
  value:    string;
  label:    string;
  maxScore: number;
}

export type ScoresMap = Record<string, number | "">;

export interface LoadedRecord {
  student:    Student;
  class:      string;
  classGroup: string;
  subject:    string;
}

export type ResultScoresMap = Record<string,{ assignment: number | ""; test: number | ""; exam: number | "" }>;

export interface ViewScore {
  studentId:  string;
  name:       string;
  assignment: number;
  test:       number;
  exam:       number;
  total:      number;
  grade:      string;
}
