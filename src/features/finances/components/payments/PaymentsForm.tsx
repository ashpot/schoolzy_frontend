import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import { paymentSchema, type PaymentValues } from "../../schemas";
import { useCreatePayment } from "../../hooks/useFinances";
import { mockAssignedFees, mockStudents } from "../../data/mockData";
import { formatNaira } from "../../utils/feeUtils";
import type { Payment } from "../../types";
import StudentSearchInput from "./StudentSearchInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";
import FeeTypeBadge from "../shared/FeeTypeBadge";

interface PaymentsFormProps {
  onSuccess: (payment: Payment) => void;
}

const STAFF = ["Mrs. Okafor", "Mr. Adebayo", "Miss Lawal", "Mr. Nwosu", "Mr. Chukwu"];

export default function PaymentsForm({ onSuccess }: PaymentsFormProps) {
  const mutation = useCreatePayment();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { studentId: "", feeId: "", amount: "" as unknown as number },
  });

  const studentId = watch("studentId");
  const feeId     = watch("feeId");

  const student = mockStudents.find((s) => s.id === studentId);

  // Only show fees assigned to student's section
  const availableFees = student
    ? mockAssignedFees.filter((af) => af.sectionId === student.sectionId)
    : [];

  const selectedAssignedFee = availableFees.find((af) => af.feeId === feeId);

  const onSubmit = (values: PaymentValues) => {
    if (!student || !selectedAssignedFee) return;
    const staffName = STAFF[Math.floor(Math.random() * STAFF.length)];

    mutation.mutate(values, {
      onSuccess: () => {
        const newPayment: Payment = {
          id: Date.now().toString(),
          studentId: student.id,
          studentName: student.name,
          admissionNo: student.admissionNo,
          studentClass: student.class,
          sectionLabel: student.sectionLabel,
          feeId: selectedAssignedFee.feeId,
          feeName: selectedAssignedFee.feeName,
          feeTypeName: selectedAssignedFee.feeTypeName,
          feeTypeIndex: selectedAssignedFee.feeTypeIndex,
          term: "First Term",
          receivedBy: staffName,
          receivedDate: new Date().toISOString().split("T")[0],
          amount: values.amount,
          totalFeeAmount: selectedAssignedFee.amount,
        };
        onSuccess(newPayment);
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={DollarSign} title="Add Payment" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">

        {/* Student search — Controller */}
        <Controller
          name="studentId"
          control={control}
          render={({ field }) => (
            <StudentSearchInput
              value={field.value}
              onChange={(id) => { field.onChange(id); setValue("feeId", ""); setValue("amount", "" as unknown as number); }}
              error={errors.studentId?.message}
              isLoading={mutation.isPending}
            />
          )}
        />

        {/* Fee select — native, filtered by section */}
        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Fee *</label>
          <Controller
            name="feeId"
            control={control}
            render={({ field }) => (
              <div className={`relative flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-bg-input transition-all
                ${errors.feeId ? "border-danger" : "border-border-line02 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20"}
                ${!student || mutation.isPending ? "opacity-50 pointer-events-none" : ""}`}
              >
                <select
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    const af = availableFees.find((f) => f.feeId === e.target.value);
                    if (af) setValue("amount", af.amount);
                  }}
                  disabled={!student || mutation.isPending}
                  className="flex-1 bg-transparent text-sm text-text-primary outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select fee</option>
                  {availableFees.map((af) => (
                    <option key={af.id} value={af.feeId}>{af.feeName}</option>
                  ))}
                </select>
              </div>
            )}
          />
          {/* Fee detail pills shown after selection */}
          {selectedAssignedFee && (
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <FeeTypeBadge name={selectedAssignedFee.feeTypeName} index={selectedAssignedFee.feeTypeIndex} size="sm" />
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                First Term
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                Total: {formatNaira(selectedAssignedFee.amount)}
              </span>
            </div>
          )}
          {errors.feeId && <p className="mt-1 text-xs text-danger">{errors.feeId.message}</p>}
        </div>

        {/* Amount — ₦ prefix */}
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
                  value={field.value === "" || field.value === undefined ? "" : field.value}
                  onChange={(e) => field.onChange(e.target.value === "" ? ("" as unknown as number) : Number(e.target.value))}
                  className={`w-full pl-7 pr-3 py-2.5 rounded-xl border text-sm bg-bg-input text-text-primary placeholder:text-text-muted outline-none transition-all
                    focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20
                    ${errors.amount ? "border-danger" : "border-border-line02"}
                    ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
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