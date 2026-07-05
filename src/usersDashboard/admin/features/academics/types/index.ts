// ─── Shared ───────────────────────────────────────────────────────────────────
export type SchoolSection = "Nursery" | "Primary" | "Junior Secondary" | "Senior Secondary";

export const SECTIONS: SchoolSection[] = [
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
  section: SchoolSection;
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
  section: SchoolSection;
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
  section: SchoolSection;
}

// ─── Psychomotive ─────────────────────────────────────────────────────────────
export interface PsychomotiveMetric {
  id: string;
  title: string;
  section: SchoolSection;
}