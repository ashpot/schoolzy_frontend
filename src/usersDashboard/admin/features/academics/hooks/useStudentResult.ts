import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { ACADEMICS_ENDPOINTS } from "../api";
import type {
  PsychomotiveScore, RawSession, RawStudentResult, RawTerm, RawUser,
  ResultComments, SchoolProfile, SearchParams,
} from "../types/studentResult";
import { mapSearchStudent, mapStudentResult } from "../utils/studentResultMappers";

const FIVE_MIN = 5 * 60_000;
const EMPTY: never[] = [];

// One /users/ fetch powers the whole suggestion list (?role= is broken server-side).
// The ["users", ...] key means student create/delete invalidates it automatically.
export const useStudentSearchIndex = () =>
  useQuery({
    queryKey: ["users", "students", "search-index"],
    staleTime: FIVE_MIN,
    queryFn: async () => {
      const raw = await apiRequest<RawUser[]>(ACADEMICS_ENDPOINTS.LIST_USERS);
      if (!Array.isArray(raw)) throw new Error("Unexpected response while loading students");
      return raw.filter((u) => u.role === "Student").map(mapSearchStudent);
    },
  });

// Same keys as the Sessions feature, so the cache is shared
export const useAcademicLookups = () => {
  const sessions = useQuery({
    queryKey: ["sessions", "list"], staleTime: FIVE_MIN,
    queryFn: () => apiRequest<RawSession[]>(ACADEMICS_ENDPOINTS.LIST_SESSIONS),
  });
  const terms = useQuery({
    queryKey: ["terms", "list"], staleTime: FIVE_MIN,
    queryFn: () => apiRequest<RawTerm[]>(ACADEMICS_ENDPOINTS.LIST_TERMS),
  });
  return {
    sessions: sessions.data ?? (EMPTY as RawSession[]),
    terms: terms.data ?? (EMPTY as RawTerm[]),
    isLoading: sessions.isLoading || terms.isLoading,
  };
};

export const useStudentResult = (params: SearchParams | null) =>
  useQuery({
    queryKey: ["student-result", params?.studentId, params?.termId],
    enabled: params !== null,
    staleTime: 60_000,
    retry: false, // a 403 should show immediately, not after 3 retries
    queryFn: async () => {
      const raw = await apiRequest<RawStudentResult>(
        ACADEMICS_ENDPOINTS.STUDENT_RESULT(params!.studentId, params!.termId)
      );
      return mapStudentResult(raw);
    },
  });

// Letterhead data: name from /public/tenant/, the rest from /public/settings/
export const useSchoolProfile = (enabled = true) =>
  useQuery({
    queryKey: ["school-profile"],
    enabled,
    staleTime: 10 * 60_000,
    queryFn: async (): Promise<SchoolProfile> => {
      const [tenant, settings] = await Promise.allSettled([
        apiRequest<{ school_name?: string }>(ACADEMICS_ENDPOINTS.SCHOOL_TENANT),
        apiRequest<Record<string, string | null>>(ACADEMICS_ENDPOINTS.SCHOOL_SETTINGS),
      ]);
      const t = tenant.status === "fulfilled" ? tenant.value : {};
      const s = settings.status === "fulfilled" ? settings.value : {};
      return {
        name: t.school_name ?? "School",
        logo: s.logo ?? null,
        motto: s.motto ?? "",
        address: [s.address, s.city, s.state].filter(Boolean).join(", "),
        phone: s.phone ?? "",
        email: s.email ?? "",
      };
    },
  });

export const useSaveResultComment = () =>
  useMutation({
    mutationFn: async (payload: { studentId: string; termId: string; values: ResultComments }) => {
      // TODO: Replace with actual API call (no write endpoint exists in the backend doc yet)
      // return apiRequest(ACADEMICS_ENDPOINTS.RESULT_COMMENTS, { method: "POST", body: JSON.stringify(payload) });
      await new Promise((r) => setTimeout(r, 800));
      return { success: true, data: payload };
    },
  });

export const useSavePsychomotive = () =>
  useMutation({
    mutationFn: async (payload: { studentId: string; termId: string; scores: PsychomotiveScore[] }) => {
      // TODO: Replace with actual API call (no student scoring endpoint exists in the backend doc yet)
      // return apiRequest(ACADEMICS_ENDPOINTS.STUDENT_PSYCHOMOTIVE, { method: "POST", body: JSON.stringify(payload) });
      await new Promise((r) => setTimeout(r, 800));
      return { success: true, data: payload };
    },
  });