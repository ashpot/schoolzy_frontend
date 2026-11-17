import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/shared/config/api";
import { ApiError, apiFetch } from "@/super-admin-auth/apiClient";
import { debugLog } from "@/super-admin-auth/utils/debug";
import { SCHOOLS_ENDPOINTS } from "../api";
import type { CreateSchoolValues } from "../schemas";
import type { ApiSchool, ApiSchoolsOverviewResponse, School, SchoolStatus, SchoolsListData } from "../types";
import { mockBuildSchool, mockDelay } from "../data/mockApi";
import { mapSchoolsData } from "../utils/mapSchools";

export const SCHOOLS_KEY = ["sa-schools"] as const;

const MAX_PAGES = 50; // safety cap while following `next` links

// `next` links are only followed on the API's own host, and rebuilt on the API origin,
// so a bad link can never send the auth token elsewhere (or downgrade to http).
function sameOriginUrl(next: string): string | null {
  try {
    const api = new URL(API_BASE_URL);
    const link = new URL(next);
    if (link.hostname !== api.hostname) return null;
    return `${api.origin}${link.pathname}${link.search}`;
  } catch {
    return null;
  }
}

export async function fetchAllSchools(): Promise<SchoolsListData> {
  const first = await apiFetch<ApiSchoolsOverviewResponse>(SCHOOLS_ENDPOINTS.LIST);
  const data = first?.data;
  if (!data?.overview || !data.schools) throw new ApiError(500, "Malformed schools response", first);

  const results: ApiSchool[] = [...data.schools.results];
  let next = data.schools.next;
  let pages = 1;

  while (next && pages < MAX_PAGES) {
    const url = sameOriginUrl(next);
    if (!url) break;
    const page = await apiFetch<ApiSchoolsOverviewResponse>(url);
    results.push(...(page?.data?.schools?.results ?? []));
    next = page?.data?.schools?.next ?? null;
    pages += 1;
  }

  const mapped = mapSchoolsData(data.overview, results);
  debugLog("schools mapped (view model)", mapped);
  return mapped;
}

export const useSchools = () =>
  useQuery({
    queryKey: SCHOOLS_KEY,
    queryFn: fetchAllSchools,
    staleTime: 30_000,
    // Never retry auth failures; apiClient already ended the session on 401.
    retry: (count, err) => !(err instanceof ApiError && err.status === 401) && count < 2,
  });

// Mock mutations edit the cached list only (reset on the next refetch).
// When a real endpoint ships, replace the patch with invalidateQueries({ queryKey: SCHOOLS_KEY }).
export function patchSchools(qc: QueryClient, fn: (schools: School[]) => School[]) {
  qc.setQueryData<SchoolsListData>(SCHOOLS_KEY, (old) =>
    old ? { ...old, schools: fn(old.schools) } : old
  );
}

const setStatus = (status: SchoolStatus) => (schools: School[], id: string) =>
  schools.map((s) => (s.id === id ? { ...s, status } : s));

export const useCreateSchool = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: CreateSchoolValues): Promise<School> => {
      // TODO: Replace with actual API call (multipart because of the logo upload)
      // return apiFetch(SCHOOLS_ENDPOINTS.CREATE, { method: "POST", body: buildSchoolFormData(values) });
      await mockDelay(1000);
      const code = values.code.trim().toUpperCase();
      const existing = qc.getQueryData<SchoolsListData>(SCHOOLS_KEY)?.schools ?? [];
      if (existing.some((s) => s.code === code)) {
        throw new Error("A school with this code already exists.");
      }
      return mockBuildSchool(values);
    },
    onSuccess: (school) => patchSchools(qc, (schools) => [school, ...schools]),
  });
};

// Factory for the by-id actions (keeps this file short)
function createSchoolAction(
  run: (id: string) => Promise<unknown>,
  apply?: (schools: School[], id: string) => School[]
) {
  return function useSchoolAction() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: run,
      onSuccess: (_data, id) => {
        if (apply) patchSchools(qc, (schools) => apply(schools, id));
      },
    });
  };
}

export const useSuspendSchool = createSchoolAction(async () => {
  // TODO: Replace with actual API call
  // return apiFetch(SCHOOLS_ENDPOINTS.SUSPEND(id), { method: "POST" });
  await mockDelay(700);
}, setStatus("Suspended"));

export const useReactivateSchool = createSchoolAction(async () => {
  // TODO: Replace with actual API call
  // return apiFetch(SCHOOLS_ENDPOINTS.REACTIVATE(id), { method: "POST" });
  await mockDelay(700);
}, setStatus("Active"));

export const useDeleteSchool = createSchoolAction(
  async () => {
    // TODO: Replace with actual API call
    // return apiFetch(SCHOOLS_ENDPOINTS.DETAIL(id), { method: "DELETE" });
    await mockDelay(700);
  },
  (schools, id) => schools.filter((s) => s.id !== id)
);

export const useImpersonateSchoolAdmin = createSchoolAction(async () => {
  // TODO: Replace with actual API call. The backend must return a short-lived, audited token,
  // then open the school's site with it in a new tab.
  // return apiFetch(SCHOOLS_ENDPOINTS.IMPERSONATE(id), { method: "POST" });
  await mockDelay(700);
});