import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { assignFeeSchema, type AssignFeeValues } from "../../schemas";
import { useAssignFee } from "../../hooks/useFinances";
import { sectionOptions } from "../../data/mockData";
import { formatNaira } from "../../utils/feeUtils";
import type { AssignedFee, Fee } from "../../types";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";

interface AssignFeeFormProps {
  fees: Fee[];
  onSuccess: (item: AssignedFee) => void;
}

export default function AssignFeeForm({ fees, onSuccess }: AssignFeeFormProps) {
  const mutation = useAssignFee();

  const feeOptions = fees.map((f) => ({
    value: f.id,
    label: `${f.name} — ${formatNaira(f.amount)}`,
  }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignFeeValues>({
    resolver: zodResolver(assignFeeSchema),
    defaultValues: { feeId: "", sectionId: "" },
  });

  const onSubmit = (values: AssignFeeValues) => {
    const fee = fees.find((f) => f.id === values.feeId);
    const section = sectionOptions.find((s) => s.value === values.sectionId);
    if (!fee || !section) return;

    mutation.mutate(values, {
      onSuccess: () => {
        const newItem: AssignedFee = {
          id: Date.now().toString(),
          feeId: fee.id,
          feeName: fee.name,
          feeTypeName: fee.feeTypeName,
          feeTypeIndex: fees.findIndex((f) => f.feeTypeId === fee.feeTypeId),
          amount: fee.amount,
          sectionId: section.value,
          sectionLabel: section.label,
        };
        onSuccess(newItem);
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={Plus} title="Add Assigned Fee" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">
        <FormSelect
          label="Fee"
          placeholder="Select fee"
          options={feeOptions}
          error={errors.feeId?.message}
          {...register("feeId")}
        />
        <FormSelect
          label="Section"
          placeholder="Select section"
          options={sectionOptions}
          error={errors.sectionId?.message}
          {...register("sectionId")}
        />
        <SubmitButton label="Assign Fee" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}