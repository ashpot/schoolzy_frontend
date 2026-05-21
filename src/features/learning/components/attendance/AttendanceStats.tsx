import { Clock } from "lucide-react";

const STAT_COLORS = {
  present: { dot: "bg-green-500", pill: "border-green-200 bg-green-50 text-green-700" },
  absent: { dot: "bg-red-500", pill: "border-red-200 bg-red-50 text-red-600" },
  late: { dot: "bg-amber-500", pill: "border-amber-200 bg-amber-50 text-amber-700" },
  unmarked: { dot: "bg-gray-300", pill: "border-gray-200 bg-gray-50 text-gray-500" },
};

interface AttendanceStatsProps {
  stats: {
    present: number;
    absent: number;
    late: number;
    unmarked: number;
    total: number;
  };
}

export function AttendanceStats({ stats }: AttendanceStatsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { label: "Present", count: stats.present, color: STAT_COLORS.present },
          { label: "Absent", count: stats.absent, color: STAT_COLORS.absent },
          { label: "Late", count: stats.late, color: STAT_COLORS.late },
          {
            label: "Unmarked",
            count: stats.unmarked,
            color: STAT_COLORS.unmarked,
          },
        ].map(({ label, count, color }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${color.pill}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
            {count} {label}
          </span>
        ))}
      </div>
      {stats.unmarked > 0 && (
        <span className="flex items-center gap-1 text-xs text-amber-600">
          <Clock className="w-3.5 h-3.5" />
          {stats.unmarked} students not yet marked
        </span>
      )}
    </div>
  );
}