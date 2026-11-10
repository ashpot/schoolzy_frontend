// ── Raw backend shapes ───────────────────────────────────────
export interface RawUser {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  username?: string | null;
  admission_number?: string | null;
  photo?: string | null;
  class_group?: { id: number; name: string } | number | null;
}

export interface RawSession { id: number; name: string; is_active: boolean }
export interface RawTerm { id: number; name: string; is_active: boolean; session: number }

export interface RawCommentBlock { comment: string | null; teacher: string | null }

export interface RawStudentResult {
  student: {
    id: number; full_name: string; admission_number: string | null; photo: string | null;
    gender: string | null; class_group: string | null; section: string | null;
  };
  term: {
    id: number; name: string; session: string; published: boolean;
    start_date: string | null; end_date: string | null;
  };
  assessment_types: { id: number; name: string; code: string; terminal_percentage: number }[];
  summary: {
    subjects_offered: number; total: number; average: number; grade: string | null;
    remark: string | null; class_position: number | null; students_count: number | null;
  };
  comments: { form_teacher: RawCommentBlock; head_teacher: RawCommentBlock };
  // Per-assessment scores arrive as dynamic keys named after assessment_types[].code
  subjects: Record<string, unknown>[];
  calendar: { school_closes: string | null; next_term_begins: string | null };
  generated: { generated_at: string };
  performance: { passed_subjects: number; failed_subjects: number; pass_rate: number };
}

// ── View models (what components use) ────────────────────────
export interface StudentSearchItem {
  id: string;
  fullName: string;
  admissionNo: string;
  className: string;
  photo: string;
  haystack: string; // pre-built lowercase search string
}

export interface SearchParams { studentId: string; termId: string }

export interface AssessmentColumn { id: number; name: string; code: string; percentage: number }

export interface SubjectRow {
  key: string;
  subjectId: number | null;
  name: string;
  teacher: string;
  scores: Record<string, number | null>; // keyed by assessment code
  total: number | null;
  average: number | null;
  grade: string;
  remark: string;
  position: number | null;
}

export interface StudentResult {
  student: {
    id: string; fullName: string; admissionNo: string; photo: string;
    gender: string; className: string; section: string;
  };
  term: { id: string; name: string; session: string; published: boolean };
  assessments: AssessmentColumn[];
  summary: {
    subjectsOffered: number; total: number | null; average: number | null; grade: string;
    remark: string; position: number | null; studentsCount: number | null;
  };
  comments: {
    formTeacher: { comment: string; teacher: string };
    headTeacher: { comment: string; teacher: string };
  };
  subjects: SubjectRow[];
  performance: { passed: number; failed: number; passRate: number };
  generatedAt: string;
}

export interface PsychomotiveScore { skill: string; score: number } // 0 = not rated
export interface ResultComments { classTeacherComment: string; principalComment: string }

export interface SchoolProfile {
  name: string; logo: string | null; motto: string;
  address: string; phone: string; email: string;
}