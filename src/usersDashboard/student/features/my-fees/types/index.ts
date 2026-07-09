export type FeeRecordStatus = "Paid" | "Partially Paid" | "Outstanding";

export interface FeeRecord {
  id: string;
  term: string;
  fee: string;
  status: FeeRecordStatus;
  amount: number;
  amountPaid: number;
  balance: number;
}

export interface StudentFeeProfile {
  studentName: string;
  className: string;
  feeStatus: FeeRecordStatus;
  totalFees: number;
  totalPaid: number;
  balanceDue: number;
}