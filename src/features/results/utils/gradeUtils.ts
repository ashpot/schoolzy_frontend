export function computeGrade(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100;
  if (pct >= 75) return "A";
  if (pct >= 65) return "B";
  if (pct >= 55) return "C";
  if (pct >= 45) return "D";
  if (pct >= 40) return "E";
  return "F";
}

export const gradeRemarks: Record<string, string> = {
  A: "Excellent",
  B: "Very Good",
  C: "Good",
  D: "Fair",
  E: "Pass",
  F: "Fail",
};

export const gradeStyles: Record<string, string> = {
  A: "border border-blue-200   bg-blue-50   text-blue-700",
  B: "border border-green-200  bg-green-50  text-green-700",
  C: "border border-yellow-200 bg-yellow-50 text-yellow-700",
  D: "border border-amber-200  bg-amber-50  text-amber-700",
  E: "border border-orange-200 bg-orange-50 text-orange-700",
  F: "border border-red-200    bg-red-50    text-red-700",
};