import { useMutation } from "@tanstack/react-query";
import {
  mockAttendanceStats,
  mockWeeklyTrend,
  mockDistribution,
  mockStudentAttendance,
} from "../data/mockData";
import type { AttendanceFilterValues } from "../schemas";

export const useLoadAttendanceSummary = () => {
  return useMutation({
    mutationFn: async (_filters: AttendanceFilterValues) => {
      // TODO: Replace with actual API call
      // return api.get("/attendance/summary", { params: filters });
      await new Promise((r) => setTimeout(r, 800));
      return {
        stats: mockAttendanceStats,
        trend: mockWeeklyTrend,
        distribution: mockDistribution,
        students: mockStudentAttendance,
      };
    },
  });
};