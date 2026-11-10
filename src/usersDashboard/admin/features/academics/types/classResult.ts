// ── Raw backend shapes ───────────────────────────────────────
export interface ClassResultSubject {
  subject_id: number | null;
  subject: string;
  teacher?: string | null;
  total: number | string | null;
  average?: number | string | null;
  grade?: string | null;
  remark?: string | null;
  position?: number | null;
  [assessmentCode: string]: unknown; // per-assessment scores arrive as dynamic keys (e.g. "hw")
}

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
    best_subject: unknown;
    weakest_subject: unknown;
    passed_subjects: number;
    failed_subjects: number;
    pass_rate: number;
  };
  subjects: ClassResultSubject[];
}

export interface ClassResultResponse {
  class: { id: number; name: string; code: string; section: string; teacher: string };
  term: {
    id: number; name: string; session: string; published: boolean;
    start_date: string; end_date: string;
  };
  assessment_types: { id: number; name: string; code: string; percentage: number }[];
  statistics: {
    students: number; subjects: number; highest_total: number;
    lowest_total: number; class_average: number;
  };
  students: ClassResultStudent[];
}

export interface ClassResultFilters {
  classGroupId: string;
  termId: string;
}

// ── View models (what the components use) ────────────────────
export interface SheetColumn { key: string; name: string }

export interface SheetRow {
  id: string;
  name: string;
  admissionNo: string;
  photo: string;
  scores: Record<string, number>; // keyed by SheetColumn.key
  subjectsOffered: number;
  marksObtainable: number;
  total: number;
  average: number;
  grade: string;
  position: number | null;
  passedAll: boolean;
}

export interface ClassSheet {
  meta: { className: string; section: string; termName: string; session: string; published: boolean };
  columns: SheetColumn[];
  rows: SheetRow[];
  stats: {
    students: number;
    classAverage: number;
    topStudent: string | null;
    passRate: number | null; // percent, null when nobody has subjects yet
  };
}