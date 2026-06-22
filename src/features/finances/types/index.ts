export interface FeeType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Fee {
  id: string;
  name: string;
  feeTypeId: string;
  feeTypeName: string;
  term: "First Term" | "Second Term" | "Third Term";
  amount: number;
  dateDue: string;
}

export interface AssignedFee {
  id: string;
  feeId: string;
  feeName: string;
  feeTypeName: string;
  feeTypeIndex: number;
  amount: number;
  sectionId: string;
  sectionLabel: string;
}

export interface Student {
  id: string;
  name: string;
  admissionNo: string;
  class: string;
  sectionId: string;
  sectionLabel: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  studentClass: string;
  sectionLabel: string;
  feeId: string;
  feeName: string;
  feeTypeName: string;
  feeTypeIndex: number;
  term: string;
  receivedBy: string;
  receivedDate: string;
  amount: number;
  totalFeeAmount: number;
}

export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  recordedBy: string;
}

export interface PaidListEntry {
  studentId: string;
  studentName: string;
  admissionNo: string;
  studentClass: string;
  sectionLabel: string;
  amountPaid: number;
  totalFeeAmount: number;
  datePaid: string;
}