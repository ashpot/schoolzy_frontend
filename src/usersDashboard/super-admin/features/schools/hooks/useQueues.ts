import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/super-admin-auth/apiClient";
import { mockDelay } from "../data/mockApi";
import type { School, SchoolsListData } from "../types";
import type { DecisionVars } from "../types/queues";
import { SCHOOLS_KEY, fetchAllSchools, patchSchools } from "./useSchools";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and SCHOOLS_ENDPOINTS from "../api".

const retry = (count: number, err: unknown) =>
  !(err instanceof ApiError && err.status === 401) && count < 2;

// Both pages read the same cached list as All Schools, filtered by status.
const selectPending = (d: SchoolsListData): School[] => d.schools.filter((s) => s.status === "Pending");
const selectSuspended = (d: SchoolsListData): School[] =>
  d.schools.filter((s) => s.status === "Suspended" || s.status === "Expired");

export const usePendingSchools = () =>
  useQuery({ queryKey: SCHOOLS_KEY, queryFn: fetchAllSchools, staleTime: 30_000, retry, select: selectPending });

export const useSuspendedSchools = () =>
  useQuery({ queryKey: SCHOOLS_KEY, queryFn: fetchAllSchools, staleTime: 30_000, retry, select: selectSuspended });

// Mock mutations edit the cached list only (reset on the next refetch).
export const useApproveSchool = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, DecisionVars>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SCHOOLS_ENDPOINTS.APPROVE(id), { method: "POST" });
      await mockDelay(800);
    },
    onSuccess: (_d, { id }) =>
      patchSchools(qc, (schools) => schools.map((s) => (s.id === id ? { ...s, status: "Active" } : s))),
  });
};

export const useRejectSchool = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, DecisionVars>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SCHOOLS_ENDPOINTS.REJECT(id), { method: "POST", body: { reason } });
      await mockDelay(800);
    },
    onSuccess: (_d, { id }) => patchSchools(qc, (schools) => schools.filter((s) => s.id !== id)),
  });
};