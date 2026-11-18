import {
  LayoutDashboard, Building2, Users, CreditCard, Banknote,
  LineChart, Headphones, FileText, Settings, ClipboardList,
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
  // TODO: add children once the dropdown designs for these are available
  { label: "Payments", icon: Banknote, to: SA_PATHS.payments, chevron: true },
  { label: "Analytics", icon: LineChart, to: SA_PATHS.analytics, chevron: true },
  { label: "Support", icon: Headphones, to: SA_PATHS.support, chevron: true },
  { label: "Content Management", icon: FileText, to: SA_PATHS.content, chevron: true },
  { label: "Settings", icon: Settings, to: SA_PATHS.settings, chevron: true },
  { label: "Audit Logs", icon: ClipboardList, to: SA_PATHS.auditLogs, chevron: true },
];

const schoolsMeta: SaPageMeta = { title: "Schools", subtitle: "Manage registered schools." };

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
};

export const getSaPageMeta = (pathname: string): SaPageMeta => {
  if (pageMeta[pathname]) return pageMeta[pathname];
  // school detail pages (/super-admin/schools/:id)
  if (pathname.startsWith(`${SA_PATHS.schools}/`)) return schoolsMeta;
  return { title: "Platform Console", subtitle: "Schoolzy" };
};