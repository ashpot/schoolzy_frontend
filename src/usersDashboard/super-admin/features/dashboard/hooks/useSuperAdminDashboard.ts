import { useQuery } from "@tanstack/react-query";
import { mockDashboard } from "../data/mockData";
import type { DashboardData } from "../types";

export const useSuperAdminDashboard = () =>
  useQuery({
    queryKey: ["sa-dashboard"],
    queryFn: async (): Promise<DashboardData> => {
      // TODO: Replace with actual API call (path is a guess; not in the API doc yet)
      // return api.get("/platform/dashboard/");
      await new Promise((r) => setTimeout(r, 800));
      return mockDashboard;
    },
    staleTime: 60_000,
  });