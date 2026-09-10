export type ScoreRowStatus = "unsaved" | "saved";

export interface ScoreRow {
  id: string;
  dateUploaded: string;
  term: string;
  session: string;
  admissionNumber: string;
  fullName: string;
  subject: string;
  assessmentType: string;
  score: number | null;
  status: ScoreRowStatus;
}