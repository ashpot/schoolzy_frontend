import { useQuery } from "@tanstack/react-query";
import { apiFetch, ApiError } from "@/super-admin-auth/api";
import { debugLog } from "@/super-admin-auth/utils/debug";
import { mapDashboard } from "../utils/mapDashboard";
import type { ApiDashboardResponse, DashboardData } from "../types";

export const useSuperAdminDashboard = () =>
  useQuery({
    queryKey: ["sa-dashboard"],
    queryFn: async (): Promise<DashboardData> => {
      const res = await apiFetch<ApiDashboardResponse>("/platform/dashboard/");
      if (!res?.data?.summary) throw new ApiError(500, "Malformed dashboard response", res);
      const mapped = mapDashboard(res.data);
      debugLog("dashboard mapped (view model)", mapped);
      return mapped;
    },
    staleTime: 60_000,
    // Never retry auth failures; apiFetch already ended the session on 401.
    retry: (count, err) => !(err instanceof ApiError && err.status === 401) && count < 2,
  });