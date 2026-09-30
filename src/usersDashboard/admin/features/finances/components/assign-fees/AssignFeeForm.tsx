import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { assignFeeSchema, type AssignFeeValues } from "../../schemas";
import { useAssignFee, useSectionsList } from "../../hooks/useFinances";
import { formatNaira } from "../../utils/feeUtils";
import type { AssignedFee, Fee, AssignFeePayload } from "../../types";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";

interface AssignFeeFormProps {
  fees: Fee[];
  onSuccess: (item: AssignedFee) => void;
}

export default function AssignFeeForm({ fees, onSuccess }: AssignFeeFormProps) {
  const mutation = useAssignFee();
  const { data: sections, isLoading: sectionsLoading } = useSectionsList();

  const feeOptions = fees.map((f) => ({
    value: f.id,
    label: `${f.name} — ${formatNaira(f.amount)}`,
  }));
  const sectionOptions = (sections ?? []).map((s) => ({
    value: String(s.id),
    label: s.title,
  }));

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AssignFeeValues>({
    resolver: zodResolver(assignFeeSchema),
    defaultValues: { feeId: "", sectionId: "" },
  });

  const onSubmit = (values: AssignFeeValues) => {
    const payload: AssignFeePayload = {
      fee: Number(values.feeId),
      section: Number(values.sectionId),
    };

    mutation.mutate(payload, {
      onSuccess: (response) => {
        onSuccess({
          id: String(response.id),
          feeId: String(response.fee),
          feeName: response.fee_name,
          sectionId: String(response.section),
          sectionLabel: response.section_name,
        });
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
          placeholder={sectionsLoading ? "Loading sections..." : "Select section"}
          options={sectionOptions}
          isLoading={sectionsLoading}
          error={errors.sectionId?.message}
          {...register("sectionId")}
        />
        <SubmitButton label="Assign Fee" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}