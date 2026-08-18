export interface Section {
  id:           string;
  title:        string;
  code:         string;
  showPosition?: boolean;
}
export interface SectionPayload {
  title: string;
  code : string;
}
export interface SectionResponse {
  id: number;
  title: string;
  code: string;
  show_position_in_result: boolean;
}


export interface Class {
  id:      string;
  name:    string;
  code:    string;
  section: string;
}

export interface ClassPayload {
  name: string;
  code: string;
  section: number;
}

export interface ClassResponse {
  id: number;
  section_title: string;
  name: string;
  code: string;
  section: number;
}

export interface ClassGroup {
  id:          string;
  name:        string;
  code:        string;
  parentClass: string;
}

export interface ClassGroupPayload {
  name: string;
  code: string;
  parent_class: number;
}

export interface ClassGroupResponse {
  id: number;
  parent_class_name: string;
  section_name: string;
  number_of_students: number;
  form_teacher_name: string | null;
  name: string;
  code: string;
  parent_class: number;
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

export interface SectionListItem {
  id: number;
  title: string;
  code: string;
  show_position_in_result: boolean;
}

export interface ClassListItem {
  id: number;
  section_title: string;
  name: string;
  code: string;
  section: number;
}

