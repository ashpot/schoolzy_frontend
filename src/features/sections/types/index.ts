export interface Section {
  id:           string;
  title:        string;
  code:         string;
  showPosition: boolean;
}

export interface Class {
  id:      string;
  name:    string;
  code:    string;
  section: string;
}

export interface ClassGroup {
  id:          string;
  name:        string;
  code:        string;
  parentClass: string;
}

export interface Teacher {
  id:      string;
  name:    string;
  subject: string;
}

export interface FormTeacherAssignment {
  id:          string;
  className:   string;
  teacherName: string;
  subject:     string;
  assignedBy:  string;
  assignedAt:  string;
}

export interface Denominator {
  id:          string;
  denominator: number;
  className:   string;
}