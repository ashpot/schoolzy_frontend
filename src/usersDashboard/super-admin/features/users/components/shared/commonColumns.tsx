import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { ColumnDef } from "../../types";
import { formatDateTime, statusTone } from "../../utils/userFormat";

// Last Login and Status columns are identical on all four pages.
export const lastLoginColumn: ColumnDef = {
  key: "lastLogin",
  header: "Last Login",
  render: (u) => <span className="text-sm text-text-secondary">{formatDateTime(u.lastLogin)}</span>,
};

export const statusColumn: ColumnDef = {
  key: "status",
  header: "Status",
  render: (u) => <StatusBadge label={u.status} tone={statusTone[u.status]} />,
};