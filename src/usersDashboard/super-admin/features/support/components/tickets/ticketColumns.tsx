import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { Col } from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubTable";
import { formatDate } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { Ticket } from "../../types";
import { PriorityBadge, statusTone } from "../../utils/tones";

export const ticketColumns: Col<Ticket>[] = [
  { key: "code", header: "Ticket ID", render: (t) => <span className="text-sm font-semibold text-text-primary">{t.code}</span> },
  { key: "subject", header: "Subject", render: (t) => <span className="block max-w-[220px] truncate text-sm text-text-primary">{t.subject}</span> },
  {
    key: "school",
    header: "School",
    render: (t) => (
      <div>
        <p className="text-sm font-semibold text-text-primary">{t.school}</p>
        <p className="text-xs text-text-muted">{t.location}</p>
      </div>
    ),
  },
  { key: "by", header: "Submitted By", render: (t) => <span className="text-sm text-text-primary">{t.submittedBy}</span> },
  { key: "category", header: "Category", render: (t) => <span className="text-sm text-text-primary">{t.category}</span> },
  { key: "priority", header: "Priority", render: (t) => <PriorityBadge priority={t.priority} /> },
  { key: "agent", header: "Assigned To", render: (t) => <span className={t.agent ? "text-sm text-text-primary" : "text-sm text-text-muted"}>{t.agent ?? "Unassigned"}</span> },
  { key: "created", header: "Created", render: (t) => <span className="text-sm text-text-secondary">{formatDate(t.createdAt)}</span> },
  { key: "status", header: "Status", render: (t) => <StatusBadge label={t.status} tone={statusTone[t.status]} /> },
];