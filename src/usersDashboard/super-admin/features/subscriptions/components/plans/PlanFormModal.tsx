import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { planSchema, type PlanValues } from "../../schemas";
import { useSavePlan } from "../../hooks/useSubscriptions";
import type { Plan } from "../../types";
import { FEATURES, PLAN_FORM_DEFAULTS, SUPPORT_OPTIONS } from "../../utils/constants";
import { planToValues } from "../../utils/mapPlan";

interface PlanFormModalProps {
  plan: Plan | null; // null = create
  onClose: () => void;
}

export default function PlanFormModal({ plan, onClose }: PlanFormModalProps) {
  const titleId = useId();
  const editing = plan !== null;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PlanValues>({
    resolver: zodResolver(planSchema),
    defaultValues: plan ? planToValues(plan) : PLAN_FORM_DEFAULTS,
  });
  const mutation = useSavePlan();
  const busy = mutation.isPending;
  const active = watch("active");

  const onSubmit = (values: PlanValues) => {
    mutation.mutate({ id: plan?.id, values }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-2xl" closeOnBackdrop={false}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-jakarta text-2xl font-semibold text-text-primary">
            {editing ? "Edit Subscription Plan" : "Create Subscription Plan"}
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormInput label="Plan Name" placeholder="e.g. Professional" autoComplete="off" error={errors.name?.message} isLoading={busy} {...register("name")} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="sa-plan-description" className="mb-1.5 block text-sm font-medium text-label">Description</label>
            <textarea
              id="sa-plan-description"
              rows={3}
              disabled={busy}
              placeholder="Brief description of this plan..."
              aria-invalid={Boolean(errors.description)}
              className="w-full resize-none rounded-xl border border-border-line02 bg-bg-input px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60"
              {...register("description")}
            />
            {errors.description && <p role="alert" className="mt-1 text-xs text-danger">{errors.description.message}</p>}
          </div>

          <FormInput label="Monthly Price (₦)" inputMode="numeric" placeholder="e.g. 15000" autoComplete="off" error={errors.monthlyPrice?.message} isLoading={busy} {...register("monthlyPrice")} />
          <FormInput label="Yearly Price (₦)" inputMode="numeric" placeholder="e.g. 150000" autoComplete="off" error={errors.yearlyPrice?.message} isLoading={busy} {...register("yearlyPrice")} />
          <FormInput label="Maximum Students" inputMode="numeric" placeholder="e.g. 500" autoComplete="off" error={errors.maxStudents?.message} isLoading={busy} {...register("maxStudents")} />
          <FormInput label="Maximum Teachers" inputMode="numeric" placeholder="e.g. 40" autoComplete="off" error={errors.maxTeachers?.message} isLoading={busy} {...register("maxTeachers")} />
          <FormInput label="Storage Limit (GB)" inputMode="numeric" placeholder="e.g. 30" autoComplete="off" error={errors.storageGb?.message} isLoading={busy} {...register("storageGb")} />
          <FormSelect label="Support Level" options={SUPPORT_OPTIONS} error={errors.support?.message} {...register("support")} />
        </div>

        <fieldset className="mt-6">
          <legend className="mb-3 text-sm font-medium text-label">Included Features</legend>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <label key={f} className="flex cursor-pointer items-center gap-2.5 text-sm text-text-primary">
                <input type="checkbox" value={f} className="h-4 w-4 rounded border-border-line03 accent-brand-primary" {...register("features")} />
                {f}
              </label>
            ))}
          </div>
          {errors.features && <p role="alert" className="mt-2 text-xs text-danger">{errors.features.message}</p>}
        </fieldset>

        <label className="mt-6 flex cursor-pointer items-center gap-2.5 text-sm text-text-primary">
          <input type="checkbox" className="h-4 w-4 rounded border-border-line03 accent-brand-primary" {...register("recommended")} />
          Mark as Recommended Plan
        </label>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-sm text-text-secondary">Status:</span>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" className="peer sr-only" {...register("active")} />
            <span className="relative h-6 w-11 rounded-full bg-sa-gray-line transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-sa-green-icon peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary/40" />
            <span className="text-sm font-medium text-text-primary">{active ? "Active" : "Inactive"}</span>
          </label>
        </div>

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
            {mutation.error.message}
          </p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={busy}>Cancel</Button>
          <SubmitButton label={editing ? "Save Changes" : "Create Plan"} isLoading={busy} />
        </div>
      </form>
    </ModalShell>
  );
}