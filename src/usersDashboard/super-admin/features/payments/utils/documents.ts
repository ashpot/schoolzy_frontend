import { formatDate, formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { Invoice, Transaction } from "../types";
import { splitTax } from "./tax";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

// TODO: replace with a server-generated PDF once the backend endpoint exists.
// Until then this opens a clean printable page (use "Save as PDF" in the print dialog).
export function openPrintable(title: string, rows: [string, string][]) {
  const w = window.open("", "_blank", "width=720,height=900");
  if (!w) {
    window.alert("Allow pop-ups to open this document.");
    return;
  }
  const body = rows
    .map(([k, v]) => `<tr><td style="padding:8px 0;color:#667">${esc(k)}</td><td style="padding:8px 0;text-align:right;font-weight:600">${esc(v)}</td></tr>`)
    .join("");
  w.document.write(
    `<!doctype html><title>${esc(title)}</title><body style="font-family:system-ui,sans-serif;max-width:560px;margin:40px auto"><h1 style="font-size:22px">${esc(title)}</h1><table style="width:100%;border-collapse:collapse">${body}</table></body>`
  );
  w.document.close();
  w.focus();
  w.print();
}

export function openReceipt(t: Transaction) {
  const { subtotal, tax } = splitTax(t.amount);
  openPrintable(`Payment Receipt ${t.ref}`, [
    ["School", t.school],
    ["Invoice No.", t.invoiceNo],
    ["Gateway Ref", t.gatewayRef],
    ["Method", t.method],
    ["Plan", t.plan],
    ["Date", formatDate(t.date)],
    ["Subtotal", formatNaira(subtotal)],
    ["Tax (7%)", formatNaira(tax)],
    ["Total Paid", formatNaira(t.amount)],
  ]);
}

export function openInvoice(i: Invoice) {
  const { subtotal, tax } = splitTax(i.amount);
  openPrintable(`Invoice ${i.invoiceNo}`, [
    ["Billed To", i.school],
    ["From", "Schoolzy Ltd."],
    ["Plan", i.plan],
    ["Invoice Date", formatDate(i.invoiceDate)],
    ["Due Date", formatDate(i.dueDate)],
    ["Subtotal", formatNaira(subtotal)],
    ["Tax (7%)", formatNaira(tax)],
    ["Grand Total", formatNaira(i.amount)],
  ]);
}