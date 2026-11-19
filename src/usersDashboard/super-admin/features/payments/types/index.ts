import type { MetricDelta } from "@/usersDashboard/super-admin/shared/components/MetricCard";

export type TxnStatus = "Successful" | "Pending" | "Failed" | "Refunded";
export type PayMethod = "Paystack" | "Flutterwave" | "Bank Transfer" | "Card" | "Manual";
export type InvoiceStatus = "Paid" | "Pending" | "Cancelled";
export type InvoiceDisplay = InvoiceStatus | "Overdue";

export interface Transaction {
  id: string;
  ref: string;
  school: string;
  location: string;
  plan: string;
  method: PayMethod;
  amount: number; // tax-inclusive total
  date: string; // yyyy-mm-dd
  invoiceNo: string;
  gatewayRef: string;
  billing: "Monthly" | "Annual";
  status: TxnStatus;
  refundReason?: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  school: string;
  location: string;
  plan: string;
  invoiceDate: string;
  dueDate: string;
  amount: number; // tax-inclusive total
  status: InvoiceStatus;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface TransactionsData {
  transactions: Transaction[];
  // TODO: the backend should provide these deltas
  deltas: { revenue: MetricDelta; successful: MetricDelta; pending: MetricDelta; failed: MetricDelta };
}

export interface InvoicesData {
  invoices: Invoice[];
  overdueTrend: ChartPoint[]; // weekly overdue count
  deltas: { generated: MetricDelta; paid: MetricDelta; outstanding: MetricDelta; overdue: MetricDelta };
}

export type TxnMenuKey = "view" | "receipt" | "invoice" | "refund" | "paid";
export type InvoiceMenuKey = "view" | "pdf" | "email" | "paid" | "cancel";