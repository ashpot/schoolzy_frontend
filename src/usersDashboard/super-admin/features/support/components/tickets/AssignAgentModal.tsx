import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { assignSchema, type AssignValues } from "../../schemas";
import { useAssignAgent } from "../../hooks/useSupport";
import type { Ticket } from "../../types";
import { AGENTS, toOptions } from "../../utils/constants";

const OPTIONS = [{ value: "", label: "Unassigned" }, ...toOptions(AGENTS)];

export default function AssignAgentModal({ ticket, onClose }: { ticket: Ticket; onClose: () => void }) {
  const titleId = useId();
  const mutation = useAssignAgent();
  const { register, handleSubmit } = useForm<AssignValues>({
    resolver: zodResolver(assignSchema),
    defaultValues: { agent: ticket.agent ?? "" },
  });

  const onSubmit = (v: AssignValues) => {
    mutation.mutate({ id: ticket.id, agent: v.agent || null }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-blue-soft text-sa-blue-icon"><User size={24} aria-hidden /></span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">Assign agent</h2>
        <p className="mt-2 text-sm text-text-secondary">Choose who handles <strong className="text-text-primary">{ticket.code}</strong>.</p>
        <div className="mt-5"><FormSelect label="Agent" options={OPTIONS} {...register("agent")} /></div>

        {mutation.isError && <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{mutation.error.message}</p>}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton label="Save" isLoading={mutation.isPending} />
        </div>
      </form>
    </ModalShell>
  );
}