import { useId } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Download, FileText, X } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { DrawerSection, InfoCell } from "@/usersDashboard/super-admin/features/subscriptions/components/shared/DrawerParts";
import SideDrawer from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SideDrawer";
import { formatDate, formatNaira, initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import { rowVariant, staggerContainer } from "../../animations/variants";
import type { Transaction, TxnMenuKey } from "../../types";
import { splitTax } from "../../utils/tax";
import { txnTone } from "../../utils/tones";

interface Step {
  label: string;
  date: string | null;
  state: "done" | "pending" | "failed";
}

function stepsFor(t: Transaction): Step[] {
  const d = formatDate(t.date);
  const base: Step[] = [
    { label: "Invoice Generated", date: d, state: "done" },
    { label: "Payment Initiated", date: d, state: "done" },
  ];
  if (t.status === "Pending") {
    return [...base, { label: "Payment Completed", date: null, state: "pending" }, { label: "Receipt Issued", date: null, state: "pending" }];
  }
  if (t.status === "Failed") return [...base, { label: "Payment Failed", date: d, state: "failed" }];
  const done: Step[] = [...base, { label: "Payment Completed", date: d, state: "done" }, { label: "Receipt Issued", date: d, state: "done" }];
  return t.status === "Refunded" ? [...done, { label: "Payment Refunded", date: d, state: "done" }] : done;
}

const DOT = {
  done: "bg-sa-green-icon text-white",
  pending: "bg-sa-gray-soft text-sa-gray-icon",
  failed: "bg-sa-red-icon text-white",
} as const;

interface TransactionDrawerProps {
  txn: Transaction;
  onClose: () => void;
  onAction: (key: TxnMenuKey, txn: Transaction) => void;
}

export default function TransactionDrawer({ txn, onClose, onAction }: TransactionDrawerProps) {
  const titleId = useId();
  const { subtotal, tax, total } = splitTax(txn.amount);
  const steps = stepsFor(txn);
  const canRefund = txn.status === "Successful";
  const canReceipt = txn.status === "Successful" || txn.status === "Refunded";
  const processedBy = txn.method === "Bank Transfer" || txn.method === "Manual" ? "Finance team" : `${txn.method} Gateway`;

  return (
    <SideDrawer
      title="Transaction Details"
      subtitle={txn.ref}
      titleId={titleId}
      onClose={onClose}
      footer={
        <>
          {canReceipt && (
            <Button type="button" variant="primary" className="w-full" leftIcon={<Download size={16} />} onClick={() => onAction("receipt", txn)}>
              Download Receipt
            </Button>
          )}
          {txn.status === "Pending" && (
            <Button type="button" variant="primary" className="w-full" onClick={() => onAction("paid", txn)}>Mark as Paid</Button>
          )}
          <div className={cn("grid gap-3", canRefund ? "grid-cols-2" : "grid-cols-1")}>
            <Button type="button" variant="outline" leftIcon={<FileText size={16} />} onClick={() => onAction("invoice", txn)}>
              Generate Invoice
            </Button>
            {canRefund && (
              <Button type="button" variant="outline" className="border-sa-red-line text-sa-red-text" onClick={() => onAction("refund", txn)}>
                Refund
              </Button>
            )}
          </div>
        </>
      }
    >
      <div className="px-8 py-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-bg-input p-4">
          <div className="flex items-center gap-3">
            <span className={cn("flex-center h-11 w-11 shrink-0 rounded-xl text-sm font-semibold", schoolTileClass(txn.school))}>{initials2(txn.school)}</span>
            <div>
              <p className="font-semibold text-text-primary">{txn.school}</p>
              <p className="text-xs text-text-muted">{txn.location}</p>
            </div>
          </div>
          <StatusBadge label={txn.status} tone={txnTone[txn.status]} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <InfoCell label="Invoice No.">{txn.invoiceNo}</InfoCell>
          <InfoCell label="Gateway Ref">{txn.gatewayRef}</InfoCell>
          <InfoCell label="Payment Method" className="text-sa-green-text">{txn.method}</InfoCell>
          <InfoCell label="Subscription Plan">{txn.plan}</InfoCell>
          <InfoCell label="Billing Cycle">{txn.billing}</InfoCell>
          <InfoCell label="Processed By">{processedBy}</InfoCell>
        </div>

        <dl className="mt-4 space-y-2 rounded-2xl border border-border-line02 p-5 text-sm">
          <div className="flex justify-between"><dt className="text-text-secondary">Subtotal</dt><dd className="font-semibold">{formatNaira(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-text-secondary">Tax (7%)</dt><dd className="font-semibold">{formatNaira(tax)}</dd></div>
          <div className="flex justify-between border-t border-border-line02 pt-3">
            <dt className="font-semibold text-text-primary">Total Paid</dt>
            <dd className="text-base font-semibold text-brand-primary">{formatNaira(total)}</dd>
          </div>
        </dl>
        {txn.refundReason && <p className="mt-3 text-xs text-text-muted">Refund reason: {txn.refundReason}</p>}
      </div>

      <DrawerSection title="Payment Timeline">
        <motion.ol variants={staggerContainer} initial="hidden" animate="show">
          {steps.map((s, i) => (
            <motion.li key={s.label} variants={rowVariant} className="relative flex gap-4 pb-5 last:pb-0">
              {i < steps.length - 1 && <span aria-hidden className="absolute bottom-0 left-[11px] top-7 w-px bg-sa-green-line" />}
              <span className={cn("flex-center mt-0.5 h-6 w-6 shrink-0 rounded-full", DOT[s.state])}>
                {s.state === "done" ? <Check size={13} aria-hidden /> : s.state === "failed" ? <X size={13} aria-hidden /> : <Clock size={13} aria-hidden />}
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{s.label}</p>
                <p className="text-xs text-text-muted">{s.date ?? "Pending"}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </DrawerSection>
    </SideDrawer>
  );
}