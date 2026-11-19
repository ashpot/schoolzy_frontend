import { ArrowDownCircle, CheckCircle2, Download, Eye, FileText, Mail, X } from "lucide-react";
import type { MenuItem } from "@/usersDashboard/super-admin/features/subscriptions/utils/menus";
import type { Invoice, InvoiceMenuKey, Transaction, TxnMenuKey } from "../types";

const T: Record<TxnMenuKey, MenuItem<TxnMenuKey>> = {
  view: { key: "view", label: "View Transaction", icon: Eye },
  receipt: { key: "receipt", label: "Download Receipt", icon: Download },
  invoice: { key: "invoice", label: "Generate Invoice", icon: FileText },
  refund: { key: "refund", label: "Refund Payment", icon: ArrowDownCircle, danger: true },
  paid: { key: "paid", label: "Mark as Paid", icon: CheckCircle2 },
};

export function txnMenu(t: Transaction): MenuItem<TxnMenuKey>[] {
  const keys: TxnMenuKey[] = ["view"];
  if (t.status === "Successful" || t.status === "Refunded") keys.push("receipt");
  keys.push("invoice");
  if (t.status === "Successful") keys.push("refund");
  if (t.status === "Pending") keys.push("paid");
  return keys.map((k) => T[k]);
}

const I: Record<InvoiceMenuKey, MenuItem<InvoiceMenuKey>> = {
  view: { key: "view", label: "View Invoice", icon: FileText },
  pdf: { key: "pdf", label: "Download PDF", icon: Download },
  email: { key: "email", label: "Email Invoice", icon: Mail },
  paid: { key: "paid", label: "Mark as Paid", icon: CheckCircle2 },
  cancel: { key: "cancel", label: "Cancel Invoice", icon: X, danger: true },
};

export function invoiceMenu(i: Invoice): MenuItem<InvoiceMenuKey>[] {
  const keys: InvoiceMenuKey[] = ["view", "pdf"];
  if (i.status !== "Cancelled") keys.push("email");
  if (i.status === "Pending") keys.push("paid", "cancel");
  return keys.map((k) => I[k]);
}