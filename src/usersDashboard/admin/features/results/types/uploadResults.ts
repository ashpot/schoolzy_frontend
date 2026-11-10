// ─── Backend shapes ───────────────────────────────────────────────────────────
export interface ScoresheetResponse {
  class_group: { id: number; name: string };
  subject: { id: number; name: string };
  term: { id: number; name: string; session: string };
  assessment_types: { id: number; name: string }[];
  total_students: number;
  students: {
    id: number;
    student_session_record_id: number;
    student_name: string;
    scores: { assessment_type: number; assessment_name: string; score: number | null; score_id: number | null }[];
  }[];
}

// The sheet only returns id + name per assessment type, so max/weight come from this list
export interface AssessmentTypeRaw {
  id: number;
  name: string;
  code: string | null;
  terminal_percentage: number;
  base_mark: number;
  weeklable: boolean;
  section: number | null;
}

export interface BulkScoreBatch {
  subject: number;
  term: number;
  class_group: number;
  students: {
    id: number;
    student_session_record_id: number;
    score: { assessment_type: number; score: number }[];
  }[];
}
export type BulkScoresPayload = BulkScoreBatch[];

export interface BulkScoresResponse {
  message: string;
  total_saved: number;
  created: number;
  updated: number;
  scores: {
    id: number;
    student_id: number;
    student_session_record_id: number;
    subject_id: number;
    class_group_id: number;
    term_id: number;
    assessment_type_id: number;
    score: number;
    action: string;
  }[];
}

// ─── UI shapes ────────────────────────────────────────────────────────────────
export interface ScoresheetSetup {
  term: string;
  classGroup: string;
  subject: string;
}

export interface SheetColumn {
  id: number;
  name: string;
  max: number | null; // base_mark: highest raw score allowed
  weight: number | null; // terminal_percentage: points this assessment adds to the term total
}

export interface SheetRow {
  studentId: number;
  recordId: number; // student_session_record_id, required by the bulk endpoint
  name: string;
  saved: Record<number, number | null>; // assessment type id → saved score
}

export interface Scoresheet {
  classGroup: string;
  subject: string;
  term: string;
  session: string;
  columns: SheetColumn[];
  rows: SheetRow[];
}

// studentId → assessmentTypeId → typed value ("" when empty)
export type ScoreInputs = Record<string, Record<string, string>>;

export interface SaveSummary {
  created: number;
  updated: number;
}