import { titleCase } from "@/usersDashboard/admin/features/learning/shared/utils/lessonNoteMapper";
import type {
  AttendanceAnalyticsResponse, AttendanceDistributionSlice, AttendanceSummaryData,
} from "../types/attendanceSummary";

const COLORS = { Present: "#22c55e", Absent: "#ef4444", Late: "#f59e0b" } as const;

const round1 = (n: number) => Math.round(n * 10) / 10;
const pct = (n: number, total: number) => (total > 0 ? round1((n / total) * 100) : 0);

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function toAttendanceSummary(r: AttendanceAnalyticsResponse): AttendanceSummaryData {
  const s = r.summary;

  // The endpoint always returns 13 weeks → drop trailing weeks with no records
  const lastWithData = r.weekly_trend.reduce((last, w, i) => (w.total_records > 0 ? i : last), -1);
  const weeklyTrend = r.weekly_trend.slice(0, lastWithData + 1).map((w) => ({
    label: w.label.replace("Week", "Wk"),
    attendanceRate: w.total_records > 0 ? round1(w.attendance_rate) : null,
    records: w.total_records,
  }));

  // Percentages are derived from counts (the scale of `distribution.value` is unconfirmed)
  const distribution: AttendanceDistributionSlice[] = (["Present", "Absent", "Late"] as const).map((label) => {
    const count = r.distribution.find((d) => d.name === label)?.count ?? 0;
    return { label, count, percentage: pct(count, s.total_records), color: COLORS[label] };
  });

  const students = r.students
    .map((st) => ({
      id: String(st.student_id),
      fullName: titleCase(st.student_name),
      totalPresent: st.total_present,
      totalAbsent: st.total_absent,
      lateEntries: st.total_late,
      totalRecords: st.total_records,
      attendancePercentage: round1(st.attendance_percentage),
      status: st.status,
    }))
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  return {
    className: titleCase(r.class_group.name),
    term: titleCase(r.term.name),
    termRange: `${formatDay(r.term.start_date)} – ${formatDay(r.term.end_date)}`,
    totalStudents: s.total_students,
    totalRecords: s.total_records,
    hasData: s.total_records > 0,
    attendanceRate: round1(s.attendance_rate),
    hasPrevious: s.previous_term_rate > 0,
    rateChange: round1(s.attendance_rate_change),
    totalPresent: s.total_present,
    totalAbsent: s.total_absent,
    totalLate: s.total_late,
    presentPercentage: pct(s.total_present, s.total_records),
    absentPercentage: pct(s.total_absent, s.total_records),
    latePercentage: pct(s.total_late, s.total_records),
    weeklyTrend,
    distribution,
    students,
  };
}

