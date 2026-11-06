// export interface AttendanceWeekPoint {
//   week: string; // "Wk 1"
//   attendanceRate: number; // %
//   present: number; // count
// }

// export interface AttendanceDistributionSlice {
//   label: "Present" | "Absent" | "Late";
//   percentage: number;
//   color: string;
// }

// export type AttendanceStatus = "Excellent" | "Good" | "Fair" | "Poor";

// export interface StudentAttendanceRow {
//   id: string;
//   admissionNumber: string;
//   fullName: string;
//   totalPresent: number;
//   totalAbsent: number;
//   lateEntries: number;
//   attendancePercentage: number;
//   status: AttendanceStatus;
// }

// export interface AttendanceSummaryData {
//   className: string;
//   term: string;
//   session: string;
//   totalAttendanceRate: number;
//   attendanceRateChange: number; // vs prev term, e.g. +0
//   presentDays: number;
//   presentDaysStudentCount: number;
//   presentDaysSpan: number; // "65 days"
//   absentDays: number;
//   absentDaysPercentage: number;
//   lateEntries: number;
//   lateEntriesPercentage: number;
//   weeklyTrend: AttendanceWeekPoint[];
//   distribution: AttendanceDistributionSlice[];
//   students: StudentAttendanceRow[];
// }


// ─── Backend shapes ───────────────────────────────────────────────────────────
export interface AttendanceAnalyticsResponse {
  class_group: { id: number; name: string };
  term: { id: number; name: string; start_date: string; end_date: string };
  summary: {
    total_students: number;
    total_records: number;
    total_present: number;
    total_absent: number;
    total_late: number;
    attendance_rate: number;
    previous_term_rate: number;
    attendance_rate_change: number;
    trend_direction: string; // only "unchanged" seen so far; UI derives direction from the sign instead
    absent_percentage: number;
    late_percentage: number;
  };
  weekly_trend: { week: number; label: string; attendance_rate: number; total_records: number }[];
  distribution: { name: string; value: number; count: number }[];
  students: {
    student_id: number;
    student_name: string;
    total_present: number;
    total_absent: number;
    total_late: number;
    total_records: number;
    attendance_percentage: number;
    status: string; // only "Needs Improvement" seen so far
  }[];
}

export interface TermResponse {
  id: number;
  name: string;
  is_active: boolean;
  result_published: boolean;
  tag: string;
  start_date: string;
  end_date: string;
  session: number;
}

export interface SessionResponse {
  id: number;
  name: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
}

// ─── UI shapes ────────────────────────────────────────────────────────────────
export interface AttendanceSummaryFilters {
  classGroupId: string;
  termId: string;
}

export interface AttendanceWeekPoint {
  label: string; // "Wk 1"
  attendanceRate: number | null; // null when no records that week → gap in the chart
  records: number;
}

export interface AttendanceDistributionSlice {
  label: "Present" | "Absent" | "Late";
  count: number;
  percentage: number;
  color: string;
}

export interface StudentAttendanceRow {
  id: string;
  fullName: string;
  totalPresent: number;
  totalAbsent: number;
  lateEntries: number;
  totalRecords: number;
  attendancePercentage: number;
  status: string;
}

export interface AttendanceSummaryData {
  className: string;
  term: string;
  termRange: string;
  totalStudents: number;
  totalRecords: number;
  hasData: boolean;
  attendanceRate: number;
  hasPrevious: boolean;
  rateChange: number;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  presentPercentage: number;
  absentPercentage: number;
  latePercentage: number;
  weeklyTrend: AttendanceWeekPoint[];
  distribution: AttendanceDistributionSlice[];
  students: StudentAttendanceRow[];
}