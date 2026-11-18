import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { RenewalRow } from "../../types";
import { daysLabel, formatDate, formatNaira } from "../../utils/format";
import { planTone, renewalTone } from "../../utils/tones";
import SchoolCell from "../shared/SchoolCell";
import type { Col } from "../shared/SubTable";

const daysColor = (r: RenewalRow) =>
  r.days < 0 ? "text-sa-red-text" : r.days <= 7 ? "text-sa-amber-text" : "text-text-secondary";

export const renewalColumns: Col<RenewalRow>[] = [
  { key: "school", header: "School", render: (r) => <SchoolCell name={r.school} location={r.location} /> },
  { key: "plan", header: "Current Plan", render: (r) => <StatusBadge label={r.plan} tone={planTone(r.plan)} /> },
  { key: "date", header: "Renewal Date", render: (r) => <span className="text-sm text-text-secondary">{formatDate(r.expires)}</span> },
  { key: "days", header: "Days Remaining", render: (r) => <span className={cn("text-sm font-medium", daysColor(r))}>{daysLabel(r.days)}</span> },
  { key: "amount", header: "Amount Due", render: (r) => <span className="text-sm font-semibold text-text-primary">{formatNaira(r.amount)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge label={r.renewalStatus} tone={renewalTone[r.renewalStatus]} /> },
];