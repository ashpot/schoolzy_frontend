import { useId } from "react";
import { CheckCircle2, Download, Mail, Printer } from "lucide-react";
import Button from "@/shared/ui/Button";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import SideDrawer from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SideDrawer";
import { formatDate, formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { Invoice, InvoiceMenuKey } from "../../types";
import { invoiceDisplay } from "../../utils/derive";
import { splitTax } from "../../utils/tax";
import { invoiceTone } from "../../utils/tones";

interface InvoiceDrawerProps {
  invoice: Invoice;
  onClose: () => void;
  onAction: (key: InvoiceMenuKey, invoice: Invoice) => void;
}

export default function InvoiceDrawer({ invoice, onClose, onAction }: InvoiceDrawerProps) {
  const titleId = useId();
  const { subtotal, tax, total } = splitTax(invoice.amount);
  const status = invoiceDisplay(invoice);

  return (
    <SideDrawer
      title="Invoice Preview"
      subtitle={invoice.invoiceNo}
      titleId={titleId}
      onClose={onClose}
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="primary" leftIcon={<Download size={16} />} onClick={() => onAction("pdf", invoice)}>Download PDF</Button>
          <Button type="button" variant="outline" leftIcon={<Printer size={16} />} onClick={() => onAction("pdf", invoice)}>Print</Button>
          <Button type="button" variant="outline" leftIcon={<Mail size={16} />} disabled={invoice.status === "Cancelled"} onClick={() => onAction("email", invoice)}>
            Email Invoice
          </Button>
          <Button type="button" variant="outline" leftIcon={<CheckCircle2 size={16} />} disabled={invoice.status !== "Pending"} onClick={() => onAction("paid", invoice)}>
            Mark as Paid
          </Button>
        </div>
      }
    >
      <div className="space-y-5 px-8 py-6">
        <StatusBadge label={status} tone={invoiceTone[status]} />

        <div className="rounded-2xl border border-border-line02 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-jakarta text-2xl font-bold text-brand-primary">INVOICE</p>
              <p className="text-xs text-text-muted">{invoice.invoiceNo}</p>
            </div>
            <dl className="text-right text-xs">
              <dt className="text-text-muted">Invoice Date</dt>
              <dd className="mb-2 font-semibold text-text-primary">{formatDate(invoice.invoiceDate)}</dd>
              <dt className="text-text-muted">Due Date</dt>
              <dd className="font-semibold text-text-primary">{formatDate(invoice.dueDate)}</dd>
            </dl>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Billed To</p>
              <p className="mt-1 font-semibold text-text-primary">{invoice.school}</p>
              {invoice.location && <p className="text-xs text-text-secondary">{invoice.location}, Nigeria</p>}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">From</p>
              <p className="mt-1 font-semibold text-text-primary">Schoolzy Ltd.</p>
              <p className="text-xs text-text-secondary">billing@schoolzy.com</p>
            </div>
          </div>
        </div>

        <dl className="space-y-2 rounded-2xl border border-border-line02 p-5 text-sm">
          <div className="flex justify-between"><dt className="text-text-secondary">Subtotal</dt><dd className="font-semibold">{formatNaira(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-text-secondary">Tax (7%)</dt><dd className="font-semibold">{formatNaira(tax)}</dd></div>
          <div className="flex justify-between border-t border-border-line02 pt-3">
            <dt className="font-semibold text-text-primary">Grand Total</dt>
            <dd className="text-lg font-semibold text-brand-primary">{formatNaira(total)}</dd>
          </div>
        </dl>

        <div className="rounded-2xl border border-sa-green-line bg-sa-green-soft p-5 text-sm">
          <p className="font-semibold text-sa-green-text">Payment Instructions</p>
          <p className="mt-1 text-text-secondary">
            Pay via Paystack, Flutterwave, or bank transfer. Reference: {invoice.invoiceNo}. Contact billing@schoolzy.com for queries.
          </p>
        </div>
      </div>
    </SideDrawer>
  );
}