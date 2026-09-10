export type PromotionStatus = "pending" | "promoted" | "repeated";

export interface PromoteStudentRow {
  id: string;
  admissionNumber: string;
  fullName: string;
  currentClass: string;
  nextClass: string;
  status: PromotionStatus;
}