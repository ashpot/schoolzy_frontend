import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { useClassGroupOptions, useLessonSubjects } from "@/usersDashboard/admin/features/learning/hooks/useLearning";
import { useTermOptions } from "@/usersDashboard/admin/features/academics/hooks/useAttendanceSummary";
import { titleCase } from "@/usersDashboard/admin/features/learning/shared/utils/lessonNoteMapper";
import { RESULTS_ENDPOINTS } from "../api";
import { toScoresheet } from "../utils/scoresheetMapper";
import type {
  AssessmentTypeRaw, BulkScoresPayload, BulkScoresResponse, Scoresheet, ScoresheetResponse, ScoresheetSetup,
} from "../types/uploadResults";

// Dropdown sources for the setup form. Subjects are limited to the class group's section.
export const useResultSetupOptions = (classGroupId: string) => {
  const terms = useTermOptions();
  const groups = useClassGroupOptions();
  const subjects = useLessonSubjects();
  const section = groups.options.find((g) => g.value === classGroupId)?.section ?? null;

  const subjectOptions = (subjects.data ?? [])
    .filter((s) => section === null || s.section === null || s.section === section)
    .map((s) => ({ value: String(s.id), label: titleCase(s.name) }));

  return {
    termOptions: terms.data ?? [], // active term sorted first
    groupOptions: groups.options,
    subjectOptions,
    loading: terms.isLoading || groups.isLoading || subjects.isLoading,
  };
};

// The sheet gives ids + names only, so max marks and weights are fetched alongside it.
// If that list fails the sheet still loads, just without limits or totals.
export const useLoadScoresheet = () =>
  useMutation({
    mutationFn: async (s: ScoresheetSetup): Promise<Scoresheet> => {
      const [raw, types] = await Promise.all([
        apiRequest<ScoresheetResponse>(RESULTS_ENDPOINTS.SCORESHEET(s.term, s.classGroup, s.subject)),
        apiRequest<AssessmentTypeRaw[]>(RESULTS_ENDPOINTS.ASSESSMENT_TYPES).catch(() => [] as AssessmentTypeRaw[]),
      ]);
      return toScoresheet(raw, new Map(types.map((t) => [t.id, t])));
    },
  });

export const useSaveScores = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: BulkScoresPayload) =>
      apiRequest<BulkScoresResponse>(RESULTS_ENDPOINTS.BULK_SCORES, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["class-results"] }),
  });
};