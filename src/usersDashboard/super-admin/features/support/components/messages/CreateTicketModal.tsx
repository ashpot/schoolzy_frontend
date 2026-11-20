import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Headphones } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { createTicketSchema, type CreateTicketValues } from "../../schemas";
import { useCreateTicket } from "../../hooks/useSupport";
import type { Conversation } from "../../types";
import { CATEGORIES, PRIORITIES, toOptions } from "../../utils/constants";

export default function CreateTicketModal({ conversation: c, onClose }: { conversation: Conversation; onClose: () => void }) {
  const titleId = useId();
  const mutation = useCreateTicket();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTicketValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: { subject: "", category: "Technical", priority: "Medium" },
  });

  const onSubmit = (v: CreateTicketValues) => {
    mutation.mutate({ ...v, conversationId: c.id, school: c.school, location: c.location, submittedBy: c.contact }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-blue-soft text-sa-blue-icon"><Headphones size={24} aria-hidden /></span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">Create ticket</h2>
        <p className="mt-2 text-sm text-text-secondary">For <strong className="text-text-primary">{c.school}</strong> ({c.contact}).</p>

        <div className="mt-5 space-y-5">
          <FormInput label="Subject *" placeholder="e.g. Attendance module error" autoComplete="off" error={errors.subject?.message} isLoading={mutation.isPending} {...register("subject")} />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormSelect label="Category" options={toOptions(CATEGORIES)} error={errors.category?.message} {...register("category")} />
            <FormSelect label="Priority" options={toOptions(PRIORITIES)} error={errors.priority?.message} {...register("priority")} />
          </div>
        </div>

        {mutation.isError && <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{mutation.error.message}</p>}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton label="Create Ticket" isLoading={mutation.isPending} />
        </div>
      </form>
    </ModalShell>
  );
}