import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { DASHBOARD_ENDPOINTS } from "../api";
import type { ParentDashboardResponse } from "../types";
import type { ParentDetails, Child } from "../types"; // existing types file, kept as-is

const useParentDashboard = () =>
  useQuery({
    queryKey: ["dashboard", "parent"],
    queryFn: () => apiRequest<ParentDashboardResponse>(DASHBOARD_ENDPOINTS.PARENT),
  });

export const useParentDetails = () => {
  const query = useParentDashboard();

  const data: ParentDetails | undefined = query.data
    ? {
        name: query.data.profile.full_name,
        gender: (query.data.profile.sex as "Male" | "Female") ?? "Male", // TODO: backend sometimes returns null sex
        address: "Not available", // TODO: not present in /dashboard/parent/ response — flag to backend
        email: query.data.profile.email,
        phone: query.data.profile.phone ?? "Not available",
      }
    : undefined;

  return { ...query, data };
};

export const useMyKids = () => {
  const query = useParentDashboard();

  const data: Child[] | undefined = query.data
    ? query.data.children.map((c) => ({
        id: String(c.id),
        admissionNo: c.admission_number ?? "Not assigned",
        fullName: c.full_name,
        gender: "Male" as const, // TODO: children[] has no gender field in real API — flag to backend
        class: c.class_group ? String(c.class_group) : "Not assigned",
      }))
    : undefined;

  return { ...query, data };
};