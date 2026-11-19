import type { PayMethod, TxnStatus } from "../types";

export const PAGE_SIZE = 8;

export const METHODS: PayMethod[] = ["Paystack", "Flutterwave", "Bank Transfer", "Card", "Manual"];
export const TXN_STATUSES: TxnStatus[] = ["Successful", "Pending", "Failed", "Refunded"];
export const INVOICE_STATUSES = ["Paid", "Pending", "Overdue", "Cancelled"];