export function computeGrade(percentage: number): string {
  if (percentage >= 75) return "A";
  if (percentage >= 65) return "B";
  if (percentage >= 55) return "C";
  if (percentage >= 45) return "D";
  if (percentage >= 40) return "E";
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
  A: "border border-blue-200 bg-blue-50 text-blue-700",
  B: "border border-green-200 bg-green-50 text-green-700",
  C: "border border-yellow-200 bg-yellow-50 text-yellow-700",
  D: "border border-amber-200 bg-amber-50 text-amber-700",
  E: "border border-orange-200 bg-orange-50 text-orange-700",
  F: "border border-red-200 bg-red-50 text-red-700",
};