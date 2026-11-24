import { useQuery } from "@tanstack/react-query";
import { mockFetchAudit } from "../data/mockAudit";
import type { AuditData } from "../types";

// Real call (commented below) uses: apiFetch from "@/super-admin-auth/apiClient"
// and AUDIT_ENDPOINTS from "../api".
export const useAuditLogs = () =>
  useQuery({
    queryKey: ["sa-audit-logs"],
    queryFn: (): Promise<AuditData> => {
      // TODO: Replace with actual API call, then map the response to AuditData
      // return mapAudit(await apiFetch(AUDIT_ENDPOINTS.LIST));
      return mockFetchAudit();
    },
    staleTime: 30_000,
  });