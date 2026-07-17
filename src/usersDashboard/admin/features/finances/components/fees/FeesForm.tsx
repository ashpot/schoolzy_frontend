import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { feeSchema, type FeeValues } from "../../schemas";
import { useCreateFee } from "../../hooks/useFinances";
import { termOptions, QUICK_AMOUNTS } from "../../data/mockData";
import type { Fee } from "../../types";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";
import  { z } from "zod";

interface FeesFormProps {
  onSuccess: (newFee: Fee) => void;
  feeTypes: { id: string; name: string }[];
}

export default function FeesForm({ onSuccess, feeTypes }: FeesFormProps) {
  const mutation = useCreateFee();
  const feeTypeOptions = feeTypes.map((ft) => ({ value: ft.id, label: ft.name }));

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<z.input<typeof feeSchema>, any, FeeValues>({
    resolver: zodResolver(feeSchema),
    defaultValues: {
      name: "",
      feeTypeId: "",
      term: "",
      amount: undefined,
      dateDue: "",
    },
  });

  const amountVal = watch("amount");

  const onSubmit = (values: FeeValues) => {
    const feeTypeName = feeTypes.find((ft) => ft.id === values.feeTypeId)?.name ?? "";
    mutation.mutate(values, {
      onSuccess: () => {
        const newFee: Fee = {
          id: Date.now().toString(),
          name: values.name,
          feeTypeId: values.feeTypeId,
          feeTypeName,
          term: values.term as Fee["term"],
          amount: values.amount,
          dateDue: values.dateDue,
        };
        onSuccess(newFee);
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={Plus} title="Add Fee" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">
        <FormInput
          label="Name"
          placeholder="e.g. First Term Tuition"
          error={errors.name?.message}
          isLoading={mutation.isPending}
          {...register("name")}
        />

        <FormSelect
          label="Fee Type"
          placeholder="Select fee type"
          options={feeTypeOptions}
          error={errors.feeTypeId?.message}
          {...register("feeTypeId")}
        />

        <FormSelect
          label="Term"
          placeholder="Select term"
          options={termOptions}
          error={errors.term?.message}
          {...register("term")}
        />

        {/* Amount — custom ₦ prefix + quick buttons */}
        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Amount *</label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted">₦</span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  disabled={mutation.isPending}
                  value={typeof field.value === "number" ? field.value : ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? ("" as unknown as number) : Number(e.target.value))}
                  className={`w-full pl-7 pr-3 py-2.5 rounded-xl border text-sm bg-bg-input text-text-primary placeholder:text-text-muted outline-none transition-all
                    focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20
                    ${errors.amount ? "border-danger" : "border-border-line02"}
                    ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
            )}
          />
          {errors.amount && (
            <p className="mt-1 text-xs text-danger">{errors.amount.message}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs text-text-muted">Quick:</span>
            {QUICK_AMOUNTS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setValue("amount", v)}
                className={`px-2.5 py-1 text-xs rounded-lg border transition-all
                  ${Number(amountVal) === v
                    ? "border-brand-primary text-brand-primary bg-blue-50"
                    : "border-border-line02 bg-bg-input text-text-muted hover:border-brand-primary hover:text-brand-primary"
                  }`}
              >
                ₦{v >= 1000 ? `${v / 1000}k` : v}
              </button>
            ))}
          </div>
        </div>

        <FormInput
          label="Date Due"
          type="date"
          error={errors.dateDue?.message}
          isLoading={mutation.isPending}
          {...register("dateDue")}
        />

        <SubmitButton label="Create Fee" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}