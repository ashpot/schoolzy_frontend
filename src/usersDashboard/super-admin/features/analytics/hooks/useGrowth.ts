import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { mockFetchGrowth } from "../data/mockGrowth";
import type { GrowthData, GrowthPeriod } from "../types/growth";

// Real call (commented below) uses: apiFetch from "@/super-admin-auth/apiClient"
// and ANALYTICS_ENDPOINTS from "../api".
export const useGrowth = (period: GrowthPeriod) =>
  useQuery({
    queryKey: ["sa-analytics-growth", period],
    queryFn: (): Promise<GrowthData> => {
      // TODO: Replace with actual API call, then map the response to GrowthData
      // return mapGrowth(await apiFetch(ANALYTICS_ENDPOINTS.GROWTH(period)));
      return mockFetchGrowth(period);
    },
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });