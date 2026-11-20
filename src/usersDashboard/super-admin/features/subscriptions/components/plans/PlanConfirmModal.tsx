import { useId, type FormEvent } from "react";
import { PowerOff, Trash2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { usePlanAction } from "../../hooks/useSubscriptions";
import type { Plan } from "../../types";

interface PlanConfirmModalProps {
  action: "deactivate" | "delete";
  plan: Plan;
  onClose: () => void;
}

export default function PlanConfirmModal({ action, plan, onClose }: PlanConfirmModalProps) {
  const titleId = useId();
  const mutation = usePlanAction();
  const isDelete = action === "delete";
  const Icon = isDelete ? Trash2 : PowerOff;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id: plan.id, action }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={onSubmit} noValidate className="p-8">
        <span className={cn("flex-center h-14 w-14 rounded-2xl", toneIconTile[isDelete ? "red" : "amber"])}>
          <Icon size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">
          {isDelete ? "Delete plan?" : "Deactivate plan?"}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {isDelete ? (
            <><strong>{plan.name}</strong> will be permanently removed. This cannot be undone.</>
          ) : (
            <><strong>{plan.name}</strong> will no longer be offered to new schools. Schools already on it keep their plan.</>
          )}
        </p>

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
            {mutation.error.message}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton
            label={isDelete ? "Delete Plan" : "Deactivate"}
            isLoading={mutation.isPending}
            className="bg-danger hover:bg-danger/90"
          />
        </div>
      </form>
    </ModalShell>
  );
}