import type { AttendanceDistribution, AttendanceStats, ClassOption, EnrolledStudent, StudentAttendance, WeeklyTrendPoint } from "../types";

export const classOptions: ClassOption[] = [
  { value: "jss3a", label: "JSS 3A" },
  { value: "ss1a", label: "SS 1A" },
];

export const termOptions: ClassOption[] = [
  { value: "first", label: "First Term" },
  { value: "second", label: "Second Term" },
];

export const mockEnrolledStudents: EnrolledStudent[] = [
  { id: "1", admissionNumber: "ADM/2024/001", fullName: "Kehinde Fashola", gender: "Male", className: "JSS 3A", attendancePercent: 86 },
  { id: "2", admissionNumber: "ADM/2024/002", fullName: "Obiageli Nnaemeka", gender: "Female", className: "JSS 3A", attendancePercent: 96 },
  { id: "3", admissionNumber: "ADM/2024/003", fullName: "Abdulrahman Danjuma", gender: "Male", className: "JSS 3A", attendancePercent: 79 },
  { id: "4", admissionNumber: "ADM/2024/004", fullName: "Tolani Adeola", gender: "Female", className: "JSS 3A", attendancePercent: 89 },
  { id: "5", admissionNumber: "ADM/2024/005", fullName: "Chinonso Obi", gender: "Male", className: "JSS 3A", attendancePercent: 72 },
  { id: "6", admissionNumber: "ADM/2024/006", fullName: "Hadiza Usman", gender: "Female", className: "JSS 3A", attendancePercent: 82 },
  { id: "7", admissionNumber: "ADM/2024/007", fullName: "Lanre Salami", gender: "Male", className: "JSS 3A", attendancePercent: 92 },
  { id: "8", admissionNumber: "ADM/2024/008", fullName: "Uchenna Okeke", gender: "Female", className: "JSS 3A", attendancePercent: 75 },
  { id: "9", admissionNumber: "ADM/2024/009", fullName: "Suleiman Aliyu", gender: "Male", className: "JSS 3A", attendancePercent: 85 },
  { id: "10", admissionNumber: "ADM/2024/010", fullName: "Adaeze Okoye", gender: "Female", className: "JSS 3A", attendancePercent: 95 },
  { id: "11", admissionNumber: "ADM/2024/011", fullName: "Bola Adesola", gender: "Male", className: "JSS 3A", attendancePercent: 78 },
  { id: "12", admissionNumber: "ADM/2024/012", fullName: "Emeka Chibuike", gender: "Female", className: "JSS 3A", attendancePercent: 88 },
];

export const groupOptions: ClassOption[] = [
  { value: "a", label: "Group A" },
  { value: "b", label: "Group B" },
];

export const mockAttendanceStats: AttendanceStats = {
  totalRate: 77,
  presentDays: 556,
  absentDays: 181,
  lateEntries: 43,
  totalStudents: 12,
  totalDays: 65,
};

export const mockWeeklyTrend: WeeklyTrendPoint[] = [
  { week: "Wk 1", rate: 78, present: 30 },
  { week: "Wk 3", rate: 82, present: 35 },
  { week: "Wk 5", rate: 88, present: 42 },
  { week: "Wk 7", rate: 70, present: 28 },
  { week: "Wk 9", rate: 85, present: 40 },
  { week: "Wk 11", rate: 80, present: 33 },
  { week: "Wk 13", rate: 75, present: 30 },
];

export const mockDistribution: AttendanceDistribution = { present: 71, absent: 23, late: 6 };

export const mockStudentAttendance: StudentAttendance[] = [
  { id: "1", name: "Chidinma Harold", admissionNumber: "SCH/2025/001", totalPresent: 45, totalAbsent: 18, lateEntries: 2, attendancePercent: 72 },
  { id: "2", name: "Kelechi Igwe", admissionNumber: "SCH/2025/002", totalPresent: 45, totalAbsent: 18, lateEntries: 2, attendancePercent: 50 },
  { id: "3", name: "Femi Ade", admissionNumber: "SCH/2025/003", totalPresent: 45, totalAbsent: 18, lateEntries: 2, attendancePercent: 80 },
  { id: "4", name: "Emeka Okeke", admissionNumber: "SCH/2025/004", totalPresent: 45, totalAbsent: 18, lateEntries: 2, attendancePercent: 72 },
  { id: "5", name: "Zainab Yusuf", admissionNumber: "SCH/2025/005", totalPresent: 45, totalAbsent: 18, lateEntries: 2, attendancePercent: 80 },
  { id: "6", name: "Chinedu Obi", admissionNumber: "SCH/2025/006", totalPresent: 45, totalAbsent: 18, lateEntries: 2, attendancePercent: 100 },
  { id: "7", name: "Ngozi Anthony", admissionNumber: "SCH/2025/007", totalPresent: 45, totalAbsent: 18, lateEntries: 2, attendancePercent: 80 },
  { id: "8", name: "Hassan Jibril", admissionNumber: "SCH/2025/008", totalPresent: 45, totalAbsent: 18, lateEntries: 2, attendancePercent: 100 },
];