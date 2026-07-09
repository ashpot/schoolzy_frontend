import type { FeeRecord, StudentFeeProfile } from "../types";

export const mockFeeProfile: StudentFeeProfile = {
  studentName: "Taiwo Okonkwo",
  className: "SS 2A",
  feeStatus: "Outstanding",
  totalFees: 270000,
  totalPaid: 140000,
  balanceDue: 130000,
};

export const mockFeeRecords: FeeRecord[] = [
  { id: "1", term: "First Term", fee: "School Fees", status: "Paid", amount: 75000, amountPaid: 75000, balance: 0 },
  { id: "2", term: "First Term", fee: "Dev Levy", status: "Paid", amount: 15000, amountPaid: 15000, balance: 0 },
  { id: "3", term: "Second Term", fee: "School Fees", status: "Partially Paid", amount: 75000, amountPaid: 50000, balance: 25000 },
  { id: "4", term: "Second Term", fee: "Dev Levy", status: "Outstanding", amount: 15000, amountPaid: 0, balance: 15000 },
  { id: "5", term: "Third Term", fee: "School Fees", status: "Outstanding", amount: 75000, amountPaid: 0, balance: 75000 },
  { id: "6", term: "Third Term", fee: "Dev Levy", status: "Outstanding", amount: 15000, amountPaid: 0, balance: 15000 },
];