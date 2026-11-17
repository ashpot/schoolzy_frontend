import type { CreateSchoolValues } from "../schemas";
import type { School } from "../types";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// TODO: Delete once the create endpoint is wired. Builds a local School from the wizard values.
export function mockBuildSchool(v: CreateSchoolValues): School {
  return {
    id: `local-${Date.now()}`,
    tenantUuid: "",
    name: v.name.trim(),
    code: v.code.trim().toUpperCase(),
    admin: `${v.firstName.trim()} ${v.lastName.trim()}`,
    students: 0,
    teachers: 0,
    plan: v.plan || null,
    renewalDate: v.renewalDate || null,
    status: v.trialMode ? "Trial" : "Active",
    createdAt: new Date().toISOString(),
  };
}