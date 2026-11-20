import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { mockFetchRevenue } from "../data/mockRevenue";
import type { RevenueData, RevenuePeriod } from "../types/revenue";

// Real call (commented below) uses: apiFetch from "@/super-admin-auth/apiClient"
// and ANALYTICS_ENDPOINTS from "../api".
export const useRevenue = (period: RevenuePeriod) =>
  useQuery({
    queryKey: ["sa-analytics-revenue", period],
    queryFn: (): Promise<RevenueData> => {
      // TODO: Replace with actual API call, then map the response to RevenueData
      // return mapRevenue(await apiFetch(ANALYTICS_ENDPOINTS.REVENUE(period)));
      return mockFetchRevenue(period);
    },
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });