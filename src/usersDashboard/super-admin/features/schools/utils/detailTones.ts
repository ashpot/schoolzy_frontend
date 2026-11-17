import {
  BookOpen, CheckCircle2, CreditCard, DollarSign, FileText, Settings, ShieldCheck, Users,
  type LucideIcon,
} from "lucide-react";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { ActivityCategory, PaymentStatus, UserRole, UserStatus } from "../types/detail";

export const roleTone: Record<UserRole, Tone> = {
  Student: "blue",
  Teacher: "purple",
  Parent: "green",
  Admin: "amber",
};

export const userStatusTone: Record<UserStatus, Tone> = { Active: "green", Inactive: "gray" };

export const paymentTone: Record<PaymentStatus, Tone> = { Paid: "green", Pending: "amber" };

export const activityMeta: Record<ActivityCategory, { icon: LucideIcon; tone: Tone }> = {
  Results: { icon: FileText, tone: "blue" },
  Subscription: { icon: CreditCard, tone: "amber" },
  Attendance: { icon: CheckCircle2, tone: "green" },
  Users: { icon: Users, tone: "purple" },
  Settings: { icon: Settings, tone: "gray" },
  Finance: { icon: DollarSign, tone: "amber" },
  Academic: { icon: BookOpen, tone: "blue" },
  Admin: { icon: ShieldCheck, tone: "red" },
};

// Quota bars warn as they fill up
export const usageTone = (pct: number): Tone => (pct >= 95 ? "red" : pct >= 80 ? "amber" : "blue");