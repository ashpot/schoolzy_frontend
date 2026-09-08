import React from "react";
import type { StudentAttendanceRow as RowType } from "../../types/attendanceSummary";
import AvatarInitials from "../../../users/components/shared/AvatarInitials";

const STATUS_STYLES: Record<RowType["status"], string> = {
  Excellent: "bg-brand-primary/10 text-brand-primary",
  Good: "bg-success/10 text-success",
  Fair: "bg-warning/10 text-warning",
  Poor: "bg-danger/10 text-danger",
};

const BAR_COLOR: Record<RowType["status"], string> = {
  Excellent: "bg-success",
  Good: "bg-success",
  Fair: "bg-warning",
  Poor: "bg-danger",
};

interface StudentAttendanceRowProps {
  row: RowType;
  rowNumber: number;
}

const StudentAttendanceRow: React.FC<StudentAttendanceRowProps> = ({ row, rowNumber }) => (
  <tr className="border-t border-border-line02 hover:bg-bg-soft/50">
    <td className="px-6 py-3.5 text-text-muted">{rowNumber}</td>
    <td className="px-6 py-3.5">
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.fullName} />
        <div>
          <p className="font-medium text-text-primary">{row.fullName}</p>
          <p className="text-xs text-text-muted">{row.admissionNumber}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-3.5">
      <span className="px-2 py-0.5 rounded-md bg-success/10 text-success text-xs font-medium">{row.totalPresent} days</span>
    </td>
    <td className="px-6 py-3.5">
      <span className="px-2 py-0.5 rounded-md bg-danger/10 text-danger text-xs font-medium">{row.totalAbsent} days</span>
    </td>
    <td className="px-6 py-3.5">
      <span className="px-2 py-0.5 rounded-md bg-warning/10 text-warning text-xs font-medium">{row.lateEntries} days</span>
    </td>
    <td className="px-6 py-3.5">
      <div className="flex items-center gap-2 w-32">
        <div className="flex-1 h-1.5 rounded-full bg-bg-input overflow-hidden">
          <div className={`h-full rounded-full ${BAR_COLOR[row.status]}`} style={{ width: `${row.attendancePercentage}%` }} />
        </div>
        <span className="text-text-primary font-medium text-sm w-10">{row.attendancePercentage}%</span>
      </div>
    </td>
    <td className="px-6 py-3.5">
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[row.status]}`}>{row.status}</span>
    </td>
  </tr>
);

export default StudentAttendanceRow;