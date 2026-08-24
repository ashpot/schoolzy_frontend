// ─── Shared ───────────────────────────────────────────────────────────────────

export const SECTIONS = [
  "Nursery",
  "Primary",
  "Junior Secondary",
  "Senior Secondary",
];

export const SECTION_OPTIONS = SECTIONS.map((s) => ({ value: s, label: s }));
// ─── Subjects ─────────────────────────────────────────────────────────────────
export interface Subject {
  id: string;
  subjectName: string;
  code: string;
  section: string; // section title, e.g. "PRIMARY"
  elective: boolean;
}

// ─── Subject Teachers ─────────────────────────────────────────────────────────
export interface SubjectTeacherAssignment {
  id: string;
  class: string;
  subjectName: string;
  teacher: string;
  elective: string;
}

// ─── Assessment Types ─────────────────────────────────────────────────────────
export interface AssessmentType {
  id: string;
  name: string;
  section: string;
  code: string;
  baseMark: number;
  terminalPercent: number;
  weekly: boolean;
}

// ─── Grade ────────────────────────────────────────────────────────────────────
export type GradeRemark =
  | "Excellent"
  | "Very Good"
  | "Good"
  | "Average"
  | "Pass"
  | "Fail"
  | string;

export interface Grade {
  id: string;
  caption: string;
  minScore: number;
  maxScore: number;
  remark: GradeRemark;
  section: string;
}

// ─── Psychomotive ─────────────────────────────────────────────────────────────
export interface PsychomotiveMetric {
  id: string;
  title: string;
  section: string;
}

// ─── NEW: real API payload/response + section dropdown item ───────────────────
export interface SectionListItem {
  id: number;
  title: string;
  code: string;
  show_position_in_result: boolean;
}

export interface GradePayload {
  caption: string;
  minimum_score: number;
  maximum_score: number;
  section: number;
}
export interface GradeResponse {
  id: number;
  caption: string;
  minimum_score: number;
  maximum_score: number;
  remark: string | null;
  is_pass: boolean;
  section: number;
}

export interface SubjectPayload {
  name: string;
  code: string;
  section: number;
}
export interface SubjectResponse {
  id: number;
  name: string;
  code: string;
  elective: boolean;
  section: number;
}

export interface AssessmentTypePayload {
  name: string;
  code: string;
  terminal_percentage: number;
  base_mark: number;
  weeklable: boolean;
  section: number;
}
export interface AssessmentTypeResponse {
  id: number;
  name: string;
  code: string;
  terminal_percentage: number;
  base_mark: number;
  weeklable: boolean;
  section: number;
}