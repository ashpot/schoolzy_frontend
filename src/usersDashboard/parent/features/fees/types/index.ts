export type FeeStatus = "Paid" | "Partially Paid" | "Outstanding";

export interface FeeOption {
  id: string;
  label: string;
  amount: number;
}

export interface PaymentHistoryRecord {
  id: string;
  term: string;
  fee: string;
  status: FeeStatus;
  amountPaid: number;
  balance: number;
}