export interface FeeType {
  id: string;
  name: string;
  description: string;
}
export interface FeeTypePayload {
  name: string;
  description: string;
}
export interface FeeTypeResponse {
  id: number;
  name: string;
  description: string;
}

export interface Fee {
  id: string;
  name: string;
  feeTypeId: string;
  feeTypeName: string;
  termId: string;
  termName: string;
  amount: number;
  dateDue: string;
  dateCreated: string;
}

export interface FeePayload {
  name: string;
  fee_type: number;
  term: number;
  amount: number;
  date_due: string;
}
export interface FeeResponse {
  id: number;
  fee_type_name: string;
  term_name: string;
  name: string;
  amount: string;
  date_created: string;
  date_due: string;
  fee_type: number;
  term: number;
}

export interface AssignedFee {
  id: string;
  feeId: string;
  feeName: string;
  sectionId: string;
  sectionLabel: string;
}
export interface AssignFeePayload {
  fee: number;
  section: number;
}
export interface AssignFeeResponse {
  id: number;
  fee_name: string;
  section_name: string;
  fee: number;
  section: number;
}

export interface Student {
  id: string;
  name: string;
  admissionNo: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  feeId: string;
  feeName: string;
  description: string;
  receiptNumber: string;
  receivedByLabel: string; // resolved display name, not a submitted field
  receivedDate: string;
  amount: number;
  balance: number; // real value from backend response, not recomputed
}
export interface PaymentPayload {
  student: number;
  fee: number;
  description: string;
  amount: number;
}
export interface PaymentResponse {
  id: number;
  fee_name: string;
  receipt_number: string;
  description: string;
  amount: string;
  balance: string;
  date_paid: string;
  fee: number;
  student: number;
  accountant: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  recordedByLabel: string;
}
export interface ExpensePayload {
  description: string;
  amount: number;
}
export interface ExpenseResponse {
  id: number;
  description: string;
  amount: string;
  date_created: string;
  user: number;
}
export interface ExpenseReportResponse {
  expenses: ExpenseResponse[];
  total_expenses: number;
  current_month_expenses: number;
  average_expense: number;
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