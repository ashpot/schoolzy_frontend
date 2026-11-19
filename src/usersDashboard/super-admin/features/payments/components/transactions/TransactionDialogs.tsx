import { AnimatePresence } from "framer-motion";
import { CheckCircle2, FileText } from "lucide-react";
import { formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { useTransactionAction } from "../../hooks/usePayments";
import type { Transaction, TxnMenuKey } from "../../types";
import ConfirmModal from "../shared/ConfirmModal";
import RefundModal from "./RefundModal";

export interface TxnTarget {
  key: Exclude<TxnMenuKey, "view" | "receipt">;
  txn: Transaction;
}

function TxnConfirm({ target, onClose }: { target: TxnTarget; onClose: () => void }) {
  const mutation = useTransactionAction();
  const { key, txn } = target;
  const paid = key === "paid";

  return (
    <ConfirmModal
      title={paid ? "Mark as paid?" : "Generate invoice?"}
      body={
        paid ? (
          <><strong>{txn.ref}</strong> ({formatNaira(txn.amount)}) will be recorded as a successful payment.</>
        ) : (
          <>An invoice for <strong>{txn.school}</strong> ({formatNaira(txn.amount)}) will be generated.</>
        )
      }
      icon={paid ? CheckCircle2 : FileText}
      tone={paid ? "green" : "blue"}
      confirmLabel={paid ? "Mark as Paid" : "Generate"}
      isPending={mutation.isPending}
      error={mutation.isError ? mutation.error.message : null}
      onConfirm={() => mutation.mutate({ id: txn.id, action: paid ? "paid" : "invoice" }, { onSuccess: onClose })}
      onClose={onClose}
    />
  );
}

export default function TransactionDialogs({ target, onClose }: { target: TxnTarget | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {target &&
        (target.key === "refund" ? (
          <RefundModal key={`refund-${target.txn.id}`} txn={target.txn} onClose={onClose} />
        ) : (
          <TxnConfirm key={`${target.key}-${target.txn.id}`} target={target} onClose={onClose} />
        ))}
    </AnimatePresence>
  );
}