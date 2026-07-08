import type { FeeOption, PaymentHistoryRecord } from "../types";

export const childOptions = [
  { value: "c1", label: "Chukwuemeka Felix (ADM/2024/001)" },
  { value: "c2", label: "Adaeze Felix (ADM/2024/002)" },
];

export const feeOptionsByChild: Record<string, FeeOption[]> = {
  c1: [
    { id: "f1", label: "School Fees (JSS 3)", amount: 85000 },
    { id: "f2", label: "Development Levy", amount: 15000 },
    { id: "f3", label: "ICT Levy", amount: 10000 },
  ],
  c2: [
    { id: "f4", label: "School Fees (Primary 5)", amount: 65000 },
    { id: "f5", label: "Development Levy", amount: 12000 },
  ],
};

export const mockPaymentHistory: PaymentHistoryRecord[] = [
  { id: "p1", term: "First Term 2024/2025", fee: "School Fees (JSS 3)", status: "Paid", amountPaid: 85000, balance: 0 },
  { id: "p2", term: "First Term 2024/2025", fee: "Development Levy", status: "Partially Paid", amountPaid: 8000, balance: 7000 },
  { id: "p3", term: "First Term 2024/2025", fee: "ICT Levy", status: "Outstanding", amountPaid: 0, balance: 10000 },
  { id: "p4", term: "Third Term 2023/2024", fee: "School Fees (JSS 2)", status: "Paid", amountPaid: 80000, balance: 0 },
  { id: "p5", term: "Third Term 2023/2024", fee: "Development Levy", status: "Paid", amountPaid: 15000, balance: 0 },
];