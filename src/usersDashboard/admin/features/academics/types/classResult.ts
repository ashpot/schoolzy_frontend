export interface ClassResultStudent {
  student: {
    id: number;
    full_name: string;
    photo: string;
    admission_number: string | null;
    email: string;
    gender: string | null;
    date_of_birth: string | null;
    age: number | null;
    class_group: string;
    status: string;
  };
  summary: {
    subjects_offered: number;
    total: number;
    average: number;
    grade: string;
    remark: string | null;
    class_position: number | null;
  };
  performance: {
    best_subject: string | null;
    weakest_subject: string | null;
    passed_subjects: number;
    failed_subjects: number;
    pass_rate: number;
  };
  subjects: unknown[]; // TODO: shape unconfirmed — type once a populated item is seen
}

export interface ClassResultResponse {
  class: { id: number; name: string; code: string; section: string; teacher: string };
  term: {
    id: number;
    name: string;
    session: string;
    published: boolean;
    start_date: string;
    end_date: string;
  };
  assessment_types: { id: number; name: string; code: string; percentage: number }[];
  statistics: {
    students: number;
    subjects: number;
    highest_total: number;
    lowest_total: number;
    class_average: number;
  };
  students: ClassResultStudent[];
}

export interface ClassResultFilters {
  classGroupId: string;
  termId: string;
}