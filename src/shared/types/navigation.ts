// import { type FC } from "react";

// export interface NavItem {
//   id: string;
//   label: string;
//   path?: string;
//   icon: FC<{ className?: string }>;
//   children?: NavItem[];
// }

// export interface UserProfile {
//   name: string;
//   role: string;
//   avatar: string;
// }

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.FC<{ className?: string }>;
  children?: NavItem[];
}

export type DashboardRole = "parent" | "teacher" | "student";

export interface RoleConfig {
  role: DashboardRole;
  rootRoute: string;
  navItems: NavItem[];
  userLabel: string; // "Parent" | "Teacher" | "Student"
}