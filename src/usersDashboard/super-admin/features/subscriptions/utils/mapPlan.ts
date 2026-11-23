import type { PlanValues } from "../schemas";
import type { Plan } from "../types";
import { FEATURES } from "./constants";

export const valuesToPlan = (v: PlanValues): Omit<Plan, "id" | "schools"> => ({
  name: v.name.trim(),
  description: v.description.trim(),
  monthlyPrice: Number(v.monthlyPrice),
  yearlyPrice: Number(v.yearlyPrice),
  maxStudents: Number(v.maxStudents),
  maxTeachers: Number(v.maxTeachers),
  storageGb: Number(v.storageGb),
  support: v.support,
  features: FEATURES.filter((f) => v.features.includes(f)), // keeps the canonical order
  recommended: v.recommended,
  active: v.active,
});

export const planToValues = (p: Plan): PlanValues => ({
  name: p.name,
  description: p.description,
  monthlyPrice: String(p.monthlyPrice),
  yearlyPrice: String(p.yearlyPrice),
  maxStudents: String(p.maxStudents),
  maxTeachers: String(p.maxTeachers),
  storageGb: String(p.storageGb),
  support: p.support,
  features: [...p.features],
  recommended: p.recommended,
  active: p.active,
});