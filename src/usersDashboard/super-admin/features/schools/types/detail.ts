import type { ConfirmAction, School } from "./index";

export type DetailTab = "overview" | "users" | "academics" | "finance" | "subscription" | "activity";
export type DetailDialog = "renew" | ConfirmAction;

// Everything beyond the list fields has no endpoint yet, so it is nullable and shows "—".
export interface SchoolDetail extends School {
  address: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  principal: string | null;
  adminEmail: string | null;
  adminPhone: string | null;
  adminUsername: string | null;
  parents: number | null;
  classes: number | null;
  subjects: number | null;
  storageUsedGb: number | null;
  storageLimitGb: number | null;
  studentLimit: number | null;
  teacherLimit: number | null;
  startedOn: string | null;
}

/* Users tab */
export type UserRole = "Student" | "Teacher" | "Parent" | "Admin";
export type UserStatus = "Active" | "Inactive";

export interface SchoolUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  status: UserStatus;
  lastLogin: string;
}

export interface SchoolUsersData {
  counts: { students: number; teachers: number; parents: number; admins: number };
  users: SchoolUser[];
}

/* Academics tab */
export interface MonthPoint {
  label: string;
  value: number;
}

export interface SchoolAcademics {
  subjects: number;
  classes: number;
  resultsUploaded: number;
  attendanceRate: number;
  lessonNotes: number;
  resultsByMonth: MonthPoint[];
  attendanceTrend: MonthPoint[];
  topTeachers: { id: string; name: string; subject: string; count: number }[];
}

/* Finance tab */
export type PaymentStatus = "Paid" | "Pending";

export interface FinancePayment {
  id: string;
  student: string;
  amount: number;
  type: string;
  date: string;
  status: PaymentStatus;
}

export interface FinanceExpense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: PaymentStatus;
}

export interface SchoolFinance {
  feesCollected: number;
  feesChangePct: number;
  outstandingFees: number;
  outstandingStudents: number;
  totalExpenses: number;
  expensesChangePct: number;
  transactions: number;
  transactionsThisMonth: number;
  payments: FinancePayment[];
  expenses: FinanceExpense[];
}

/* Subscription tab */
export interface UsageEntry {
  used: number;
  limit: number;
}

export interface SchoolSubscription {
  plan: string;
  billingCycle: string;
  renewalDate: string;
  nextInvoice: number;
  usage: { students: UsageEntry; teachers: UsageEntry; storage: UsageEntry };
  timeline: { id: string; label: string; date: string; done: boolean }[];
  planSummary: { price: number; students: number; teachers: number; storageGb: number };
}

/* Activity tab */
export type ActivityCategory =
  | "Results" | "Subscription" | "Attendance" | "Users" | "Settings" | "Finance" | "Academic" | "Admin";

export interface SchoolActivityItem {
  id: string;
  title: string;
  by: string;
  category: ActivityCategory;
  at: string; // ISO datetime
}