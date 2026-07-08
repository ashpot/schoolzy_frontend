import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import { loadHistorySchema, type LoadHistoryValues } from "../../schemas";
import { childOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import { useLoadPaymentHistory } from "../../hooks/useFees";
import type { PaymentHistoryRecord } from "../../types";

export default function PaymentHistoryFilterForm({ onLoaded }: { onLoaded: (records: PaymentHistoryRecord[]) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoadHistoryValues>({
    resolver: zodResolver(loadHistorySchema),
    defaultValues: { childId: "" },
  });

  const mutation = useLoadPaymentHistory();

  const onSubmit = (values: LoadHistoryValues) => {
    mutation.mutate(values, { onSuccess: (data) => onLoaded(data) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-bg-input flex-center">
          <Wallet size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Check Child Payment History</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-1">
          <FormSelect
            label="Select Child"
            error={errors.childId?.message}
            isLoading={mutation.isPending}
            options={childOptions}
            placeholder="Choose a child"
            {...register("childId")}
          />
        </div>
        <SubmitButton label="Load Payment History" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}