export interface AttendanceWeekPoint {
  week: string; // "Wk 1"
  attendanceRate: number; // %
  present: number; // count
}

export interface AttendanceDistributionSlice {
  label: "Present" | "Absent" | "Late";
  percentage: number;
  color: string;
}

export type AttendanceStatus = "Excellent" | "Good" | "Fair" | "Poor";

export interface StudentAttendanceRow {
  id: string;
  admissionNumber: string;
  fullName: string;
  totalPresent: number;
  totalAbsent: number;
  lateEntries: number;
  attendancePercentage: number;
  status: AttendanceStatus;
}

export interface AttendanceSummaryData {
  className: string;
  term: string;
  session: string;
  totalAttendanceRate: number;
  attendanceRateChange: number; // vs prev term, e.g. +0
  presentDays: number;
  presentDaysStudentCount: number;
  presentDaysSpan: number; // "65 days"
  absentDays: number;
  absentDaysPercentage: number;
  lateEntries: number;
  lateEntriesPercentage: number;
  weeklyTrend: AttendanceWeekPoint[];
  distribution: AttendanceDistributionSlice[];
  students: StudentAttendanceRow[];
}