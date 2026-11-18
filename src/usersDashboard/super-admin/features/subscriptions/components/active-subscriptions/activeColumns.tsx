import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { Subscription } from "../../types";
import { formatDate, formatNaira } from "../../utils/format";
import { planTone, subStatusTone } from "../../utils/tones";
import SchoolCell from "../shared/SchoolCell";
import type { Col } from "../shared/SubTable";

export const activeColumns: Col<Subscription>[] = [
  { key: "school", header: "School", render: (s) => <SchoolCell name={s.school} location={s.location} /> },
  { key: "plan", header: "Plan", render: (s) => <StatusBadge label={s.plan} tone={planTone(s.plan)} /> },
  { key: "billing", header: "Billing", render: (s) => <span className="text-sm font-medium text-text-primary">{s.billing}</span> },
  { key: "started", header: "Started", render: (s) => <span className="text-sm text-text-secondary">{formatDate(s.started)}</span> },
  { key: "expires", header: "Expires", render: (s) => <span className="text-sm text-text-secondary">{formatDate(s.expires)}</span> },
  { key: "amount", header: "Amount", render: (s) => <span className="text-sm font-semibold text-text-primary">{formatNaira(s.amount)}</span> },
  {
    key: "auto",
    header: "Auto Renewal",
    render: (s) => (
      <span className={cn("flex items-center gap-2 text-sm font-medium", s.autoRenew ? "text-sa-green-text" : "text-text-muted")}>
        <span className={cn("h-2 w-2 rounded-full", s.autoRenew ? "bg-sa-green-icon" : "bg-sa-gray-icon")} aria-hidden />
        {s.autoRenew ? "On" : "Off"}
      </span>
    ),
  },
  { key: "status", header: "Status", render: (s) => <StatusBadge label={s.status} tone={subStatusTone[s.status]} /> },
];