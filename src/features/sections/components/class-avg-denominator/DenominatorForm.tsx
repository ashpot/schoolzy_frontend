import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Hash } from "lucide-react";
import { denominatorSchema, type DenominatorValues } from "../../schemas";
import { classSelectOptions } from "../../data/mockData";
import { useAddDenominator } from "../../hooks/useSections";
import type { Denominator } from "../../types";
import FormSelect   from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import Button from "@/shared/ui/Button";

interface Props { onSuccess: (d: Denominator) => void; }

const QUICK_VALUES = [50, 100, 200, 300];

export default function DenominatorForm({ onSuccess }: Props) {
  const addDenominator = useAddDenominator();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<DenominatorValues>({
    resolver: zodResolver(denominatorSchema),
    defaultValues: { denominator: "" as unknown as number, classValue: "" },
  });

  const onSubmit = (values: DenominatorValues) => {
    addDenominator.mutate(values, {
      onSuccess: () => { onSuccess({ id: Date.now().toString(), denominator: values.denominator, className: values.classValue }); reset(); },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <Plus size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Add Class Average Denominator</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-label">Denominator *</label>
            <span className="text-xs text-text-muted">Whole number, max 1000</span>
          </div>
          <div className="relative">
            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="number" min={1} max={1000} placeholder="e.g. 100" disabled={addDenominator.isPending}
              className="w-full pl-8 pr-12 py-2.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              {...register("denominator")} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium">pts</span>
          </div>
          {errors.denominator && <p className="mt-1 text-xs text-danger">{errors.denominator.message}</p>}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-text-muted">Quick:</span>
            {QUICK_VALUES.map((v) => (
              <button key={v} type="button" onClick={() => setValue("denominator", v)}
                className="px-3 py-1 text-xs font-medium rounded-lg border border-border-line02 bg-bg-input hover:border-brand-primary hover:text-brand-primary transition-all">
                {v}
              </button>
            ))}
          </div>
        </div>

        <FormSelect label="Target Class *" error={errors.classValue?.message} isLoading={addDenominator.isPending}
          options={classSelectOptions} placeholder="Select class" {...register("classValue")} />

        <Button
          leftIcon={<Plus size={19} />}
          size="lg" type="submit"
          isLoading={addDenominator.isPending}
          className="w-full font-medium rounded-xl"
        >
          Add Average Class Denominator
        </Button>
      </form>
    </div>
  );
}