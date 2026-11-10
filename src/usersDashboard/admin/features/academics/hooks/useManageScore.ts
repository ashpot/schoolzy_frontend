import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { USERS_ENDPOINTS } from "@/usersDashboard/admin/features/users/api";
import { useClassGroupOptions, useLessonSubjects } from "@/usersDashboard/admin/features/learning/hooks/useLearning";
import { titleCase } from "@/usersDashboard/admin/features/learning/shared/utils/lessonNoteMapper";
import { ACADEMICS_ENDPOINTS } from "../api";
import { useTermOptions } from "./useAttendanceSummary";
import type {
  AssessmentTypeApi, ScoreFilters, ScoreResponse, ScoreRow, UserLiteResponse,
} from "../types/manageScore";
import { matchesFilters, toScoreRows } from "../utils/userMapper";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Dropdown sources. Subjects and assessment types belong to a section, so they follow the class group.
export const useScoreFilterOptions = (classGroupId: string) => {
  const terms = useTermOptions(); // active term sorted first
  const groups = useClassGroupOptions();
  const subjects = useLessonSubjects();
  const types = useQuery({
    queryKey: ["academics", "assessment-types", "raw"],
    queryFn: () => apiRequest<AssessmentTypeApi[]>(ACADEMICS_ENDPOINTS.LIST_ASSESSMENT_TYPES),
  });

  const section = groups.options.find((g) => g.value === classGroupId)?.section ?? null;
  const fits = (s: number | null) => section === null || s === null || s === section;

  return {
    termOptions: terms.data ?? [],
    groupOptions: groups.options,
    subjectOptions: classGroupId
      ? (subjects.data ?? []).filter((s) => fits(s.section)).map((s) => ({ value: String(s.id), label: titleCase(s.name) }))
      : [],
    assessmentOptions: classGroupId
      ? (types.data ?? []).filter((t) => fits(t.section)).map((t) => ({
          value: String(t.id),
          label: `${titleCase(t.name)} (${t.base_mark} marks)`,
        }))
      : [],
    maxOf: (id: string) => (types.data ?? []).find((t) => String(t.id) === id)?.base_mark ?? null,
    loading: terms.isLoading || groups.isLoading || subjects.isLoading || types.isLoading,
  };
};

// Scores carry ids only, so student and uploader names come from the users list
export const useScoresList = (f: ScoreFilters | null) =>
  useQuery({
    queryKey: ["manage-scores", "list", f?.classGroupId, f?.termId, f?.subjectId, f?.assessmentTypeId],
    enabled: f !== null,
    queryFn: async (): Promise<ScoreRow[]> => {
      const [raw, users] = await Promise.all([
        apiRequest<ScoreResponse[]>(ACADEMICS_ENDPOINTS.SCORES(f!)),
        apiRequest<UserLiteResponse[]>(USERS_ENDPOINTS.LIST_ALL),
      ]);
      return toScoreRows(raw.filter((r) => matchesFilters(r, f!)), users);
    },
  });

// ─── Stubs: the score update endpoint doesn't exist yet ───────────────────────
// Deliberately no invalidateQueries: a refetch would overwrite the locally saved value.

export const useSaveScore = () =>
  useMutation({
    mutationFn: async (payload: { id: number; score: number }) => {
      // TODO: Replace with actual API call once the score update endpoint exists
      // (POST /results/bulk/ already upserts: it returned created: 0, updated: 1 for an existing score)
      await delay(500);
      return { success: true, data: payload };
    },
  });

export const useSaveAllScores = () =>
  useMutation({
    mutationFn: async (payload: { id: number; score: number }[]) => {
      // TODO: Replace with actual API call once the score update endpoint exists
      await delay(800);
      return { success: true, data: payload };
    },
  });