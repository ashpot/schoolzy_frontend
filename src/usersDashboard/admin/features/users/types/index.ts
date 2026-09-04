export interface Student {
  id: string; admNo: string; firstName: string; middleName?: string;
  lastName: string; username: string; sex: "Male" | "Female"; dob: string;
  phone: string; address: string; city: string; state: string; country: string;
  email: string; classGroup: string; section: "Jnr Sec" | "Snr Sec";
  classLabel: string; dateOfAdmission: string; photo?: string;
}

export interface ClassGroupListItem {
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
  id: string; empNo: string; firstName: string; middleName?: string;
  lastName: string; username: string; sex: "Male" | "Female"; dob: string;
  phone: string; address: string; city: string; state: string; country: string;
  email: string; classLabel: string; dateOfEmployment: string; photo?: string;
}

export interface Admin {
  id: string; adminId: string; firstName: string; middleName?: string;
  lastName: string; username: string; sex: "Male" | "Female"; dob: string;
  phone: string; address: string; city: string; state: string; country: string;
  email: string; signature?: string; photo?: string;
}

export interface Parent {
  id: string; parentId: string; firstName: string; middleName?: string;
  lastName: string; username: string; sex: "Male" | "Female"; dob: string;
  phone: string; address: string; city: string; state: string;
  country: string; email: string; photo?: string;
}

export interface PaginatedResponse<T> {
  data: T[]; total: number; page: number; perPage: number;
}

// Generic column definition for UserListPanel
export interface ColumnDef<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
}

export interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  username: string;
  email: string;
  admission_number: string | null;
  employment_number: string | null;
  role: string;
  phone: string | null;
  sex: "Male" | "Female" | null;
  status: string;
  photo: string | null;
  signature: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  date_of_birth: string | null;
  date_of_admission: string | null;
  date_of_employment: string | null;
  class_group: number | null;
}