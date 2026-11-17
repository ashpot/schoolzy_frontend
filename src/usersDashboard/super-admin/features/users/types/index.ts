import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";

export type UserKind = "admin" | "teacher" | "parent" | "student";
export type UserStatus = "Active" | "Inactive" | "Locked";
export type UserAction = "view" | "login" | "reset" | "deactivate" | "activate" | "email";
export type ConfirmUserAction = Extract<UserAction, "login" | "reset" | "deactivate" | "activate">;

export interface PlatformUser {
  id: string;
  kind: UserKind;
  name: string;
  email: string;
  phone: string | null;
  school: string;
  location: string | null;
  status: UserStatus;
  lastLogin: string | null; // ISO datetime, null = never
  createdAt: string; // ISO datetime
  // kind-specific (all optional)
  plan?: string | null; // admin
  subject?: string | null; // teacher
  classes?: string[]; // teacher
  children?: number; // parent
  className?: string | null; // student
  parentName?: string | null; // student
  admissionNo?: string | null; // student
}

export interface UserStat {
  key: string;
  icon: LucideIcon;
  tone: Tone;
  label: string;
  value: number;
  hint?: string;
}

export interface FilterDef {
  key: string;
  label: string;
  get: (u: PlatformUser) => string | null;
}

export interface ColumnDef {
  key: string;
  header: string;
  render: (u: PlatformUser) => ReactNode;
}

export interface UsersPageConfig {
  kind: UserKind;
  noun: string; // "teachers"
  searchPlaceholder: string;
  filters: FilterDef[];
  columns: ColumnDef[];
  stats: (users: PlatformUser[]) => UserStat[];
  pageSize: number;
  minTableWidth: string; // tailwind class, e.g. "min-w-[1000px]"
  canEmail: boolean; // only School Admins can be emailed
  canInvite: boolean; // only the School Admins page has the invite button
}