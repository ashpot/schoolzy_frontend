import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import type { CreateSchoolInput } from "../../schemas";
import { PLAN_DEFAULTS, PLAN_SELECT_OPTIONS, isSchoolPlan } from "../../utils/constants";
import { addDays, formatNaira } from "../../utils/format";

export default function SubscriptionStep({ isLoading }: { isLoading: boolean }) {
  const { register, watch, setValue, getValues, formState: { errors } } = useFormContext<CreateSchoolInput>();
  const plan = watch("plan");
  const startDate = watch("startDate");
  const prevPlan = useRef(plan);

  // Picking a plan pre-fills its limits. The ref stops this overwriting edits when you return to this step.
  useEffect(() => {
    if (plan === prevPlan.current) return;
    prevPlan.current = plan;
    if (isSchoolPlan(plan)) {
      setValue("maxStudents", PLAN_DEFAULTS[plan].students, { shouldDirty: true });
      setValue("maxTeachers", PLAN_DEFAULTS[plan].teachers, { shouldDirty: true });
    }
  }, [plan, setValue]);

  // Suggest a renewal date: 14 days for a trial, otherwise a year.
  useEffect(() => {
    if (startDate && !getValues("renewalDate")) {
      setValue("renewalDate", addDays(startDate, getValues("trialMode") ? 14 : 365));
    }
  }, [startDate, getValues, setValue]);

  const info = isSchoolPlan(plan) ? PLAN_DEFAULTS[plan] : null;

  return (
    <div className="space-y-5">
      <FormSelect label="Subscription Plan *" options={PLAN_SELECT_OPTIONS} placeholder="Select plan" error={errors.plan?.message} {...register("plan")} />

      <div>
        <span className="mb-1.5 block text-sm font-medium text-label">Trial Mode</span>
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" className="peer sr-only" {...register("trialMode")} />
          <span className="relative h-6 w-11 rounded-full bg-sa-gray-line transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-brand-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary/40" />
          <span className="text-sm text-text-secondary">Activate immediately</span>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput label="Start Date *" type="date" error={errors.startDate?.message} isLoading={isLoading} {...register("startDate")} />
        <FormInput label="Renewal Date *" type="date" error={errors.renewalDate?.message} isLoading={isLoading} {...register("renewalDate")} />
        <FormInput label="Maximum Students" type="number" inputMode="numeric" min={1} error={errors.maxStudents?.message} isLoading={isLoading} {...register("maxStudents")} />
        <FormInput label="Maximum Teachers" type="number" inputMode="numeric" min={1} error={errors.maxTeachers?.message} isLoading={isLoading} {...register("maxTeachers")} />
      </div>

      {info && (
        <motion.div
          key={plan}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-sa-blue-line bg-sa-blue-soft p-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sa-blue-text">{plan} plan summary</p>
          <p className="mt-1 text-sm text-text-primary">
            {formatNaira(info.price)}/yr · Up to {info.students} students, {info.teachers} teachers, {info.storageGb} GB storage
          </p>
        </motion.div>
      )}
    </div>
  );
}