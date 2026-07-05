export interface Student {
  id: string; admNo: string; firstName: string; middleName?: string;
  lastName: string; username: string; sex: "Male" | "Female"; dob: string;
  phone: string; address: string; city: string; state: string; country: string;
  email: string; classGroup: string; section: "Jnr Sec" | "Snr Sec";
  classLabel: string; dateOfAdmission: string; photo?: string;
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