import { API_BASE_URL } from "@/shared/config/api";

export const FINANCES_ENDPOINTS = {
  CREATE_FEE_TYPE: `${API_BASE_URL}/finances/fee-types/`,
  LIST_FEE_TYPES: `${API_BASE_URL}/finances/fee-types/`,
  CREATE_FEE: `${API_BASE_URL}/finances/fees/`,
  LIST_FEES: `${API_BASE_URL}/finances/fees/`,
  ASSIGN_FEE: `${API_BASE_URL}/finances/assigned-fees/`,
  CREATE_PAYMENT: `${API_BASE_URL}/finances/payments/`,
  CREATE_EXPENSE: `${API_BASE_URL}/finances/expenses/`,
  EXPENSE_REPORT: `${API_BASE_URL}/finances/expense-report/all/`,
} as const;