import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import type { QuickActionData } from "../types";

export const quickActions: QuickActionData[] = [
  { id: "addSchool", label: "Add School", tone: "blue", to: SA_PATHS.schools },
  { id: "payments", label: "View Payments", tone: "amber", to: SA_PATHS.payments },
  { id: "newPlan", label: "Create Subscription Plan", tone: "green", to: SA_PATHS.newSubscriptionPlan },
];