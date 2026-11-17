import { Check, Lock, User, UserPlus } from "lucide-react";
import type { UsersPageConfig } from "../../types";
import { countStatus, recentCount } from "../../utils/userFormat";
import { lastLoginColumn, statusColumn } from "../shared/commonColumns";
import { TwoLine, UserCell } from "../shared/UserCell";

export const teachersConfig: UsersPageConfig = {
  kind: "teacher",
  noun: "teachers",
  searchPlaceholder: "Search teachers...",
  pageSize: 6,
  minTableWidth: "min-w-[1080px]",
  canEmail: false,
  canInvite: false,
  filters: [
    { key: "school", label: "School", get: (u) => u.school },
    { key: "subject", label: "Subjects", get: (u) => u.subject ?? null },
    { key: "status", label: "Status", get: (u) => u.status },
  ],
  columns: [
    { key: "name", header: "Name", render: (u) => <UserCell name={u.name} sub={u.email} /> },
    { key: "school", header: "School", render: (u) => <TwoLine title={u.school} sub={u.location} /> },
    { key: "subject", header: "Subject", render: (u) => <span className="text-sm font-medium text-text-primary">{u.subject ?? "—"}</span> },
    { key: "classes", header: "Classes", render: (u) => <span className="text-sm text-text-secondary">{u.classes?.join(", ") || "—"}</span> },
    lastLoginColumn,
    statusColumn,
  ],
  stats: (users) => [
    { key: "total", icon: User, tone: "blue", label: "Total Teachers", value: users.length },
    { key: "active", icon: Check, tone: "green", label: "Currently Active", value: countStatus(users, "Active"), hint: "Active accounts" },
    { key: "new", icon: UserPlus, tone: "amber", label: "New Teachers This Month", value: recentCount(users, 30), hint: "Last 30 days" },
    { key: "locked", icon: Lock, tone: "red", label: "Locked Accounts", value: countStatus(users, "Locked"), hint: "Require attention" },
  ],
};