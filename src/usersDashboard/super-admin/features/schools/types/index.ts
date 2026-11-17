/* ───────────── API shapes (GET /platform/schools/overview/) ───────────── */

export interface ApiOverview {
  total_schools: number;
  schools_added_this_month: number;
  total_active_schools: number;
  active_this_week: number;
  total_pending_approval: number;
  new_this_week: number;
  total_suspended_schools: number;
  suspended_this_week: number;
}

export interface ApiSchool {
  id: number;
  tenant_uuid: string;
  name: string;
  code: string | null;
  admin_name: string | null;
  total_number_of_students: number;
  total_number_of_teachers: number;
  current_plan: string | null;
  date_for_renewal: string | null;
  status: string;
  created_at: string;
}

export interface ApiPage<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiSchoolsOverviewResponse {
  success: boolean;
  data: { overview: ApiOverview; schools: ApiPage<ApiSchool> };
}

/* ───────────── View shapes ───────────── */

export type SchoolStatus = "Active" | "Trial" | "Pending" | "Suspended" | "Expired" | "Unknown";
export type SchoolPlan = "Premium" | "Standard" | "Basic"; // plans offered in the Add School form
export type StatusFilter = "All" | Exclude<SchoolStatus, "Unknown">;
export type PlanFilter = "All" | SchoolPlan | "No plan";

export type SchoolAction =
  | "view"
  | "manage"
  | "impersonate"
  | "edit"
  | "suspend"
  | "reactivate"
  | "delete";

// Actions that need a confirmation dialog before running
export type ConfirmAction = Extract<SchoolAction, "impersonate" | "suspend" | "reactivate" | "delete">;

export interface School {
  id: string;
  tenantUuid: string;
  name: string;
  code: string | null;
  admin: string | null;
  students: number;
  teachers: number;
  plan: string | null;
  renewalDate: string | null; // ISO yyyy-mm-dd
  status: SchoolStatus;
  createdAt: string; // ISO
}

export interface SchoolsSummary {
  total: number;
  active: number;
  pending: number;
  suspendedExpired: number;
  addedThisMonth: number;
  activeThisWeek: number;
  pendingNewThisWeek: number;
  suspendedThisWeek: number;
}

export interface SchoolsListData {
  schools: School[];
  summary: SchoolsSummary;
}