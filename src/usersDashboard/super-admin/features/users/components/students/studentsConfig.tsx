import { Check, GraduationCap, User, UserPlus } from "lucide-react";
import type { UsersPageConfig } from "../../types";
import { countStatus, recentCount } from "../../utils/userFormat";
import { lastLoginColumn, statusColumn } from "../shared/commonColumns";
import { TwoLine, UserCell } from "../shared/UserCell";

export const studentsConfig: UsersPageConfig = {
  kind: "student",
  noun: "students",
  searchPlaceholder: "Search students...",
  pageSize: 10,
  minTableWidth: "min-w-[1060px]",
  canEmail: false,
  canInvite: false,
  filters: [
    { key: "school", label: "School", get: (u) => u.school },
    { key: "class", label: "Classes", get: (u) => u.className ?? null },
    { key: "status", label: "Status", get: (u) => u.status },
  ],
  columns: [
    { key: "name", header: "Student Name", render: (u) => <UserCell name={u.name} sub={u.admissionNo} /> },
    { key: "school", header: "School", render: (u) => <TwoLine title={u.school} sub={u.location} /> },
    { key: "class", header: "Class", render: (u) => <span className="text-sm font-medium text-text-primary">{u.className ?? "—"}</span> },
    { key: "parent", header: "Parent", render: (u) => <span className="text-sm text-text-secondary">{u.parentName ?? "—"}</span> },
    lastLoginColumn,
    statusColumn,
  ],
  stats: (users) => [
    { key: "total", icon: User, tone: "blue", label: "Total Students", value: users.length },
    { key: "active", icon: Check, tone: "green", label: "Currently Active", value: countStatus(users, "Active"), hint: "Active accounts" },
    { key: "new", icon: UserPlus, tone: "amber", label: "New Admissions", value: recentCount(users, 30), hint: "Last 30 days" },
    // TODO: use the backend's graduating count; for now this counts final-year (SS 3) students
    { key: "grad", icon: GraduationCap, tone: "purple", label: "Graduating Students", value: users.filter((u) => u.className === "SS 3").length, hint: "Final year" },
  ],
};