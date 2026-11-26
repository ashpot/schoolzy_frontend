import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { Col } from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubTable";
import { initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import type { AuditLog } from "../types";
import { stamp } from "../utils/format";
import { actionIcon, categoryTone, statusTone } from "../utils/tones";

export const auditColumns: Col<AuditLog>[] = [
  { key: "at", header: "Timestamp", render: (l) => <span className="whitespace-nowrap font-mono text-xs text-text-secondary">{stamp(l.at)}</span> },
  {
    key: "user",
    header: "User",
    render: (l) => {
      const unknown = l.user === "Unknown";
      return (
        <div className="flex items-center gap-3">
          <span className={cn("flex-center h-9 w-9 shrink-0 rounded-lg text-xs font-semibold", unknown ? toneIconTile.red : schoolTileClass(l.user))}>
            {unknown ? "??" : initials2(l.user)}
          </span>
          <span className="text-sm font-semibold text-text-primary">{l.user}</span>
        </div>
      );
    },
  },
  { key: "role", header: "Role", render: (l) => <span className="text-sm text-text-secondary">{l.role}</span> },
  { key: "school", header: "School", render: (l) => <span className="text-sm text-text-primary">{l.school ?? "—"}</span> },
  { key: "category", header: "Category", render: (l) => <StatusBadge label={l.category} tone={categoryTone[l.category]} /> },
  {
    key: "action",
    header: "Action",
    render: (l) => {
      const Icon = actionIcon[l.action];
      return <span className="flex items-center gap-2 whitespace-nowrap text-sm text-text-primary"><Icon size={15} className="text-sa-blue-icon" aria-hidden /> {l.action}</span>;
    },
  },
  { key: "ip", header: "IP Address", render: (l) => <span className="font-mono text-xs text-text-muted">{l.ip}</span> },
  { key: "status", header: "Status", render: (l) => <StatusBadge label={l.status} tone={statusTone[l.status]} /> },
];