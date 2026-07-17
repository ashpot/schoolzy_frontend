import type { NavItem } from "@/shared/types/navigation";
import { sidebarNavItems } from "../data/sidebarNav";
import { teacherNavItems } from "@/usersDashboard/teacher/data/teacherNavItems";
import { parentNavItems } from "@/usersDashboard/parent/data/parentNavItems";
import { studentNavItems } from "@/usersDashboard/student/data/studentNavItems";

export type DashboardRole = "admin" | "parent" | "teacher" | "student";

interface RoleConfig {
  role: DashboardRole;
  rootSegment: string;
  navItems: NavItem[];
}

const ROLE_CONFIGS: RoleConfig[] = [
  { role: "admin", rootSegment: "admin-dashboard", navItems: sidebarNavItems },
  { role: "parent", rootSegment: "parent-dashboard", navItems: parentNavItems },
  { role: "teacher", rootSegment: "teacher-dashboard", navItems: teacherNavItems },
  { role: "student", rootSegment: "student-dashboard", navItems: studentNavItems },
];

export function resolveDashboardRole(pathname: string): RoleConfig {
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const match = ROLE_CONFIGS.find((c) => c.rootSegment === segment);
  return match ?? ROLE_CONFIGS[0]; // fallback to admin, adjust if you'd rather throw/redirect
}