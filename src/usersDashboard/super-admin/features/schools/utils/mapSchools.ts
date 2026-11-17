import type {
  ApiOverview, ApiSchool, School, SchoolStatus, SchoolsListData, SchoolsSummary,
} from "../types";
import type { SchoolDetail } from "../types/detail";

const STATUS_MAP: Record<string, SchoolStatus> = {
  ACTIVE: "Active",
  TRIAL: "Trial",
  PROVISIONING: "Pending", // matches the API's own "pending approval" count
  PENDING: "Pending",
  SUSPENDED: "Suspended",
  EXPIRED: "Expired",
};

// Unknown backend statuses fall back to "Unknown" so a new value never breaks the UI.
export const mapStatus = (raw: string | null | undefined): SchoolStatus =>
  STATUS_MAP[(raw ?? "").toUpperCase()] ?? "Unknown";

export const mapSchool = (s: ApiSchool): School => ({
  id: String(s.id),
  tenantUuid: s.tenant_uuid,
  name: s.name,
  code: s.code,
  admin: s.admin_name,
  students: s.total_number_of_students ?? 0,
  teachers: s.total_number_of_teachers ?? 0,
  plan: s.current_plan,
  renewalDate: s.date_for_renewal ? s.date_for_renewal.slice(0, 10) : null,
  status: mapStatus(s.status),
  createdAt: s.created_at,
});

const mapSummary = (o: ApiOverview): SchoolsSummary => ({
  total: o.total_schools ?? 0,
  active: o.total_active_schools ?? 0,
  pending: o.total_pending_approval ?? 0,
  suspendedExpired: o.total_suspended_schools ?? 0,
  addedThisMonth: o.schools_added_this_month ?? 0,
  activeThisWeek: o.active_this_week ?? 0,
  pendingNewThisWeek: o.new_this_week ?? 0,
  suspendedThisWeek: o.suspended_this_week ?? 0,
});

export function mapSchoolsData(overview: ApiOverview, results: ApiSchool[]): SchoolsListData {
  return { schools: results.map(mapSchool), summary: mapSummary(overview) };
}

// The detail endpoints don't exist yet: only the list fields are real, the rest is null.
export const toSchoolDetail = (s: School): SchoolDetail => ({
  ...s,
  address: null,
  city: null,
  state: null,
  phone: null,
  email: null,
  website: null,
  principal: null,
  adminEmail: null,
  adminPhone: null,
  adminUsername: null,
  parents: null,
  classes: null,
  subjects: null,
  storageUsedGb: null,
  storageLimitGb: null,
  studentLimit: null,
  teacherLimit: null,
  startedOn: null,
});