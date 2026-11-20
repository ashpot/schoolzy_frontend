import type { PlanValues } from "../schemas";
import type { SupportLevel } from "../types";

export const PAGE_SIZE = 6;

export const FEATURES = [
  "Attendance", "Results", "Finance", "Inventory", "Online Tests", "Parent Portal",
  "Student Portal", "Teacher Portal", "API Access", "Custom Branding", "SMS Notifications",
  "Email Notifications", "Multi-Campus Support",
] as const;

export const SUPPORT_LEVELS: SupportLevel[] = ["Basic", "Priority", "Dedicated"];
export const SUPPORT_OPTIONS = SUPPORT_LEVELS.map((s) => ({ value: s, label: s }));

export const PLAN_FORM_DEFAULTS: PlanValues = {
  name: "",
  description: "",
  monthlyPrice: "",
  yearlyPrice: "",
  maxStudents: "",
  maxTeachers: "",
  storageGb: "",
  support: "Basic",
  features: [],
  recommended: false,
  active: true,
};

export const SUB_STATUS_FILTERS = ["Active", "Trial", "Expired", "Suspended"];
export const RENEWAL_STATUS_FILTERS = ["Overdue", "Due Today", "Due in 7 Days", "Upcoming"];
export const DAYS_FILTERS = ["Overdue", "Due today", "Next 7 days", "Next 30 days", "Later"];