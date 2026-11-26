export type ModuleId =
  | "schools" | "users" | "subscriptions" | "payments"
  | "analytics" | "support" | "settings" | "audit";

export type Permission = "view" | "create" | "edit" | "delete" | "approve" | "export" | "manage";

export type PermissionMap = Record<ModuleId, Permission[]>;

export interface Role {
  id: string;
  name: string;
  description: string;
  system: boolean; // system roles are read-only
  active: boolean;
  users: number;
  createdBy: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  permissions: PermissionMap;
}