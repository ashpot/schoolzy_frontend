import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import type { Ticket } from "../../types";
import { formatDay } from "../../utils/format";
import { PriorityBadge, statusTone } from "../../utils/tones";

export default function TicketHeader({ ticket }: { ticket: Ticket }) {
  return (
    <header>
      <div className="flex flex-wrap items-center gap-3">
        <Link to={SA_PATHS.support} className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-primary">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Back
        </Link>
        <span className="text-sm font-semibold text-brand-primary">{ticket.code}</span>
        <PriorityBadge priority={ticket.priority} />
        <StatusBadge label={ticket.status} tone={statusTone[ticket.status]} />
      </div>
      <h1 className="mt-4 font-jakarta text-2xl font-semibold text-text-primary">{ticket.subject}</h1>
      <p className="mt-2 text-sm text-text-secondary">
        {ticket.school} · {ticket.location}
        <span className="ml-4">Submitted by <strong className="font-semibold text-text-primary">{ticket.submittedBy}</strong></span>
        <span className="ml-4">Created <strong className="font-semibold text-text-primary">{formatDay(ticket.createdAt)}</strong></span>
      </p>
    </header>
  );
}