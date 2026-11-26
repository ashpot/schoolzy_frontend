import type { AuditAction, AuditCategory, AuditStatus } from "../types";

export const PAGE_SIZE = 10;

export const CATEGORIES: AuditCategory[] = [
  "Authentication", "Schools", "Users", "Subscriptions", "Payments", "Support", "Settings", "Security", "System",
];

export const ACTIONS: AuditAction[] = [
  "Login", "Logout", "Create", "Update", "Delete", "Approve", "Suspend",
  "Permission Changed", "Payment Processed", "Renew Subscription", "Export",
];

export const STATUSES: AuditStatus[] = ["Success", "Failed", "Critical"];