import { Building2, CreditCard, User, type LucideIcon } from "lucide-react";
import type { CreateSchoolInput } from "../schemas";
import type { PlanFilter, SchoolPlan, StatusFilter } from "../types";

export const PAGE_SIZE = 6;

export const STATUS_FILTERS: StatusFilter[] = ["All", "Active", "Trial", "Pending", "Suspended", "Expired"];
export const PLAN_FILTERS: PlanFilter[] = ["All", "Premium", "Standard", "Basic", "No plan"];

export const WIZARD_STEPS: { label: string; icon: LucideIcon }[] = [
  { label: "School Info", icon: Building2 },
  { label: "Administrator", icon: User },
  { label: "Subscription", icon: CreditCard },
];

// Fields validated before moving on from each step
export const STEP_FIELDS: (keyof CreateSchoolInput)[][] = [
  ["name", "code", "email", "phone", "website", "address", "country", "state", "city", "logo"],
  ["firstName", "lastName", "adminEmail", "adminPhone", "username", "temporaryPassword"],
  ["plan", "trialMode", "startDate", "renewalDate", "maxStudents", "maxTeachers"],
];

// TODO: load from the subscription plans API once it exists
export const PLAN_DEFAULTS: Record<SchoolPlan, { price: number; students: number; teachers: number; storageGb: number }> = {
  Premium: { price: 450000, students: 1500, teachers: 100, storageGb: 20 },
  Standard: { price: 180000, students: 1000, teachers: 70, storageGb: 15 },
  Basic: { price: 85000, students: 300, teachers: 30, storageGb: 5 },
};

export const isSchoolPlan = (v: string): v is SchoolPlan => v in PLAN_DEFAULTS;

export const PLAN_SELECT_OPTIONS = (Object.keys(PLAN_DEFAULTS) as SchoolPlan[]).map((p) => ({
  value: p,
  label: `${p} · ₦${PLAN_DEFAULTS[p].price.toLocaleString("en-NG")}/yr`,
}));

export const COUNTRY_OPTIONS = ["Nigeria", "Ghana", "Kenya", "South Africa", "Cameroon", "Other"].map((c) => ({
  value: c,
  label: c,
}));

export const CREATE_SCHOOL_DEFAULTS: CreateSchoolInput = {
  name: "",
  code: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  country: "Nigeria",
  state: "",
  city: "",
  logo: undefined,
  firstName: "",
  lastName: "",
  adminEmail: "",
  adminPhone: "",
  username: "",
  temporaryPassword: "",
  plan: "",
  trialMode: false,
  startDate: "",
  renewalDate: "",
  maxStudents: "", // number fields start empty (input type is unknown because of coercion)
  maxTeachers: "",
};