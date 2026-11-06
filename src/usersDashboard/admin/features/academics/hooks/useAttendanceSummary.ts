import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { titleCase } from "@/usersDashboard/admin/features/learning/shared/utils/lessonNoteMapper";
import { ACADEMICS_ENDPOINTS } from "../api";
import { toAttendanceSummary } from "../utils/attendanceSummaryMapper";
import type {
  AttendanceAnalyticsResponse, AttendanceSummaryData, AttendanceSummaryFilters,
  SessionResponse, TermResponse,
} from "../types/attendanceSummary";

// Terms carry only a session id → resolve session names. Active term first, then newest.
export const useTermOptions = () =>
  useQuery({
    queryKey: ["academics", "terms", "options"],
    queryFn: async () => {
      const [terms, sessions] = await Promise.all([
        apiRequest<TermResponse[]>(ACADEMICS_ENDPOINTS.LIST_TERMS),
        apiRequest<SessionResponse[]>(ACADEMICS_ENDPOINTS.LIST_SESSIONS),
      ]);
      const sessionName = new Map(sessions.map((s) => [s.id, s.name]));
      return [...terms]
        .sort((a, b) => Number(b.is_active) - Number(a.is_active) || b.id - a.id)
        .map((t) => ({
          value: String(t.id),
          label: [titleCase(t.name), sessionName.get(t.session)].filter(Boolean).join(" · "),
        }));
    },
  });

export const useAttendanceAnalytics = (filters: AttendanceSummaryFilters | null) =>
  useQuery({
    queryKey: ["attendance-summary", filters?.classGroupId, filters?.termId],
    enabled: filters !== null,
    queryFn: async (): Promise<AttendanceSummaryData> => {
      const raw = await apiRequest<AttendanceAnalyticsResponse>(
        ACADEMICS_ENDPOINTS.ATTENDANCE_ANALYTICS(filters!.classGroupId, filters!.termId)
      );
      return toAttendanceSummary(raw);
    },
  });