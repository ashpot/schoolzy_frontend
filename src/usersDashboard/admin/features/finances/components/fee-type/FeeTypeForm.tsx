import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { feeTypeSchema, type FeeTypeValues } from "../../schemas";
import { useCreateFeeType } from "../../hooks/useFinances";
import type { FeeType } from "../../types";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";

interface FeeTypeFormProps {
  onSuccess: (newItem: FeeType) => void;
}

export default function FeeTypeForm({ onSuccess }: FeeTypeFormProps) {
  const mutation = useCreateFeeType();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FeeTypeValues>({
    resolver: zodResolver(feeTypeSchema),
    defaultValues: { name: "", description: "" },
  });

  const descLen = (watch("description") ?? "").length;

  const onSubmit = (values: FeeTypeValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        const newItem: FeeType = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          createdAt: new Date().toISOString().split("T")[0],
        };
        onSuccess(newItem);
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={Plus} title="Add Fee Type" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">
        <FormInput
          label="Name"
          placeholder="e.g. Tuition Fee"
          error={errors.name?.message}
          isLoading={mutation.isPending}
          {...register("name")}
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-label">Description *</label>
            <span className="text-xs text-text-muted">{200 - descLen} left</span>
          </div>
          <textarea
            rows={4}
            maxLength={200}
            placeholder="Briefly describe what this fee type covers…"
            disabled={mutation.isPending}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-bg-input text-text-primary placeholder:text-text-muted resize-none transition-all outline-none
              focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20
              ${errors.description ? "border-danger" : "border-border-line02"}
              ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-danger">{errors.description.message}</p>
          )}
        </div>

        <SubmitButton label="Create Fee Type" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}