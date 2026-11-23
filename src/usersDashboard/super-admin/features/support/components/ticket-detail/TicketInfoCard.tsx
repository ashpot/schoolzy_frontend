import type { ReactNode } from "react";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { AGENTS } from "../../utils/constants";
import type { Ticket } from "../../types";
import { PriorityBadge, statusTone } from "../../utils/tones";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="text-right font-medium text-text-primary">{children}</dd>
    </div>
  );
}

interface TicketInfoCardProps {
  ticket: Ticket;
  onAssign: (agent: string | null) => void;
  assigning: boolean;
}

export default function TicketInfoCard({ ticket, onAssign, assigning }: TicketInfoCardProps) {
  return (
    <section className="rounded-3xl border border-border-line02 bg-white p-6" aria-labelledby="sa-ticket-info">
      <h2 id="sa-ticket-info" className="font-jakarta text-lg font-semibold text-text-primary">Ticket Information</h2>
      <dl className="mt-3">
        <Row label="Category">{ticket.category}</Row>
        <Row label="Priority"><PriorityBadge priority={ticket.priority} /></Row>
        <Row label="Status"><StatusBadge label={ticket.status} tone={statusTone[ticket.status]} /></Row>
        <Row label="School">{ticket.school}</Row>
        <Row label="Platform">{ticket.platform}</Row>
        <Row label="Browser">{ticket.browser}</Row>
        <Row label="OS">{ticket.os}</Row>
      </dl>
      <div className="mt-4 border-t border-border-line02 pt-4">
        <label htmlFor="sa-ticket-agent" className="text-sm text-text-secondary">Assigned Agent</label>
        <select
          id="sa-ticket-agent"
          value={ticket.agent ?? ""}
          disabled={assigning}
          onChange={(e) => onAssign(e.target.value || null)}
          className="select-field mt-2 w-full"
        >
          <option value="">Unassigned</option>
          {AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
    </section>
  );
}