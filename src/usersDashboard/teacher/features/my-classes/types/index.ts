export interface ClassOption {
  value: string;
  label: string;
}

export interface EnrolledStudent {
  id: string;
  admissionNumber: string;
  fullName: string;
  gender: "Male" | "Female";
  className: string;
  attendancePercent: number;
}

export interface AttendanceStats {
  totalRate: number;
  presentDays: number;
  absentDays: number;
  lateEntries: number;
  totalStudents: number;
  totalDays: number;
}

export interface WeeklyTrendPoint {
  week: string;
  rate: number;
  present: number;
}

export interface AttendanceDistribution {
  present: number;
  absent: number;
  late: number;
}

export interface StudentAttendance {
  id: string;
  name: string;
  admissionNumber: string;
  totalPresent: number;
  totalAbsent: number;
  lateEntries: number;
  attendancePercent: number;
}

export type AttendanceStatus = "Excellent" | "Good" | "Fair" | "Poor";