import React from "react";
import { BarChart3, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { AttendanceSummaryData } from "../../types/attendanceSummary";

interface AttendanceStatCardsProps {
  data: AttendanceSummaryData;
}

const AttendanceStatCards: React.FC<AttendanceStatCardsProps> = ({ data }) => {
  const cards = [
    {
      icon: BarChart3,
      value: `${data.totalAttendanceRate}%`,
      label: "Total Attendance Rate",
      sub: `+${data.attendanceRateChange}% vs prev term`,
      subColor: "text-success",
      barColor: "bg-warning",
      barPct: data.totalAttendanceRate,
      iconColor: "bg-blue-50 text-brand-primary",
    },
    {
      icon: CheckCircle2,
      value: String(data.presentDays),
      label: "Present Days",
      sub: `Across ${data.presentDaysStudentCount} students · ${data.presentDaysSpan} days`,
      subColor: "text-text-muted",
      barColor: "bg-success",
      barPct: 100,
      iconColor: "bg-green-50 text-success",
    },
    {
      icon: XCircle,
      value: String(data.absentDays),
      label: "Absent Days",
      sub: `${data.absentDaysPercentage}% of total records`,
      subColor: "text-text-muted",
      barColor: "bg-danger",
      barPct: data.absentDaysPercentage,
      iconColor: "bg-red-50 text-danger",
    },
    {
      icon: Clock,
      value: String(data.lateEntries),
      label: "Late Entries",
      sub: `${data.lateEntriesPercentage}% of total records`,
      subColor: "text-text-muted",
      barColor: "bg-warning",
      barPct: data.lateEntriesPercentage,
      iconColor: "bg-amber-50 text-warning",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-body-small text-text-secondary">{card.label}</p>
              <p className="card-number mt-1">{card.value}</p>
            </div>
            <div className={`w-9 h-9 rounded-lg flex-center shrink-0 ${card.iconColor}`}>
              <card.icon size={17} />
            </div>
          </div>
          <p className={`text-xs mb-2 ${card.subColor}`}>{card.sub}</p>
          <div className="h-1.5 rounded-full bg-bg-input overflow-hidden">
            <div className={`h-full rounded-full ${card.barColor}`} style={{ width: `${card.barPct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStatCards;