import type { RecentAttendanceRecord, LessonNote } from "../types";
import type { ClassOption } from "@/usersDashboard/teacher/features/my-classes/types";

export const classOptions: ClassOption[] = [
  { value: "jss3", label: "JSS 3" },
  { value: "ss1", label: "SS 1" },
  { value: "ss2", label: "SS 2" },
];

export const groupOptions: ClassOption[] = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
];

export const subjectOptions: ClassOption[] = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "further-math", label: "Further Mathematics" },
];

export const weekOptions: ClassOption[] = [
  { value: "week-3", label: "Week 3" },
  { value: "week-4", label: "Week 4" },
  { value: "week-5", label: "Week 5" },
];

export const mockAttendanceStudents = [
  { id: "1", name: "Chidinma Harold", admissionNumber: "SCH/2025/001" },
  { id: "2", name: "Kelechi Igwe", admissionNumber: "SCH/2025/002" },
  { id: "3", name: "Femi Ade", admissionNumber: "SCH/2025/003" },
  { id: "4", name: "Emeka Okeke", admissionNumber: "SCH/2025/004" },
  { id: "5", name: "Zainab Yusuf", admissionNumber: "SCH/2025/005" },
  { id: "6", name: "Chinedu Obi", admissionNumber: "SCH/2025/006" },
  { id: "7", name: "Ngozi Anthony", admissionNumber: "SCH/2025/007" },
  { id: "8", name: "Hassan Jibril", admissionNumber: "SCH/2025/008" },
  { id: "9", name: "Chidinma Lawrence", admissionNumber: "SCH/2025/009" },
  { id: "10", name: "James Ude", admissionNumber: "SCH/2025/010" },
];

export const mockRecentAttendance: RecentAttendanceRecord[] = [
  { id: "1", className: "JSS 3A", date: "Fri 13 Jun", present: 10, absent: 11, late: 12, totalStudents: 12, rate: 83 },
  { id: "2", className: "SS 1B", date: "Thu 12 Jun", present: 11, absent: 0, late: 1, totalStudents: 12, rate: 92 },
  { id: "3", className: "SS 2A", date: "Wed 11 Jun", present: 9, absent: 2, late: 1, totalStudents: 13, rate: 75 },
  { id: "4", className: "JSS 3A", date: "Tue 10 Jun", present: 10, absent: 2, late: 0, totalStudents: 12, rate: 83 },
  { id: "5", className: "SS 1B", date: "Mon 9 Jun", present: 11, absent: 1, late: 0, totalStudents: 12, rate: 92 },
];

export const mockLessonNotes: LessonNote[] = [
  { id: "1", title: "Introduction to Quadratic Eq", subject: "Mathematics", className: "SS 2", teacher: "Kim Williams", dateUploaded: "01 Mar 2026", term: "Second Term", week: "Week 3", fileType: "PDF", fileSizeMb: 1.2 },
  { id: "2", title: "Newton's Law of Motion", subject: "Physics", className: "SS 1", teacher: "Kim Williams", dateUploaded: "05 Mar 2026", term: "Second Term", week: "Week 4", fileType: "PDF", fileSizeMb: 2.4 },
  { id: "3", title: "Trigonometric Ratios & Identities", subject: "Further Math", className: "SS 2", teacher: "Kim Williams", dateUploaded: "06 Mar 2026", term: "Second Term", week: "Week 4", fileType: "DOC", fileSizeMb: 1.7 },
  { id: "4", title: "Algebra: Polynomials", subject: "Mathematics", className: "JSS 3", teacher: "Kim Williams", dateUploaded: "08 Mar 2026", term: "Second Term", week: "Week 5", fileType: "PDF", fileSizeMb: 3.1 },
  { id: "5", title: "Waves and Optics", subject: "Physics", className: "SS 2", teacher: "Kim Williams", dateUploaded: "10 Mar 2026", term: "Second Term", week: "Week 5", fileType: "PPT", fileSizeMb: 5.8 },
];