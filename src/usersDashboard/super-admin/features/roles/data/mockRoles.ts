import type { ModuleId, Permission, Role } from "../types";
import { MODULES } from "../utils/constants";
import { normalize } from "../utils/derive";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// TODO: Delete once the real endpoints are wired.
const full = () => normalize(Object.fromEntries(MODULES.map((m) => [m.id, m.permissions])));
const pick = (p: Partial<Record<ModuleId, Permission[]>>) => normalize(p);

const ALL_ANALYTICS: Permission[] = ["view", "export"];

function buildRoles(): Role[] {
  return [
    {
      id: "r1", name: "Super Admin", description: "Full unrestricted access to all platform features and settings.",
      system: true, active: true, users: 2, createdBy: "System", createdAt: "2025-01-10", updatedAt: "2026-07-01", permissions: full(),
    },
    {
      id: "r2", name: "Operations Manager", description: "Manage schools, users and subscriptions. Cannot change settings.",
      system: false, active: true, users: 3, createdBy: "Super Admin", createdAt: "2025-01-18", updatedAt: "2026-06-15",
      permissions: pick({
        schools: ["view", "create", "edit", "delete", "approve"], users: ["view", "create", "edit"],
        subscriptions: ["view", "create", "edit", "delete"], payments: ["view", "export"],
        analytics: ALL_ANALYTICS, support: ["view", "create", "edit"], settings: ["view"], audit: ["view"],
      }),
    },
    {
      id: "r3", name: "Support Agent", description: "Handle tickets and messages from schools.",
      system: false, active: true, users: 8, createdBy: "Super Admin", createdAt: "2025-02-03", updatedAt: "2026-06-30",
      permissions: pick({ schools: ["view"], users: ["view"], support: ["view", "create", "edit", "manage"], audit: ["view"] }),
    },
    {
      id: "r4", name: "Finance Officer", description: "View and manage payments, subscriptions and financial reports.",
      system: false, active: true, users: 2, createdBy: "Super Admin", createdAt: "2025-04-12", updatedAt: "2026-06-20",
      permissions: pick({
        schools: ["view"], subscriptions: ["view", "edit", "manage"], payments: ["view", "export", "manage"],
        analytics: ALL_ANALYTICS, support: ["view"], audit: ["view"],
      }),
    },
    {
      id: "r5", name: "Developer", description: "Access to API settings, webhooks and technical configuration.",
      system: false, active: true, users: 2, createdBy: "Super Admin", createdAt: "2025-01-25", updatedAt: "2026-07-05",
      permissions: pick({
        schools: ["view"], users: ["view"], subscriptions: ["view"], payments: ["view"],
        analytics: ALL_ANALYTICS, support: ["view"], settings: ["view", "edit", "manage"], audit: ["view", "export"],
      }),
    },
  ];
}

export async function mockFetchRoles(): Promise<Role[]> {
  await mockDelay(600);
  return buildRoles();
}