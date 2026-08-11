import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { DASHBOARD_ENDPOINTS } from "../api";
import type { TeacherDashboardResponse, TeacherDetails, Subject } from "../types";

const useTeacherDashboard = () =>
  useQuery({
    queryKey: ["dashboard", "teacher"],
    queryFn: () => apiRequest<TeacherDashboardResponse>(DASHBOARD_ENDPOINTS.TEACHER),
  });

export const useTeacherDetails = () => {
  const query = useTeacherDashboard();

  const data: TeacherDetails | undefined = query.data
    ? {
        name: query.data.profile.full_name,
        role: "Teacher", // TODO: real API has no subject-title role text (e.g. "Mathematics Teacher") — flag to backend
        classAssigned: "Not assigned yet", // TODO: assigned_classes has no confirmed item shape yet
        email: query.data.profile.email,
        phone: query.data.profile.phone ?? "Not available",
      }
    : undefined;

  return { ...query, data };
};

export const useMySubjects = () => {
  const query = useTeacherDashboard();

  // TODO: assigned_subjects has no confirmed item shape yet — stays empty until backend defines it
  const data: Subject[] = [];

  return { ...query, data, isLoading: query.isLoading };
};