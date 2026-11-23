import { useEffect, useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { useSchools } from "@/usersDashboard/super-admin/features/schools/hooks/useSchools";
import { usePlans } from "@/usersDashboard/super-admin/features/subscriptions/hooks/useSubscriptions";
import { formatNaira, isoFromOffset, todayIso } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { invoiceSchema, type InvoiceValues } from "../../schemas";
import { useCreateInvoice } from "../../hooks/usePayments";

export default function GenerateInvoiceModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const { data: schoolData } = useSchools();
  const { data: plans } = usePlans();
  const mutation = useCreateInvoice();

  const schoolOptions = useMemo(
    () => (schoolData?.schools ?? []).filter((s) => s.status === "Active" || s.status === "Trial").map((s) => ({ value: s.name, label: s.name })),
    [schoolData]
  );
  const planOptions = useMemo(
    () => (plans ?? []).filter((p) => p.active).map((p) => ({ value: p.name, label: `${p.name} · ${formatNaira(p.yearlyPrice)}/yr` })),
    [plans]
  );

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<InvoiceValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { school: "", plan: "", amount: "", invoiceDate: todayIso(), dueDate: isoFromOffset(14) },
  });

  // Picking a plan pre-fills its yearly price (editable)
  const plan = watch("plan");
  useEffect(() => {
    const p = plans?.find((x) => x.name === plan);
    if (p) setValue("amount", String(p.yearlyPrice));
  }, [plan, plans, setValue]);

  const onSubmit = (values: InvoiceValues) => {
    mutation.mutate(values, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-lg" closeOnBackdrop={false}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-blue-soft text-sa-blue-icon">
          <FileText size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">Generate invoice</h2>
        <p className="mt-1 text-sm text-text-secondary">Amounts include 7% VAT.</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormSelect label="School *" options={schoolOptions} placeholder="Select school" error={errors.school?.message} {...register("school")} />
          </div>
          <FormSelect label="Plan *" options={planOptions} placeholder="Select plan" error={errors.plan?.message} {...register("plan")} />
          <FormInput label="Amount (₦) *" inputMode="numeric" placeholder="e.g. 150000" autoComplete="off" error={errors.amount?.message} isLoading={mutation.isPending} {...register("amount")} />
          <FormInput label="Invoice Date *" type="date" error={errors.invoiceDate?.message} isLoading={mutation.isPending} {...register("invoiceDate")} />
          <FormInput label="Due Date *" type="date" error={errors.dueDate?.message} isLoading={mutation.isPending} {...register("dueDate")} />
        </div>

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{mutation.error.message}</p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton label="Generate Invoice" isLoading={mutation.isPending} />
        </div>
      </form>
    </ModalShell>
  );
}