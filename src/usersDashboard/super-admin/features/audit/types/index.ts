import type { MetricDelta } from "@/usersDashboard/super-admin/shared/components/MetricCard";

export type AuditStatus = "Success" | "Failed" | "Critical";

export type AuditCategory =
  | "Settings" | "Authentication" | "Schools" | "Security" | "Payments"
  | "Subscriptions" | "Support" | "System" | "Users";

export type AuditAction =
  | "Login" | "Logout" | "Create" | "Update" | "Delete" | "Approve" | "Suspend"
  | "Permission Changed" | "Payment Processed" | "Renew Subscription" | "Export";

export interface AuditChange {
  label: string;
  before: string;
  after: string;
}

export interface AuditLog {
  id: string;
  code: string; // log001
  at: string; // ISO
  user: string;
  role: string;
  school: string | null;
  category: AuditCategory;
  action: AuditAction;
  status: AuditStatus;
  ip: string;
  summary: string; // one-line text for the timeline
  description: string;
  change?: AuditChange;
  browser: string;
  os: string;
  device: string;
  location: string;
  sessionId: string;
  resource?: { name: string; sub: string };
}

export interface Insight {
  id: string;
  tone: "red" | "amber" | "purple";
  title: string;
  text: string;
  at: string; // ISO
}

export interface AuditData {
  logs: AuditLog[];
  insights: Insight[];
  // TODO: the backend should provide these deltas
  deltas: { events: MetricDelta; failed: MetricDelta; logins: MetricDelta; critical: MetricDelta };
}