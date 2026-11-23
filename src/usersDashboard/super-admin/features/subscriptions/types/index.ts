import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";

export type SupportLevel = "Basic" | "Priority" | "Dedicated";
export type BillingCycle = "Monthly" | "Annual";
export type SubStatus = "Active" | "Trial" | "Expired" | "Suspended";
export type RenewalStatus = "Overdue" | "Due Today" | "Due in 7 Days" | "Upcoming";

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxStudents: number;
  maxTeachers: number;
  storageGb: number;
  support: SupportLevel;
  features: string[];
  recommended: boolean;
  active: boolean;
  schools: number;
}

export interface Subscription {
  id: string;
  school: string;
  location: string;
  plan: string;
  billing: BillingCycle;
  started: string; // yyyy-mm-dd
  expires: string; // yyyy-mm-dd (also the renewal date)
  amount: number;
  autoRenew: boolean;
  status: SubStatus;
  invoiceGeneratedAt: string | null;
}

export interface RenewalRow extends Subscription {
  days: number; // negative = overdue
  renewalStatus: RenewalStatus;
}

export interface UsageEntry {
  used: number;
  limit: number;
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  label: string;
  status: "Paid" | "Pending";
}

export interface SubscriptionDetail {
  usage: { students: UsageEntry; teachers: UsageEntry; storage: UsageEntry };
  payments: PaymentRecord[];
}

export type SubAction = "renew" | "invoice" | "reminder" | "suspend";
export type MenuKey = "view" | "upgrade" | "downgrade" | SubAction;
export type PlanAction = "recommend" | "unrecommend" | "activate" | "deactivate" | "delete";
export type PlanMenuKey = "edit" | PlanAction;

export interface SubStat {
  key: string;
  icon: LucideIcon;
  tone: Tone;
  label: string;
  value: number | string; // numbers count up, strings render as-is
  hint?: string;
}

export interface FilterOption {
  key: string;
  label: string;
  options: string[];
}