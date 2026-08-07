import { parentNavItems } from "./parentNav";
import { teacherNavItems } from "./teacherNav";
import { studentNavItems } from "./studentNav";
import type { RoleConfig } from "@/shared/types/navigation";

export const roleConfigs: RoleConfig[] = [
  { role: "parent", rootRoute: "parent-dashboard", navItems: parentNavItems, userLabel: "Parent" },
  { role: "teacher", rootRoute: "teacher-dashboard", navItems: teacherNavItems, userLabel: "Teacher" },
  { role: "student", rootRoute: "student-dashboard", navItems: studentNavItems, userLabel: "Student" },
];

// Sorted longest-first so "teacher-dashboard" doesn't get matched by a shorter prefix accidentally
export const getRoleConfigFromPath = (pathname: string): RoleConfig | undefined => {
  return roleConfigs.find((cfg) => pathname.startsWith(`/${cfg.rootRoute}`));
};