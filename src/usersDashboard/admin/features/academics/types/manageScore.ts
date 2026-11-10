// ─── Backend shapes ───────────────────────────────────────────────────────────
// Confirmed from a real response. OPTIONS also lists student_name / teacher_name,
// but the real items don't carry them, so names are resolved from the users list.
export interface ScoreResponse {
  id: number;
  subject_name: string;
  class_group_name: string;
  term_name: string;
  assessment_name: string;
  student_session_record: number;
  score: number;
  date_added: string;
  subject: number;
  class_group: number;
  term: number;
  user: number; // the student's id
  assessment_type: number;
  added_by: number; // who uploaded the score
}

export interface UserLiteResponse {
  id: number;
  first_name: string;
  last_name: string;
  admission_number: string | null;
}

export interface AssessmentTypeApi {
  id: number;
  name: string;
  base_mark: number; // highest raw score allowed
  section: number | null;
}

// ─── UI shapes ────────────────────────────────────────────────────────────────
export interface ScoreFilters {
  classGroupId: string;
  termId: string;
  subjectId: string;
  assessmentTypeId: string;
  labels: string[]; // captured when loaded, shown in the active-filters bar
  max: number | null; // base mark of the chosen assessment type
}

export interface ScoreRow {
  id: number;
  studentId: number; // kept for when editing goes through the API
  recordId: number; // student_session_record
  fullName: string;
  admissionNumber: string; // "" when the student has none
  addedBy: string;
  dateUploaded: string;
  score: number;
}

export interface EditableScoreRow extends ScoreRow {
  draft: string; // what's in the input
  dirty: boolean;
  error: string;
  overMax: boolean; // saved score above the base mark (the backend allows it)
}