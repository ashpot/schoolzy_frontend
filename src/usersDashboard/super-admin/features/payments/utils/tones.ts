import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { PALETTE } from "@/usersDashboard/super-admin/shared/utils/chartPalette";
import type { InvoiceDisplay, PayMethod, TxnStatus } from "../types";

export const txnTone: Record<TxnStatus, Tone> = {
  Successful: "green",
  Pending: "amber",
  Failed: "red",
  Refunded: "purple",
};

export const invoiceTone: Record<InvoiceDisplay, Tone> = {
  Paid: "green",
  Pending: "amber",
  Overdue: "red",
  Cancelled: "gray",
};

const PLAN_COLORS: Record<string, string> = {
  premium: PALETTE.blue,
  standard: PALETTE.green,
  basic: PALETTE.amber,
};
export const planColor = (name: string) => PLAN_COLORS[name.toLowerCase()] ?? PALETTE.purple;

export const METHOD_COLORS: Record<PayMethod, string> = {
  Paystack: PALETTE.green,
  Flutterwave: PALETTE.orange,
  "Bank Transfer": PALETTE.teal,
  Card: PALETTE.blue,
  Manual: PALETTE.purple,
};