export interface TeacherDetails {
  name: string;
  role: string;
  classAssigned: string;
  email: string;
  phone: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classes: string[];
}