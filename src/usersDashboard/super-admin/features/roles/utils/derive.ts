import type { ModuleId, Permission, PermissionMap } from "../types";
import { MODULES } from "./constants";

export const emptyPermissions = (): PermissionMap =>
  Object.fromEntries(MODULES.map((m) => [m.id, [] as Permission[]])) as PermissionMap;

// Keeps only known modules and permissions, so stale values from the backend
// (for example a removed "content" module) can never show up or be saved back.
export const normalize = (raw: Partial<Record<string, string[]>>): PermissionMap => {
  const out = emptyPermissions();
  for (const m of MODULES) out[m.id] = m.permissions.filter((p) => raw[m.id]?.includes(p));
  return out;
};

export const countGranted = (map: PermissionMap) =>
  MODULES.reduce((sum, m) => sum + map[m.id].length, 0);

export const TOTAL_PERMISSIONS = MODULES.reduce((sum, m) => sum + m.permissions.length, 0);

export const sameMap = (a: PermissionMap, b: PermissionMap) =>
  MODULES.every((m) => a[m.id].length === b[m.id].length && a[m.id].every((p) => b[m.id].includes(p)));

export const moduleOf = (id: ModuleId) => MODULES.find((m) => m.id === id) as (typeof MODULES)[number];