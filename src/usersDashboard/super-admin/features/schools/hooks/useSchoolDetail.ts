import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockFetchSubscription } from "../data/mockDetail";
import { mockFetchAcademics, mockFetchActivity, mockFetchFinance, mockFetchUsers } from "../data/mockTabs";
import { mockDelay } from "../data/mockApi";
import { toSchoolDetail } from "../utils/mapSchools";
import { SCHOOLS_KEY, fetchAllSchools, patchSchools } from "./useSchools";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and SCHOOLS_ENDPOINTS from "../api".

// The detail header/overview is built from the same cached list the Schools page uses
// (there is no single-school endpoint yet), so it also survives a page refresh.
export const useSchoolDetail = (id: string) =>
  useQuery({
    queryKey: SCHOOLS_KEY,
    queryFn: fetchAllSchools,
    staleTime: 30_000,
    select: (data) => {
      const school = data.schools.find((s) => s.id === id);
      return school ? toSchoolDetail(school) : null;
    },
  });

const key = (id: string, part: string) => [...SCHOOLS_KEY, id, part];

// Each tab loads its own data only when it is opened (and only once it is in LIVE_TABS).
function createTabQuery<T>(part: string, run: (id: string) => Promise<T>) {
  return (id: string) =>
    useQuery({ queryKey: key(id, part), queryFn: () => run(id), staleTime: 30_000 });
}

export const useSchoolUsers = createTabQuery("users", async (id) => {
  // TODO: Replace with actual API call
  // return apiFetch(SCHOOLS_ENDPOINTS.USERS(id));
  return mockFetchUsers(id);
});

export const useSchoolAcademics = createTabQuery("academics", async (id) => {
  // TODO: Replace with actual API call
  // return apiFetch(SCHOOLS_ENDPOINTS.ACADEMICS(id));
  return mockFetchAcademics(id);
});

export const useSchoolFinance = createTabQuery("finance", async (id) => {
  // TODO: Replace with actual API call
  // return apiFetch(SCHOOLS_ENDPOINTS.FINANCE(id));
  return mockFetchFinance(id);
});

export const useSchoolSubscription = createTabQuery("subscription", async (id) => {
  // TODO: Replace with actual API call
  // return apiFetch(SCHOOLS_ENDPOINTS.SUBSCRIPTION(id));
  return mockFetchSubscription(id);
});

export const useSchoolActivity = createTabQuery("activity", async (id) => {
  // TODO: Replace with actual API call
  // return apiFetch(SCHOOLS_ENDPOINTS.ACTIVITY(id));
  return mockFetchActivity(id);
});

export const useRenewSubscription = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_vars: { id: string; renewalDate: string }) => {
      // TODO: Replace with actual API call
      // return apiFetch(SCHOOLS_ENDPOINTS.RENEW(id), { method: "POST", body: { renewal_date: renewalDate } });
      await mockDelay(900);
    },
    // Mock: edits the cached school only (reset on the next refetch).
    onSuccess: (_data, { id, renewalDate }) =>
      patchSchools(qc, (schools) =>
        schools.map((s) =>
          s.id === id
            ? { ...s, renewalDate, status: s.status === "Expired" ? "Active" : s.status }
            : s
        )
      ),
  });
};