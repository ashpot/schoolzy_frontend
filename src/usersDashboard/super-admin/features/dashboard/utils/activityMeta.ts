import {
  Activity as ActivityIcon,
  Building2,
  CreditCard,
  DollarSign,
  Headphones,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { ActivityType } from "../types";

export const activityMeta: Record<ActivityType, { icon: LucideIcon; tone: Tone }> = {
  school: { icon: Building2, tone: "blue" },
  payment: { icon: DollarSign, tone: "amber" },
  user: { icon: Users, tone: "purple" },
  subscription: { icon: CreditCard, tone: "green" },
  support: { icon: Headphones, tone: "red" },
  other: { icon: ActivityIcon, tone: "gray" },
};