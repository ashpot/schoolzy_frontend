export interface StudentDetails {
  name: string;
  className: string;
  admissionNumber: string;
  currentClass: string;
  formTeacher: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  elective: boolean;
}