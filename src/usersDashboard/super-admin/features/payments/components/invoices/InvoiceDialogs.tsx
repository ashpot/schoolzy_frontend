import { AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, X, type LucideIcon } from "lucide-react";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { useInvoiceAction } from "../../hooks/usePayments";
import type { Invoice, InvoiceMenuKey } from "../../types";
import ConfirmModal from "../shared/ConfirmModal";

export interface InvoiceTarget {
  key: Exclude<InvoiceMenuKey, "view" | "pdf">;
  invoice: Invoice;
}

const META: Record<InvoiceTarget["key"], { title: string; confirm: string; icon: LucideIcon; tone: Tone; destructive: boolean }> = {
  paid: { title: "Mark as paid?", confirm: "Mark as Paid", icon: CheckCircle2, tone: "green", destructive: false },
  email: { title: "Email invoice?", confirm: "Send Email", icon: Mail, tone: "blue", destructive: false },
  cancel: { title: "Cancel invoice?", confirm: "Cancel Invoice", icon: X, tone: "red", destructive: true },
};

function InvoiceConfirm({ target, onClose }: { target: InvoiceTarget; onClose: () => void }) {
  const mutation = useInvoiceAction();
  const { key, invoice } = target;
  const m = META[key];

  const body =
    key === "paid" ? (
      <><strong>{invoice.invoiceNo}</strong> ({formatNaira(invoice.amount)}) will be recorded as paid.</>
    ) : key === "email" ? (
      <><strong>{invoice.invoiceNo}</strong> will be emailed to the administrator of <strong>{invoice.school}</strong>.</>
    ) : (
      <><strong>{invoice.invoiceNo}</strong> will be cancelled and can no longer be paid.</>
    );

  return (
    <ConfirmModal
      title={m.title}
      body={body}
      icon={m.icon}
      tone={m.tone}
      confirmLabel={m.confirm}
      destructive={m.destructive}
      isPending={mutation.isPending}
      error={mutation.isError ? mutation.error.message : null}
      onConfirm={() => mutation.mutate({ id: invoice.id, action: key }, { onSuccess: onClose })}
      onClose={onClose}
    />
  );
}

export default function InvoiceDialogs({ target, onClose }: { target: InvoiceTarget | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {target && <InvoiceConfirm key={`${target.key}-${target.invoice.id}`} target={target} onClose={onClose} />}
    </AnimatePresence>
  );
}