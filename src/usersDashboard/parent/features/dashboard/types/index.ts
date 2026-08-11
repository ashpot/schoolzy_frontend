export interface Child {
  id: string;
  admissionNo: string;
  fullName: string;
  gender: "Male" | "Female";
  class: string;
}

export interface ParentDetails {
  name: string;
  gender: "Male" | "Female";
  address: string;
  email: string;
  phone: string;
}

export interface ParentDashboardChild {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  full_name: string;
  admission_number: string | null;
  photo: string;
  class_group: string | number | null;
  status: string;
}

export interface ParentDashboardResponse {
  profile: {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    full_name: string;
    email: string;
    phone: string | null;
    photo: string;
    sex: string | null;
    status: string;
  };
  children: ParentDashboardChild[];
}