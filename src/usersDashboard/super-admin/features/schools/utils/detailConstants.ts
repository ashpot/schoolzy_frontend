import type { DetailTab, UserRole, UserStatus } from "../types/detail";

export const DETAIL_TABS: { id: DetailTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "academics", label: "Academics" },
  { id: "finance", label: "Finance" },
  { id: "subscription", label: "Subscription" },
  { id: "activity", label: "Activity Logs" },
];

// Tabs whose backend endpoints exist. Add a tab id here once its endpoint ships
// (and swap its hook in useSchoolDetail.ts from the mock to the real call).
export const LIVE_TABS: ReadonlySet<DetailTab> = new Set<DetailTab>(["overview"]);

export const parseTab = (v: string | null): DetailTab =>
  DETAIL_TABS.some((t) => t.id === v) ? (v as DetailTab) : "overview";

export const ROLE_FILTERS: ("All" | UserRole)[] = ["All", "Student", "Teacher", "Parent", "Admin"];
export const USER_STATUS_FILTERS: ("All" | UserStatus)[] = ["All", "Active", "Inactive"];