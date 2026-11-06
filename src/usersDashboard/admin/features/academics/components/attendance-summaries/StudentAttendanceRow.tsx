import React from "react";
import { avatarColor, getInitials } from "@/usersDashboard/admin/features/learning/shared/utils/helpers";
import type { StudentAttendanceRow as Row } from "../../types/attendanceSummary";

// Only "Needs Improvement" is confirmed from the backend; the others are best guesses.
// Unknown values fall back to gray and show the raw text.
const STATUS_STYLES: Record<string, string> = {
  excellent: "bg-green-50 text-green-700 border-green-100",
  good: "bg-blue-50 text-blue-700 border-blue-100",
  fair: "bg-amber-50 text-amber-700 border-amber-100",
  "needs improvement": "bg-red-50 text-red-600 border-red-100",
};
const FALLBACK = "bg-gray-100 text-gray-500 border-gray-200";

const barColor = (p: number) => (p >= 90 ? "bg-green-500" : p >= 75 ? "bg-amber-500" : "bg-red-500");

interface StudentAttendanceRowProps {
  row: Row;
  rowNumber: number;
}

const StudentAttendanceRow: React.FC<StudentAttendanceRowProps> = ({ row, rowNumber }) => {
  const noRecords = row.totalRecords === 0;
  // A student with no records isn't "Needs Improvement", they simply have no data yet
  const statusText = noRecords ? "No records" : row.status;
  const statusCls = noRecords ? FALLBACK : STATUS_STYLES[row.status.toLowerCase()] ?? FALLBACK;

  return (
    <tr className="border-t border-border-line02 hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 text-text-muted">{rowNumber}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex-center text-xs font-semibold shrink-0 ${avatarColor(row.fullName)}`}>
            {getInitials(row.fullName)}
          </div>
          <span className="font-medium text-text-nav">{row.fullName}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-text-secondary">{row.totalPresent}</td>
      <td className="px-6 py-4 text-text-secondary">{row.totalAbsent}</td>
      <td className="px-6 py-4 text-text-secondary">{row.lateEntries}</td>
      <td className="px-6 py-4">
        {noRecords ? (
          <span className="text-text-muted">—</span>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className={`h-full rounded-full ${barColor(row.attendancePercentage)}`} style={{ width: `${Math.min(100, row.attendancePercentage)}%` }} />
            </div>
            <span className="text-text-primary font-medium">{row.attendancePercentage}%</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusCls}`}>
          {statusText}
        </span>
      </td>
    </tr>
  );
};

export default StudentAttendanceRow;