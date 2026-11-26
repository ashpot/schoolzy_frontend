import type { ModuleId, Permission } from "../types";

export const MODULES: { id: ModuleId; label: string; permissions: Permission[] }[] = [
  { id: "schools", label: "Schools", permissions: ["view", "create", "edit", "delete", "approve", "export"] },
  { id: "users", label: "Users", permissions: ["view", "create", "edit", "delete", "export", "manage"] },
  { id: "subscriptions", label: "Subscriptions", permissions: ["view", "create", "edit", "delete", "approve", "manage"] },
  { id: "payments", label: "Payments", permissions: ["view", "export", "manage"] },
  { id: "analytics", label: "Analytics", permissions: ["view", "export"] },
  { id: "support", label: "Support", permissions: ["view", "create", "edit", "manage"] },
  { id: "settings", label: "Settings", permissions: ["view", "edit", "manage"] },
  { id: "audit", label: "Audit Logs", permissions: ["view", "export"] },
];

export const PERMISSION_LABELS: Record<Permission, string> = {
  view: "View", create: "Create", edit: "Edit", delete: "Delete",
  approve: "Approve", export: "Export", manage: "Manage",
};