import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { makeRenewSchema, type RenewValues } from "../../schemas/detail";
import { useRenewSubscription } from "../../hooks/useSchoolDetail";
import { addDays, formatDate } from "../../utils/format";
import type { School } from "../../types";
import ModalShell from "../all-schools/ModalShell";

interface RenewSubscriptionModalProps {
  school: School;
  onClose: () => void;
}

export default function RenewSubscriptionModal({ school, onClose }: RenewSubscriptionModalProps) {
  const titleId = useId();
  const base = school.renewalDate ?? new Date().toISOString().slice(0, 10);
  // With no current renewal date, any date is accepted
  const schema = useMemo(() => makeRenewSchema(school.renewalDate ?? ""), [school.renewalDate]);

  const { register, handleSubmit, formState: { errors } } = useForm<RenewValues>({
    resolver: zodResolver(schema),
    defaultValues: { renewalDate: addDays(base, 365) },
  });

  const mutation = useRenewSubscription();

  const onSubmit = (values: RenewValues) => {
    mutation.mutate({ id: school.id, renewalDate: values.renewalDate }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-green-soft text-sa-green-icon">
          <RotateCcw size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">Renew subscription</h2>
        <p className="mt-2 text-sm text-text-secondary">
          <strong className="text-text-primary">{school.name}</strong>{" "}
          {school.renewalDate
            ? <>currently renews on {formatDate(school.renewalDate)}.</>
            : <>has no renewal date set.</>}{" "}
          Choose the new renewal date.
        </p>

        <div className="mt-5">
          <FormInput
            label="New Renewal Date *"
            type="date"
            error={errors.renewalDate?.message}
            isLoading={mutation.isPending}
            {...register("renewalDate")}
          />
        </div>

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
            {mutation.error.message}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton label="Renew" isLoading={mutation.isPending} />
        </div>
      </form>
    </ModalShell>
  );
}