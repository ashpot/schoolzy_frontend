import {
  LayoutDashboard, Building2, Users, CreditCard, Banknote,
  LineChart, Headphones, Settings, ClipboardList,
} from "lucide-react";
import type { SaNavItem, SaPageMeta } from "../types/navigation";
import { SA_PATHS } from "./saPaths";

export const SA_APP_VERSION = "v2.1.0";

export const saNav: SaNavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, to: SA_PATHS.dashboard },
  {
    label: "Schools", icon: Building2, to: SA_PATHS.schools,
    children: [
      { label: "All Schools", to: SA_PATHS.schools },
      { label: "Pending Schools", to: SA_PATHS.pendingSchools },
      { label: "Suspended Schools", to: SA_PATHS.suspendedSchools },
    ],
  },
  {
    label: "Users", icon: Users, to: SA_PATHS.schoolAdmins,
    children: [
      { label: "School Admin", to: SA_PATHS.schoolAdmins },
      { label: "Teacher", to: SA_PATHS.teachers },
      { label: "Parents", to: SA_PATHS.parents },
      { label: "Students", to: SA_PATHS.students },
    ],
  },
  {
    label: "Subscriptions", icon: CreditCard, to: SA_PATHS.subscriptions,
    children: [
      { label: "Plans", to: SA_PATHS.subscriptions },
      { label: "Active Subscriptions", to: SA_PATHS.activeSubscriptions },
      { label: "Renewal", to: SA_PATHS.renewals },
    ],
  },
  {
    label: "Payments", icon: Banknote, to: SA_PATHS.payments,
    children: [
      { label: "Transactions", to: SA_PATHS.payments },
      { label: "Invoices", to: SA_PATHS.invoices },
    ],
  },
  {
    label: "Analytics", icon: LineChart, to: SA_PATHS.analytics,
    children: [
      { label: "Platform Analytics", to: SA_PATHS.analytics },
      { label: "Revenue", to: SA_PATHS.analyticsRevenue },
      { label: "School Growth", to: SA_PATHS.analyticsGrowth },
    ],
  },
  {
    label: "Support", icon: Headphones, to: SA_PATHS.support,
    children: [
      { label: "Tickets", to: SA_PATHS.support },
      { label: "Messages", to: SA_PATHS.messages },
    ],
  },
  {
    label: "Settings", icon: Settings, to: SA_PATHS.settings,
    children: [
      { label: "Platform Settings", to: SA_PATHS.settings },
      { label: "Payment Gateways", to: SA_PATHS.settingsGateways },
      { label: "Email & SMS", to: SA_PATHS.settingsComms },
      { label: "Roles & Permission", to: SA_PATHS.settingsRoles },
    ],
  },
  { label: "Audit Logs", icon: ClipboardList, to: SA_PATHS.auditLogs },
];

const schoolsMeta: SaPageMeta = { title: "Schools", subtitle: "Manage registered schools." };
const ticketsMeta: SaPageMeta = { title: "Tickets", subtitle: "Monitor and resolve support requests submitted by schools." };

// Header title/subtitle per route. Add one line per new page as it gets built.
const pageMeta: Record<string, SaPageMeta> = {
  [SA_PATHS.dashboard]: { title: "Dashboard", subtitle: "Platform Overview" },
  [SA_PATHS.schools]: schoolsMeta,
  [SA_PATHS.pendingSchools]: { title: "Pending Schools", subtitle: "Review schools awaiting approval." },
  [SA_PATHS.suspendedSchools]: { title: "Suspended Schools", subtitle: "Manage schools that have been temporarily disabled." },
  [SA_PATHS.schoolAdmins]: { title: "School Administrators", subtitle: "Manage administrators across all schools." },
  [SA_PATHS.teachers]: { title: "Teachers", subtitle: "View and monitor teachers across every school." },
  [SA_PATHS.parents]: { title: "Parents", subtitle: "Manage parent accounts across the platform." },
  [SA_PATHS.students]: { title: "Students", subtitle: "View students across all registered schools." },
  [SA_PATHS.subscriptions]: { title: "Plans", subtitle: "Create and manage pricing plans available to schools." },
  [SA_PATHS.activeSubscriptions]: { title: "Active Subscriptions", subtitle: "Monitor every school's current subscription." },
  [SA_PATHS.renewals]: { title: "Renewals", subtitle: "Track upcoming and overdue subscription renewals." },
  [SA_PATHS.payments]: { title: "Transactions", subtitle: "Monitor every payment processed across the Schoolzy platform." },
  [SA_PATHS.invoices]: { title: "Invoices", subtitle: "Create, manage and track invoices issued to schools." },
  [SA_PATHS.analytics]: { title: "Platform Analytics", subtitle: "Monitor overall platform usage and operational health." },
  [SA_PATHS.analyticsRevenue]: { title: "Revenue", subtitle: "Track revenue performance across subscriptions and payments." },
  [SA_PATHS.analyticsGrowth]: { title: "School Growth", subtitle: "Understand customer acquisition and platform adoption." },
  [SA_PATHS.support]: ticketsMeta,
  [SA_PATHS.messages]: { title: "Messages", subtitle: "Communicate directly with school administrators." },
  [SA_PATHS.settings]: { title: "Platform Settings", subtitle: "Configure global platform preferences and operational settings." },
  [SA_PATHS.settingsGateways]: { title: "Payment Gateways", subtitle: "Configure payment providers used across Schoolzy." },
  [SA_PATHS.settingsComms]: { title: "Email & SMS", subtitle: "Configure communication services for the platform." },
  [SA_PATHS.settingsRoles]: { title: "Roles & Permissions", subtitle: "Manage platform access levels for Schoolzy staff." },
  [SA_PATHS.auditLogs]: { title: "Audit Logs", subtitle: "Track system activities and administrative actions across the platform." },
};

export const getSaPageMeta = (pathname: string): SaPageMeta => {
  if (pageMeta[pathname]) return pageMeta[pathname];
  // school detail pages (/super-admin/schools/:id)
  if (pathname.startsWith(`${SA_PATHS.schools}/`)) return schoolsMeta;
  // ticket detail pages (/super-admin/support/tickets/:id)
  if (pathname.startsWith(`${SA_PATHS.support}/tickets/`)) return ticketsMeta;
  return { title: "Platform Console", subtitle: "Schoolzy" };
};