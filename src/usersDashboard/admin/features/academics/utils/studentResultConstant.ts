import type { PsychomotiveScore } from "../types/studentResult";

// TODO: replace with the school's real skills once GET /academics/psychomotive-evaluation/ is confirmed
export const PSYCHOMOTIVE_SKILLS = [
  "Neatness", "Punctuality", "Attentiveness", "Cooperation", "Creativity",
  "Sports", "Handling of Tools", "Drawing & Painting", "Music",
];

export const DEFAULT_PSYCHOMOTIVE: PsychomotiveScore[] = PSYCHOMOTIVE_SKILLS.map((skill) => ({
  skill,
  score: 0,
}));

export const SCORE_REMARKS: Record<number, string> = {
  1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent",
};

// Mirrors the 6-grade system: A≥75, B≥65, C≥55, D≥45, E≥40, F<40
export const GRADE_SCALE = [
  { grade: "A", range: "75–100", remark: "Excellent" },
  { grade: "B", range: "65–74", remark: "Very Good" },
  { grade: "C", range: "55–64", remark: "Good" },
  { grade: "D", range: "45–54", remark: "Fair" },
  { grade: "E", range: "40–44", remark: "Pass" },
  { grade: "F", range: "0–39", remark: "Fail" },
];