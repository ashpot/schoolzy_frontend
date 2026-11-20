import { AnimatePresence } from "framer-motion";
import { CheckCircle2, Trash2 } from "lucide-react";
import ConfirmModal from "@/usersDashboard/super-admin/features/payments/components/shared/ConfirmModal";
import { useTicketAction } from "../../hooks/useSupport";
import type { Ticket } from "../../types";
import AssignAgentModal from "./AssignAgentModal";

export interface TicketTarget {
  key: "assign" | "close" | "delete";
  ticket: Ticket;
}

interface Props {
  target: TicketTarget | null;
  onClose: () => void;
  onDeleted?: () => void;
}

function TicketConfirm({ target, onClose, onDeleted }: { target: TicketTarget; onClose: () => void; onDeleted?: () => void }) {
  const mutation = useTicketAction();
  const { key, ticket } = target;
  const isDelete = key === "delete";

  return (
    <ConfirmModal
      title={isDelete ? "Delete ticket?" : "Close ticket?"}
      body={
        isDelete ? (
          <><strong>{ticket.code}</strong> and its conversation will be permanently removed.</>
        ) : (
          <><strong>{ticket.code}</strong> will be closed. {ticket.school} will no longer be able to reply.</>
        )
      }
      icon={isDelete ? Trash2 : CheckCircle2}
      tone={isDelete ? "red" : "green"}
      confirmLabel={isDelete ? "Delete Ticket" : "Close Ticket"}
      destructive={isDelete}
      isPending={mutation.isPending}
      error={mutation.isError ? mutation.error.message : null}
      onConfirm={() =>
        mutation.mutate({ id: ticket.id, action: isDelete ? "delete" : "close" }, { onSuccess: () => { onClose(); if (isDelete) onDeleted?.(); } })
      }
      onClose={onClose}
    />
  );
}

export default function TicketDialogs({ target, onClose, onDeleted }: Props) {
  return (
    <AnimatePresence>
      {target &&
        (target.key === "assign" ? (
          <AssignAgentModal key={`assign-${target.ticket.id}`} ticket={target.ticket} onClose={onClose} />
        ) : (
          <TicketConfirm key={`${target.key}-${target.ticket.id}`} target={target} onClose={onClose} onDeleted={onDeleted} />
        ))}
    </AnimatePresence>
  );
}