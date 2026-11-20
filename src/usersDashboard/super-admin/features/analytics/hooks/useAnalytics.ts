import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { mockFetchAnalytics } from "../data/mockAnalytics";
import type { AnalyticsData, Period } from "../types";

// Real call (commented below) uses: apiFetch from "@/super-admin-auth/apiClient"
// and ANALYTICS_ENDPOINTS from "../api".
export const useAnalytics = (period: Period) =>
  useQuery({
    queryKey: ["sa-analytics", period],
    queryFn: (): Promise<AnalyticsData> => {
      // TODO: Replace with actual API call, then map the response to AnalyticsData
      // return mapAnalytics(await apiFetch(ANALYTICS_ENDPOINTS.OVERVIEW(period)));
      return mockFetchAnalytics(period);
    },
    staleTime: 60_000,
    placeholderData: keepPreviousData, // keep the old numbers on screen while a new period loads
  });