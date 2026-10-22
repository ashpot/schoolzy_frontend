import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { LEARNING_ENDPOINTS } from "../api";
import type {
  AttendanceBulkPayload, AttendanceBulkResponse, AttendanceRecordResponse,
  AttendanceStatus, AttendanceStudent, LoadedAttendance, StudentResponse,
} from "../types";
import { fromApiStatus, toApiStatus, toAttendanceStudent } from "../shared/utils/attendanceMapper";
import { clearDraft } from "../shared/utils/attendanceDraft";

interface LoadArgs { classGroupId: number; date: string }
interface SaveArgs { classGroupId: number; date: string; students: AttendanceStudent[] }

// Loads the class group's active students and pre-fills any attendance already taken that day
export const useLoadAttendanceStudents = () =>
  useMutation({
    mutationFn: async ({ classGroupId, date }: LoadArgs): Promise<LoadedAttendance> => {
      const [users, records] = await Promise.all([
        apiRequest<StudentResponse[]>(LEARNING_ENDPOINTS.STUDENTS_BY_GROUP(classGroupId)),
        // TODO: ask backend for ?date=&class_group= — this returns every record ever taken.
        // Pre-fill is a nicety, so a failure here must not block loading students.
        apiRequest<AttendanceRecordResponse[]>(LEARNING_ENDPOINTS.ATTENDANCE).catch(
          () => [] as AttendanceRecordResponse[]
        ),
      ]);

      const existing = new Map<number, AttendanceStatus>(
        records
          .filter((r) => r.date === date && r.class_group === classGroupId)
          .map((r) => [r.student, fromApiStatus(r.status)])
      );

      const students = users
        .filter((u) => u.role === "Student" && u.is_active)
        .map((u) => toAttendanceStudent(u, existing.get(u.id)))
        .sort((a, b) => a.name.localeCompare(b.name));

      return { students, prefilled: students.some((s) => s.status !== "unmarked") };
    },
  });

export const useSaveAttendance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ classGroupId, date, students }: SaveArgs) => {
      const payload: AttendanceBulkPayload = {
        class_group: classGroupId,
        date,
        attendance: students.flatMap((s) =>
          s.status === "unmarked" ? [] : [{ student: Number(s.id), status: toApiStatus(s.status) }]
        ),
      };
      return apiRequest<AttendanceBulkResponse>(LEARNING_ENDPOINTS.ATTENDANCE_BULK, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    // Hook-level so the draft is cleared even if the user navigated away mid-save
    onSuccess: () => {
      clearDraft();
      qc.invalidateQueries({ queryKey: ["attendance"] });
    },
  });
};