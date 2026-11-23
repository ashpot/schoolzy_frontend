import { SA_ROUTES } from "@/super-admin-auth";

export const SA_PATHS = {
  dashboard: SA_ROUTES.dashboard,
  schools: "/super-admin/schools",
  schoolDetail: (id: string) => `/super-admin/schools/${id}`,
  pendingSchools: "/super-admin/schools/pending",
  suspendedSchools: "/super-admin/schools/suspended",
  students: "/super-admin/users/students",
  parents: "/super-admin/users/parents",
  teachers: "/super-admin/users/teachers",
  schoolAdmins: "/super-admin/users/school-admins",
  subscriptions: "/super-admin/subscriptions", // Plans page
  newSubscriptionPlan: "/super-admin/subscriptions?create=1",
  activeSubscriptions: "/super-admin/subscriptions/active",
  renewals: "/super-admin/subscriptions/renewals",
  payments: "/super-admin/payments", // Transactions page
  invoices: "/super-admin/payments/invoices",
  analytics: "/super-admin/analytics", // Platform Analytics page
  analyticsRevenue: "/super-admin/analytics/revenue",
  analyticsGrowth: "/super-admin/analytics/school-growth",
  support: "/super-admin/support", // Tickets page
  ticketDetail: (id: string) => `/super-admin/support/tickets/${id}`,
  messages: "/super-admin/support/messages",
  settings: "/super-admin/settings", // Platform Settings page
  settingsGateways: "/super-admin/settings/gateways",
  settingsComms: "/super-admin/settings/email-sms",
  settingsRoles: "/super-admin/settings/roles",
  auditLogs: "/super-admin/audit-logs",
} as const;