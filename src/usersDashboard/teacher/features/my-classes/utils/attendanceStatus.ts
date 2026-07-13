import type { AttendanceStatus } from "../types";

export function computeStatus(pct: number): AttendanceStatus {
  if (pct >= 90) return "Excellent";
  if (pct >= 75) return "Good";
  if (pct >= 60) return "Fair";
  return "Poor";
}

export const statusStyles: Record<AttendanceStatus, string> = {
  Excellent: "border border-blue-200 bg-blue-50 text-blue-700",
  Good: "border border-green-200 bg-green-50 text-green-700",
  Fair: "border border-amber-200 bg-amber-50 text-amber-700",
  Poor: "border border-red-200 bg-red-50 text-red-700",
};