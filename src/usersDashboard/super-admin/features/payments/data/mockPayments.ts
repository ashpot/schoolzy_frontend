import { isoFromOffset } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { Invoice, InvoiceStatus, InvoicesData, PayMethod, Transaction, TransactionsData, TxnStatus } from "../types";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// TODO: Delete once the real endpoints are wired.
const PREFIX: Record<PayMethod, string> = { Paystack: "PSK", Flutterwave: "FW", "Bank Transfer": "BT", Card: "CD", Manual: "MN" };

type TxnSeed = [school: string, location: string, plan: string, method: PayMethod, amount: number, daysAgo: number, status: TxnStatus];

const TXN_SEEDS: TxnSeed[] = [
  ["Greenfield Academy", "Lagos", "Premium", "Paystack", 38000, 4, "Successful"],
  ["Sunrise Int'l School", "Abuja", "Standard", "Flutterwave", 25000, 9, "Successful"],
  ["Maple Leaf Academy", "Port Harcourt", "Premium", "Paystack", 40000, 1, "Pending"],
  ["Cedar Grove School", "Ibadan", "Basic", "Bank Transfer", 18000, 3, "Failed"],
  ["Horizon Academy", "Enugu", "Standard", "Flutterwave", 28000, 35, "Successful"],
  ["Oakridge International", "Kano", "Premium", "Paystack", 42000, 40, "Successful"],
  ["Blue Horizon School", "Kaduna", "Basic", "Bank Transfer", 16000, 2, "Pending"],
  ["Evergreen Academy", "Enugu", "Standard", "Flutterwave", 30000, 70, "Successful"],
  ["Greenfield Academy", "Lagos", "Premium", "Paystack", 38000, 68, "Successful"],
  ["Westgate College", "Kaduna", "Basic", "Card", 20000, 100, "Successful"],
  ["Pioneer Academy", "Enugu", "Standard", "Flutterwave", 28000, 130, "Successful"],
  ["Crown Heights School", "Edo", "Standard", "Manual", 15000, 160, "Successful"],
  ["Heritage High School", "Rivers", "Premium", "Paystack", 45000, 15, "Successful"],
  ["Rosebud College", "Kano", "Basic", "Card", 14000, 190, "Successful"],
];

function buildTransactions(): Transaction[] {
  return TXN_SEEDS.map(([school, location, plan, method, amount, daysAgo, status], i) => ({
    id: `txn-${i + 1}`,
    ref: `TXN-26-${String(i + 2).padStart(3, "0")}`,
    school,
    location,
    plan,
    method,
    amount,
    date: isoFromOffset(-daysAgo),
    invoiceNo: `INV-26-${String(880 + i).padStart(4, "0")}`,
    gatewayRef: `${PREFIX[method]}-${1000000 + ((i + 3) * 790313) % 8000000}`,
    billing: "Monthly",
    status,
  }));
}

type InvSeed = [school: string, location: string, plan: string, amount: number, invoicedAgo: number, dueIn: number, status: InvoiceStatus];

const INV_SEEDS: InvSeed[] = [
  ["Sunrise Prep School", "Abuja", "Standard", 75000, 12, 2, "Pending"],
  ["Maplewood Institute", "Port Harcourt", "Premium", 120000, 40, -26, "Paid"],
  ["Cedar Valley School", "Ibadan", "Basic", 50000, 30, -16, "Pending"],
  ["Oakridge Learning Center", "Kano", "Standard", 80000, 70, -56, "Paid"],
  ["Bright Futures Academy", "Enugu", "Premium", 110000, 5, 9, "Pending"],
  ["Silver Oak School", "Benin City", "Basic", 55000, 100, -86, "Paid"],
  ["Harmony International", "Jos", "Standard", 85000, 3, 11, "Pending"],
  ["Pinecrest Academy", "Aba", "Premium", 100000, 130, -116, "Paid"],
  ["Greenfield Academy", "Lagos", "Premium", 40660, 160, -146, "Paid"],
  ["Westgate College", "Kaduna", "Basic", 70000, 20, -6, "Cancelled"],
  ["Pioneer Academy", "Enugu", "Standard", 150000, 8, 6, "Paid"],
];

function buildInvoices(): Invoice[] {
  return INV_SEEDS.map(([school, location, plan, amount, invoicedAgo, dueIn, status], i) => ({
    id: `inv-${i + 1}`,
    invoiceNo: `INV-26-${String(892 + i).padStart(4, "0")}`,
    school,
    location,
    plan,
    invoiceDate: isoFromOffset(-invoicedAgo),
    dueDate: isoFromOffset(dueIn),
    amount,
    status,
  }));
}

const up = (text: string) => ({ text, good: true });
const down = (text: string) => ({ text, good: false });

export async function mockFetchTransactions(): Promise<TransactionsData> {
  await mockDelay(700);
  return {
    transactions: buildTransactions(),
    deltas: { revenue: up("+12.4% vs last month"), successful: up("+5 this week"), pending: up("-2 vs yesterday"), failed: down("+1 this week") },
  };
}

export async function mockFetchInvoices(): Promise<InvoicesData> {
  await mockDelay(700);
  return {
    invoices: buildInvoices(),
    overdueTrend: [3, 4, 2, 5, 3, 1, 2, 1].map((value, i) => ({ label: `W${i + 1}`, value })),
    deltas: { generated: up("+3 this month"), paid: up("+2 this week"), outstanding: up("-1 vs last week"), overdue: down("+1 this week") },
  };
}