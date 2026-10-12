// Backend route -> real frontend route (see Routing.tsx)
const ADMIN = "/admin-dashboard";

const ROUTE_MAP: Record<string, string> = {
  "/setup/profile": `${ADMIN}/settings/school`,
  "/setup/branding": `${ADMIN}/settings/school`,
  "/setup/academic-structure": `${ADMIN}/sections/sections`,
  "/setup/assessment": `${ADMIN}/academics/assessment-types`,
  "/academics/grades": `${ADMIN}/academics/grade`,
  "/academics/classes": `${ADMIN}/sections/classes`,
  "/academics/class-groups": `${ADMIN}/sections/class-groups`,
  "/academics/sections": `${ADMIN}/sections/sections`,
  "/academics/subjects": `${ADMIN}/academics/subjects`,
  "/assessment/types": `${ADMIN}/academics/assessment-types`,
};

export function mapRoute(backendRoute: string): string {
  const mapped = ROUTE_MAP[backendRoute];
  if (mapped) return mapped;
  if (import.meta.env.DEV) {
    console.warn(`[onboarding] No frontend route mapped for "${backendRoute}"`);
  }
  return backendRoute;
}