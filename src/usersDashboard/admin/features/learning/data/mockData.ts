import type { AttendanceStudent } from "../types";

// Attendance is still mocked. Remove this file once Attendance is wired.
export const mockAttendanceStudents: AttendanceStudent[] = [
  { id: "s-001", name: "Chidinma Harold",   admNo: "SCH/2025/001", status: "unmarked", timeMarked: null },
  { id: "s-002", name: "Kelechi Igwe",      admNo: "SCH/2025/002", status: "unmarked", timeMarked: null },
  { id: "s-003", name: "Femi Ade",          admNo: "SCH/2025/003", status: "unmarked", timeMarked: null },
  { id: "s-004", name: "Emeka Okeke",       admNo: "SCH/2025/004", status: "unmarked", timeMarked: null },
  { id: "s-005", name: "Zainab Yusuf",      admNo: "SCH/2025/005", status: "unmarked", timeMarked: null },
  { id: "s-006", name: "Chinedu Obi",       admNo: "SCH/2025/006", status: "unmarked", timeMarked: null },
  { id: "s-007", name: "Ngozi Anthony",     admNo: "SCH/2025/007", status: "unmarked", timeMarked: null },
  { id: "s-008", name: "Hassan Jibril",     admNo: "SCH/2025/008", status: "unmarked", timeMarked: null },
  { id: "s-009", name: "Chidinma Lawrence", admNo: "SCH/2025/009", status: "unmarked", timeMarked: null },
  { id: "s-010", name: "James Ude",         admNo: "SCH/2025/010", status: "unmarked", timeMarked: null },
];

export const classOptions = [
  { value: "nursery-1", label: "Nursery 1" },
  { value: "nursery-2", label: "Nursery 2" },
  { value: "primary-1", label: "Primary 1" },
  { value: "primary-2", label: "Primary 2" },
  { value: "primary-3", label: "Primary 3" },
  { value: "jss-1",     label: "JSS 1" },
  { value: "jss-2",     label: "JSS 2" },
  { value: "jss-3",     label: "JSS 3" },
  { value: "ss-1",      label: "SS 1" },
  { value: "ss-2",      label: "SS 2" },
  { value: "ss-3",      label: "SS 3" },
];

export const classGroupOptions = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
  { value: "d", label: "D" },
];