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
  newSubscriptionPlan: "/super-admin/subscriptions?create=1", // Plans page with the create modal open
  activeSubscriptions: "/super-admin/subscriptions/active",
  renewals: "/super-admin/subscriptions/renewals",
  payments: "/super-admin/payments",
  analytics: "/super-admin/analytics",
  support: "/super-admin/support",
  content: "/super-admin/content",
  announcements: "/super-admin/content/announcements",
  settings: "/super-admin/settings",
  auditLogs: "/super-admin/audit-logs",
} as const;