import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import { cn } from "@/shared/utils/cn";
import { replySchema, type ReplyValues } from "../../schemas";
import { useReply } from "../../hooks/useSupport";
import type { Ticket } from "../../types";

interface ReplyBoxProps {
  ticket: Ticket;
  onResolve: () => void;
  onClose: () => void;
  isResolving: boolean;
}

export default function ReplyBox({ ticket, onResolve, onClose, isResolving }: ReplyBoxProps) {
  const mutation = useReply();
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<ReplyValues>({
    resolver: zodResolver(replySchema),
    defaultValues: { text: "", kind: "reply" },
  });
  const kind = watch("kind");
  const closed = ticket.status === "Closed";

  const onSubmit = (v: ReplyValues) => {
    mutation.mutate({ id: ticket.id, ...v }, { onSuccess: () => reset({ text: "", kind: v.kind }) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-3xl border border-border-line02 bg-white p-6">
      <div role="tablist" aria-label="Message type" className="flex gap-2">
        {(["reply", "note"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={kind === k}
            onClick={() => setValue("kind", k)}
            className={cn("rounded-xl px-5 py-2.5 text-sm font-medium transition-colors", kind === k ? "bg-brand-primary text-white" : "bg-bg-input text-text-secondary hover:text-text-primary")}
          >
            {k === "reply" ? "Reply" : "Internal Note"}
          </button>
        ))}
      </div>

      <textarea
        rows={4}
        disabled={closed || mutation.isPending}
        placeholder={closed ? "This ticket is closed." : kind === "reply" ? "Type your reply..." : "Write an internal note (not visible to the school)..."}
        aria-label={kind === "reply" ? "Reply" : "Internal note"}
        aria-invalid={Boolean(errors.text)}
        className="mt-4 w-full resize-none rounded-xl border border-border-line02 bg-bg-input px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60"
        {...register("text")}
      />
      {errors.text && <p role="alert" className="mt-1 text-xs text-danger">{errors.text.message}</p>}
      {mutation.isError && <p role="alert" className="mt-2 text-xs text-danger">{mutation.error.message}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="w-44"><SubmitButton label={kind === "reply" ? "Send Reply" : "Add Note"} isLoading={mutation.isPending} /></div>
        {/* TODO: enable once an upload endpoint exists */}
        <button type="button" disabled title="Attachments coming soon" aria-label="Attach file" className="flex-center h-11 w-11 rounded-xl border border-border-line02 text-text-muted opacity-60">
          <Paperclip size={16} />
        </button>
        <div className="ml-auto flex gap-3">
          <button
            type="button"
            onClick={onResolve}
            disabled={isResolving || ticket.status === "Resolved" || closed}
            className="rounded-xl bg-sa-green-soft px-5 py-2.5 text-sm font-medium text-sa-green-text transition-[filter] hover:brightness-95 disabled:opacity-50"
          >
            {isResolving ? "Resolving..." : "Resolve Ticket"}
          </button>
          <Button type="button" variant="outline" onClick={onClose} disabled={closed}>Close Ticket</Button>
        </div>
      </div>
    </form>
  );
}