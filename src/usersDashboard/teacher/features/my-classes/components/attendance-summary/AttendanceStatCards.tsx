import { BarChart3, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { AttendanceStats } from "../../types";

export default function AttendanceStatCards({ stats }: { stats: AttendanceStats }) {
  const cards = [
    {
      label: "Total Attendance Rate",
      value: `${stats.totalRate}%`,
      icon: <BarChart3 size={16} className="text-brand-primary" />,
      iconBg: "bg-blue-50",
      note: "+0% vs prev term",
      noteColor: "text-green-600",
      barColor: "bg-warning",
      barPct: stats.totalRate,
    },
    {
      label: "Present Days",
      value: stats.presentDays,
      icon: <CheckCircle2 size={16} className="text-green-600" />,
      iconBg: "bg-green-50",
      note: `Across ${stats.totalStudents} students · ${stats.totalDays} days`,
      noteColor: "text-text-muted",
      barColor: "bg-green-500",
      barPct: 100,
    },
    {
      label: "Absent Days",
      value: stats.absentDays,
      icon: <XCircle size={16} className="text-danger" />,
      iconBg: "bg-red-50",
      note: `${Math.round((stats.absentDays / (stats.presentDays + stats.absentDays)) * 100)}% of total records`,
      noteColor: "text-text-muted",
      barColor: "bg-danger",
      barPct: 30,
    },
    {
      label: "Late Entries",
      value: stats.lateEntries,
      icon: <Clock size={16} className="text-warning" />,
      iconBg: "bg-amber-50",
      note: "6% of total records",
      noteColor: "text-text-muted",
      barColor: "bg-warning",
      barPct: 15,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-text-muted uppercase tracking-wide">{c.label}</p>
            <span className={`w-8 h-8 rounded-lg flex-center ${c.iconBg}`}>{c.icon}</span>
          </div>
          <p className="card-number">{c.value}</p>
          <p className={`text-xs mt-1 ${c.noteColor}`}>{c.note}</p>
          <div className="h-1.5 rounded-full bg-bg-input overflow-hidden mt-3">
            <div className={`h-full rounded-full ${c.barColor}`} style={{ width: `${c.barPct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}