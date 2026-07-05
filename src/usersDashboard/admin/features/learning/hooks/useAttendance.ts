import { useMemo } from "react";
import type { AttendanceStudent } from "../types";



export function useAttendanceStats(students: AttendanceStudent[]) {
  return useMemo(() => {
    const presentCount = students.filter((s) => s.status === "present").length;
    const absentCount = students.filter((s) => s.status === "absent").length;
    const lateCount = students.filter((s) => s.status === "late").length;
    const unmarkedCount = students.filter((s) => s.status === "unmarked").length;
    const markedCount = presentCount + absentCount + lateCount;
    const total = students.length;

    return {
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      unmarked: unmarkedCount,
      marked: markedCount,
      total,
      percentage: total > 0 ? (markedCount / total) * 100 : 0,
    };
  }, [students]);
}