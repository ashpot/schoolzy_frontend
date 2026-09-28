import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import { paymentSchema, type PaymentValues } from "../../schemas";
import { useCreatePayment, useFeesList } from "../../hooks/useFinances";
import { formatNaira } from "../../utils/feeUtils";
import type { Payment, PaymentPayload } from "../../types";
import StudentSearchInput from "./StudentSearchInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";
import { z } from "zod";

interface PaymentsFormProps {
  onSuccess: (payment: Payment) => void;
}

export default function PaymentsForm({ onSuccess }: PaymentsFormProps) {
  const mutation = useCreatePayment();
  const { data: fees } = useFeesList();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.input<typeof paymentSchema>, any, PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { studentId: "", feeId: "", description: "", amount: undefined },
  });

  const feeId = watch("feeId");
  const selectedFee = (fees ?? []).find((f) => f.id === feeId);

  const onSubmit = (values: PaymentValues) => {
    const payload: PaymentPayload = {
      student: Number(values.studentId),
      fee: Number(values.feeId),
      description: values.description,
      amount: values.amount,
    };

    mutation.mutate(payload, {
      onSuccess: (response) => {
        onSuccess({
          id: String(response.id),
          studentId: String(response.student),
          studentName: "", // not returned by this endpoint — page-level list will need re-fetch or lookup to show it
          admissionNo: "",
          feeId: String(response.fee),
          feeName: response.fee_name,
          description: response.description,
          receiptNumber: response.receipt_number,
          receivedByLabel: "", // resolved separately via useUsersLookup at render time
          receivedDate: response.date_paid,
          amount: Number(response.amount),
          balance: Number(response.balance),
        });
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={DollarSign} title="Add Payment" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">
        <Controller
          name="studentId"
          control={control}
          render={({ field }) => (
            <StudentSearchInput
              value={field.value}
              onChange={(id) => { field.onChange(id); setValue("feeId", ""); }}
              error={errors.studentId?.message}
              isLoading={mutation.isPending}
            />
          )}
        />

        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Fee *</label>
          <Controller
            name="feeId"
            control={control}
            render={({ field }) => (
              <div className={`relative flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-bg-input transition-all
                ${errors.feeId ? "border-danger" : "border-border-line02 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20"}
                ${mutation.isPending ? "opacity-50 pointer-events-none" : ""}`}
              >
                <select
                  value={field.value}
                  onChange={field.onChange}
                  disabled={mutation.isPending}
                  className="flex-1 bg-transparent text-sm text-text-primary outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select fee</option>
                  {(fees ?? []).map((f) => (
                    <option key={f.id} value={f.id}>{f.name} — {f.termName}</option>
                  ))}
                </select>
              </div>
            )}
          />
          {selectedFee && (
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                {selectedFee.termName}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                Fee total: {formatNaira(selectedFee.amount)}
              </span>
            </div>
          )}
          {errors.feeId && <p className="mt-1 text-xs text-danger">{errors.feeId.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Description *</label>
          <textarea
            rows={2}
            placeholder="e.g. Part payment for tuition fee"
            disabled={mutation.isPending}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-bg-input text-text-primary placeholder:text-text-muted resize-none transition-all outline-none
              focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20
              ${errors.description ? "border-danger" : "border-border-line02"}`}
            {...register("description")}
          />
          {errors.description && <p className="mt-1 text-xs text-danger">{errors.description.message}</p>}
        </div>

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
                    ${errors.amount ? "border-danger" : "border-border-line02"}`}
                />
              </div>
            )}
          />
          {errors.amount && <p className="mt-1 text-xs text-danger">{errors.amount.message}</p>}
        </div>

        <SubmitButton label="Add Payment" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}