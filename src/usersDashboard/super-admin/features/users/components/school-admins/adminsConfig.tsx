import { Check, Lock, User, UserPlus } from "lucide-react";
import type { UsersPageConfig } from "../../types";
import { countStatus, recentCount } from "../../utils/userFormat";
import { lastLoginColumn, statusColumn } from "../shared/commonColumns";
import { UserCell } from "../shared/UserCell";

export const adminsConfig: UsersPageConfig = {
  kind: "admin",
  noun: "school admins",
  searchPlaceholder: "Search by name, school or email...",
  pageSize: 6,
  minTableWidth: "min-w-[1020px]",
  canEmail: true,
  canInvite: true,
  filters: [
    { key: "school", label: "School", get: (u) => u.school },
    { key: "location", label: "Location", get: (u) => u.location },
    { key: "status", label: "Status", get: (u) => u.status },
  ],
  columns: [
    {
      key: "name",
      header: "Name",
      render: (u) => <UserCell name={u.name} sub={`${u.location ?? "—"} · ${u.plan ?? "No plan"}`} />,
    },
    { key: "school", header: "School", render: (u) => <span className="text-sm text-text-primary">{u.school}</span> },
    { key: "email", header: "Email", render: (u) => <span className="text-sm text-text-secondary">{u.email}</span> },
    { key: "phone", header: "Phone", render: (u) => <span className="text-sm text-text-primary">{u.phone ?? "—"}</span> },
    lastLoginColumn,
    statusColumn,
  ],
  stats: (users) => [
    { key: "total", icon: User, tone: "blue", label: "Total School Admins", value: users.length },
    { key: "active", icon: Check, tone: "green", label: "Active Admins", value: countStatus(users, "Active"), hint: "Currently active" },
    { key: "locked", icon: Lock, tone: "red", label: "Locked Accounts", value: countStatus(users, "Locked"), hint: "Require attention" },
    { key: "recent", icon: UserPlus, tone: "amber", label: "Recently Added", value: recentCount(users, 30), hint: "Last 30 days" },
  ],
};