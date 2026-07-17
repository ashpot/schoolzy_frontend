import { useMutation, useQuery } from "@tanstack/react-query";
import { mockAttendanceStudents, mockRecentAttendance } from "../data/mockData";
import type { AttendanceSetupValues } from "../schemas";
import type { AttendanceStudent } from "../types";

export const useLoadAttendanceStudents = () => {
  return useMutation({
    mutationFn: async (_values: AttendanceSetupValues): Promise<AttendanceStudent[]> => {
      // TODO: Replace with actual API call
      // return api.get(`/attendance/students`, { params: values });
      await new Promise((r) => setTimeout(r, 800));
      return mockAttendanceStudents.map((s, i) => ({
        ...s,
        status: i === 0 ? "Present" : i === 1 ? "Absent" : i === 2 ? "Late" : null,
        timeMarked: i < 3 ? "08:15" : null,
      }));
    },
  });
};

export const useSaveAttendance = () => {
  return useMutation({
    mutationFn: async (students: AttendanceStudent[]) => {
      // TODO: Replace with actual API call
      // return api.post("/attendance", { students });
      await new Promise((r) => setTimeout(r, 700));
      return { success: true, count: students.length };
    },
  });
};

export const useRecentAttendance = () => {
  return useQuery({
    queryKey: ["recent-attendance"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // return api.get("/attendance/recent");
      await new Promise((r) => setTimeout(r, 300));
      return mockRecentAttendance;
    },
  });
};