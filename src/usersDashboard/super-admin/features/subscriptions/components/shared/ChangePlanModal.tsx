import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrendingDown, TrendingUp } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { changePlanSchema, type ChangePlanValues } from "../../schemas";
import { useChangePlan, usePlans } from "../../hooks/useSubscriptions";
import type { Subscription } from "../../types";
import { formatNaira } from "../../utils/format";

interface ChangePlanModalProps {
  direction: "upgrade" | "downgrade";
  sub: Subscription;
  onClose: () => void;
}

export default function ChangePlanModal({ direction, sub, onClose }: ChangePlanModalProps) {
  const titleId = useId();
  const { data: plans } = usePlans();
  const mutation = useChangePlan();
  const up = direction === "upgrade";
  const Icon = up ? TrendingUp : TrendingDown;

  // Only active plans that are actually higher (or lower) than the current one
  const options = useMemo(() => {
    const list = plans ?? [];
    const current = list.find((p) => p.name === sub.plan)?.monthlyPrice ?? 0;
    return list
      .filter((p) => p.active && p.name !== sub.plan && (up ? p.monthlyPrice > current : p.monthlyPrice < current))
      .map((p) => ({ value: p.name, label: `${p.name} · ${formatNaira(p.monthlyPrice)}/mo` }));
  }, [plans, sub.plan, up]);

  const { register, handleSubmit, formState: { errors } } = useForm<ChangePlanValues>({
    resolver: zodResolver(changePlanSchema),
    defaultValues: { plan: "" },
  });

  const onSubmit = (values: ChangePlanValues) => {
    mutation.mutate({ id: sub.id, plan: values.plan }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-blue-soft text-sa-blue-icon">
          <Icon size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">
          {up ? "Upgrade plan" : "Downgrade plan"}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          <strong className="text-text-primary">{sub.school}</strong> is on the <strong>{sub.plan}</strong> plan.
        </p>

        {options.length === 0 ? (
          <p className="mt-5 rounded-xl bg-sa-amber-soft px-4 py-3 text-sm text-sa-amber-text">
            There is no {up ? "higher" : "lower"} plan available.
          </p>
        ) : (
          <div className="mt-5">
            <FormSelect label="New Plan *" options={options} placeholder="Select plan" error={errors.plan?.message} {...register("plan")} />
          </div>
        )}

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
            {mutation.error.message}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
            {options.length === 0 ? "Close" : "Cancel"}
          </Button>
          {options.length > 0 && <SubmitButton label={up ? "Upgrade" : "Downgrade"} isLoading={mutation.isPending} />}
        </div>
      </form>
    </ModalShell>
  );
}