export type GradeCaption = "A" | "B" | "C" | "D" | "E" | "F";

export interface GradeResult {
  caption: GradeCaption;
  remark: string;
}

export const gradeRemarks: Record<GradeCaption, string> = {
  A: "Excellent",
  B: "Very Good",
  C: "Good",
  D: "Fair",
  E: "Pass",
  F: "Fail",
};

export const gradeStyles: Record<GradeCaption, string> = {
  A: "border border-blue-200 bg-blue-50 text-blue-700",
  B: "border border-green-200 bg-green-50 text-green-700",
  C: "border border-yellow-200 bg-yellow-50 text-yellow-700",
  D: "border border-amber-200 bg-amber-50 text-amber-700",
  E: "border border-orange-200 bg-orange-50 text-orange-700",
  F: "border border-red-200 bg-red-50 text-red-700",
};

export function computeGrade(percentage: number): GradeResult {
  if (percentage >= 75) return { caption: "A", remark: gradeRemarks.A };
  if (percentage >= 65) return { caption: "B", remark: gradeRemarks.B };
  if (percentage >= 55) return { caption: "C", remark: gradeRemarks.C };
  if (percentage >= 45) return { caption: "D", remark: gradeRemarks.D };
  if (percentage >= 40) return { caption: "E", remark: gradeRemarks.E };
  return { caption: "F", remark: gradeRemarks.F };
}