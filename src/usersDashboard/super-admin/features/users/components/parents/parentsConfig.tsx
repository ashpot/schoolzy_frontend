import { Check, Lock, User, UserPlus } from "lucide-react";
import type { UsersPageConfig } from "../../types";
import { countStatus, recentCount } from "../../utils/userFormat";
import { lastLoginColumn, statusColumn } from "../shared/commonColumns";
import { TwoLine, UserCell } from "../shared/UserCell";

export const parentsConfig: UsersPageConfig = {
  kind: "parent",
  noun: "parents",
  searchPlaceholder: "Search parents...",
  pageSize: 6,
  minTableWidth: "min-w-[1020px]",
  canEmail: false,
  canInvite: false,
  filters: [
    { key: "school", label: "School", get: (u) => u.school },
    { key: "status", label: "Status", get: (u) => u.status },
  ],
  columns: [
    { key: "name", header: "Name", render: (u) => <UserCell name={u.name} sub={u.location} /> },
    { key: "school", header: "School", render: (u) => <span className="text-sm font-medium text-text-primary">{u.school}</span> },
    {
      key: "children",
      header: "Children",
      render: (u) => (
        <span className="text-sm font-medium text-text-primary">
          {u.children == null ? "—" : `${u.children} ${u.children === 1 ? "Child" : "Children"}`}
        </span>
      ),
    },
    { key: "contact", header: "Contact", render: (u) => <TwoLine title={u.email} sub={u.phone} /> },
    lastLoginColumn,
    statusColumn,
  ],
  stats: (users) => [
    { key: "total", icon: User, tone: "blue", label: "Total Parents", value: users.length },
    { key: "active", icon: Check, tone: "green", label: "Active Parents", value: countStatus(users, "Active"), hint: "Currently active" },
    { key: "recent", icon: UserPlus, tone: "amber", label: "Recently Registered", value: recentCount(users, 30), hint: "Last 30 days" },
    { key: "locked", icon: Lock, tone: "red", label: "Locked Accounts", value: countStatus(users, "Locked"), hint: "Require attention" },
  ],
};