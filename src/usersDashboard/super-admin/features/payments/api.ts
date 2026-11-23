import { API_BASE_URL } from "@/shared/config/api";

const BASE = `${API_BASE_URL}/platform/payments/`;

// TODO: paths are guesses; confirm with the backend docs
export const PAYMENTS_ENDPOINTS = {
  TRANSACTIONS: `${BASE}transactions/`,
  TRANSACTION_ACTION: (id: string, action: "mark-paid" | "refund" | "invoice") =>
    `${BASE}transactions/${id}/${action}/`,
  INVOICES: `${BASE}invoices/`,
  INVOICE_ACTION: (id: string, action: "mark-paid" | "cancel" | "email") =>
    `${BASE}invoices/${id}/${action}/`,
} as const;