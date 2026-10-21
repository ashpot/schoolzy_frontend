import type {
  ApiAttendanceStatus, AttendanceStatus, AttendanceStudent, StudentResponse,
} from "../../types";
import { titleCase } from "./lessonNoteMapper";

type Marked = Exclude<AttendanceStatus, "unmarked">;

// Backend rejects lowercase ("present" → 400), so map at the payload boundary
const TO_API: Record<Marked, ApiAttendanceStatus> = {
  present: "Present",
  absent: "Absent",
  late: "Late",
};

export const toApiStatus = (s: Marked): ApiAttendanceStatus => TO_API[s];

export function fromApiStatus(s: string): AttendanceStatus {
  const v = s.toLowerCase();
  return v === "present" || v === "absent" || v === "late" ? v : "unmarked";
}

export function toAttendanceStudent(
  r: StudentResponse,
  status: AttendanceStatus = "unmarked"
): AttendanceStudent {
  return {
    id: String(r.id),
    name: titleCase(`${r.first_name} ${r.last_name}`.trim()),
    admNo: r.admission_number ?? "",
    photo: r.photo || null,
    status,
  };
}

export function countStatuses(students: AttendanceStudent[]): Record<AttendanceStatus, number> {
  const counts: Record<AttendanceStatus, number> = { present: 0, absent: 0, late: 0, unmarked: 0 };
  students.forEach((s) => { counts[s.status] += 1; });
  return counts;
}

// Local calendar date (toISOString would return yesterday between 00:00–01:00 in Lagos)
export function localDateString(d: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}