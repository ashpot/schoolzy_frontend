import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, XCircle } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { makeDecisionSchema, type DecisionValues } from "../../schemas/queues";
import { useApproveSchool, useRejectSchool } from "../../hooks/useQueues";
import type { School } from "../../types";
import type { QueueDecision } from "../../types/queues";
import ModalShell from "../all-schools/ModalShell";

interface PendingActionModalProps {
  action: QueueDecision;
  school: School;
  onClose: () => void;
}

export default function PendingActionModal({ action, school, onClose }: PendingActionModalProps) {
  const titleId = useId();
  const isReject = action === "reject";
  const approve = useApproveSchool();
  const reject = useRejectSchool();
  const mutation = isReject ? reject : approve;

  const schema = useMemo(() => makeDecisionSchema(isReject), [isReject]);
  const { register, handleSubmit, formState: { errors } } = useForm<DecisionValues>({
    resolver: zodResolver(schema),
    defaultValues: { reason: "" },
  });

  const onSubmit = (values: DecisionValues) => {
    mutation.mutate({ id: school.id, reason: values.reason || undefined }, { onSuccess: onClose });
  };

  const Icon = isReject ? XCircle : Check;

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className={cn("flex-center h-14 w-14 rounded-2xl", toneIconTile[isReject ? "red" : "green"])}>
          <Icon size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">
          {isReject ? "Reject school?" : "Approve school?"}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {isReject ? (
            <><strong>{school.name}</strong> will be rejected and removed from the pending queue.</>
          ) : (
            <><strong>{school.name}</strong> will be approved and given access to the platform.</>
          )}
        </p>

        {isReject && (
          <div className="mt-5">
            <FormInput
              label="Reason for rejection *"
              placeholder="e.g. Incomplete documents"
              autoComplete="off"
              error={errors.reason?.message}
              isLoading={mutation.isPending}
              {...register("reason")}
            />
          </div>
        )}

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
            {mutation.error.message}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton
            label={isReject ? "Reject School" : "Approve School"}
            isLoading={mutation.isPending}
            className={isReject ? "bg-danger hover:bg-danger/90" : "bg-sa-green-icon hover:brightness-95"}
          />
        </div>
      </form>
    </ModalShell>
  );
}