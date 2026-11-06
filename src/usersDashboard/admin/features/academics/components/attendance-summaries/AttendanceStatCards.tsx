import React from "react";
import { Clock, Minus, Percent, TrendingDown, TrendingUp, UserCheck, UserX } from "lucide-react";
import type { AttendanceSummaryData } from "../../types/attendanceSummary";

interface CardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconCls: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ label, value, icon, iconCls, children }) => (
  <div className="bg-white rounded-2xl card-shadow p-5">
    <div className="flex items-center justify-between">
      <p className="text-body-small text-text-secondary">{label}</p>
      <div className={`w-9 h-9 rounded-xl flex-center ${iconCls}`}>{icon}</div>
    </div>
    <p className="card-number mt-3">{value}</p>
    <div className="mt-1 text-xs text-text-muted">{children}</div>
  </div>
);

const Trend: React.FC<{ data: AttendanceSummaryData }> = ({ data }) => {
  if (!data.hasPrevious) return <span>No previous term to compare</span>;
  const c = data.rateChange;
  if (c === 0) {
    return <span className="flex items-center gap-1"><Minus size={13} /> No change vs last term</span>;
  }
  const up = c > 0;
  return (
    <span className={`flex items-center gap-1 ${up ? "text-green-600" : "text-red-600"}`}>
      {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
      {up ? "+" : ""}{c}% vs last term
    </span>
  );
};

const AttendanceStatCards: React.FC<{ data: AttendanceSummaryData }> = ({ data }) => {
  const of = `of ${data.totalRecords} records`;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card label="Attendance Rate" value={`${data.attendanceRate}%`}
        icon={<Percent size={16} />} iconCls="bg-blue-50 text-brand-primary">
        <Trend data={data} />
      </Card>
      <Card label="Total Present" value={String(data.totalPresent)}
        icon={<UserCheck size={16} />} iconCls="bg-green-50 text-green-600">
        {data.presentPercentage}% {of} · {data.totalStudents} students
      </Card>
      <Card label="Total Absent" value={String(data.totalAbsent)}
        icon={<UserX size={16} />} iconCls="bg-red-50 text-red-600">
        {data.absentPercentage}% {of}
      </Card>
      <Card label="Late Entries" value={String(data.totalLate)}
        icon={<Clock size={16} />} iconCls="bg-amber-50 text-amber-600">
        {data.latePercentage}% {of}
      </Card>
    </div>
  );
};

export default AttendanceStatCards;