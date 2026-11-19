import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownCircle } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { refundSchema, type RefundValues } from "../../schemas";
import { useTransactionAction } from "../../hooks/usePayments";
import type { Transaction } from "../../types";

export default function RefundModal({ txn, onClose }: { txn: Transaction; onClose: () => void }) {
  const titleId = useId();
  const mutation = useTransactionAction();
  const { register, handleSubmit, formState: { errors } } = useForm<RefundValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: { reason: "" },
  });

  const onSubmit = (values: RefundValues) => {
    mutation.mutate({ id: txn.id, action: "refund", reason: values.reason }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-red-soft text-sa-red-icon">
          <ArrowDownCircle size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">Refund payment?</h2>
        <p className="mt-2 text-sm text-text-secondary">
          <strong className="text-text-primary">{formatNaira(txn.amount)}</strong> will be refunded to <strong className="text-text-primary">{txn.school}</strong> ({txn.ref}).
        </p>

        <div className="mt-5">
          <FormInput
            label="Reason for refund *"
            placeholder="e.g. Duplicate payment"
            autoComplete="off"
            error={errors.reason?.message}
            isLoading={mutation.isPending}
            {...register("reason")}
          />
        </div>

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{mutation.error.message}</p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton label="Refund Payment" isLoading={mutation.isPending} className="bg-danger hover:bg-danger/90" />
        </div>
      </form>
    </ModalShell>
  );
}