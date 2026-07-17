import { useEffect } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";
import { z } from "zod";
import { payFeeSchema, type PayFeeValues } from "../../schemas";
import { childOptions, feeOptionsByChild } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { usePayFee } from "../../hooks/useFees";

type PayFeeFormInput = z.input<typeof payFeeSchema>;

export default function PayFeeForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<PayFeeFormInput, any, PayFeeValues>({
    resolver: zodResolver(payFeeSchema),
    defaultValues: { childId: "", feeId: "", amount: "" as unknown as number },
  });

  const mutation = usePayFee();
  const childId = watch("childId");
  const feeId = watch("feeId");
  const feeOptions = feeOptionsByChild[childId] ?? [];

  useEffect(() => {
    const selected = feeOptions.find((f) => f.id === feeId);
    setValue("amount", selected ? selected.amount : ("" as unknown as number));
  }, [feeId]);

  const onSubmit: SubmitHandler<PayFeeValues> = (values) => {
    mutation.mutate(values, { onSuccess: () => reset() });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-bg-input flex-center">
          <CreditCard size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Pay Fee</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Select Child"
            error={errors.childId?.message}
            isLoading={mutation.isPending}
            options={childOptions}
            placeholder="Choose a child"
            {...register("childId")}
          />
          <Controller
            control={control}
            name="feeId"
            render={({ field }) => (
              <FormSelect
                label="Select Fee"
                error={errors.feeId?.message}
                isLoading={mutation.isPending || !childId}
                options={feeOptions.map((f) => ({ value: f.id, label: f.label }))}
                placeholder={childId ? "Choose a fee" : "Select a child first"}
                {...field}
              />
            )}
          />
        </div>

        <FormInput
          label="Amount"
          type="number"
          readOnly
          placeholder="Amount will be auto-filled"
          error={errors.amount?.message}
          isLoading={mutation.isPending}
          {...register("amount")}
        />

        <SubmitButton label="Pay Fee" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}