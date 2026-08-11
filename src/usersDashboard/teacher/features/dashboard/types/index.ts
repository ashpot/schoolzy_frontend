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

export interface TeacherDashboardResponse {
  profile: {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    full_name: string;
    email: string;
    phone: string | null;
    employment_number: string | null;
    photo: string;
    sex: string | null;
    status: string;
  };
  assigned_classes: unknown[]; // TODO: backend doc shows [] with no item shape defined
  assigned_subjects: unknown[]; // TODO: same as above
}



