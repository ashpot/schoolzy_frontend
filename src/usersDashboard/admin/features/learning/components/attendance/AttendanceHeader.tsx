import { CheckCircle2, Clock, Search } from "lucide-react";
import { STATUS_PILLS } from "../../shared/utils/constants";
import type { AttendanceStatus } from "../../types";

interface AttendanceHeaderProps {
  classLabel: string;
  total: number;
  counts: Record<AttendanceStatus, number>;
  search: string;
  onSearchChange: (value: string) => void;
  onMarkAllPresent: () => void;
}

export default function AttendanceHeader({
  classLabel, total, counts, search, onSearchChange, onMarkAllPresent,
}: AttendanceHeaderProps) {
  const marked = total - counts.unmarked;
  const bar = (n: number) => `${total > 0 ? (n / total) * 100 : 0}%`;

  return (
    <div className="px-6 py-4 border-b border-border-line02 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-text-nav">{classLabel}</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-xs font-medium text-brand-primary">
            {total} Students
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMarkAllPresent}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mark All Present
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-lg border border-border-line02 bg-bg-input text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all w-40"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_PILLS.map(({ label, key, dot, pill }) => (
            <span key={label} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              {counts[key]} {label}
            </span>
          ))}
        </div>
        {counts.unmarked > 0 && (
          <span className="flex items-center gap-1 text-xs text-amber-600">
            <Clock className="w-3.5 h-3.5" />
            {counts.unmarked} students not yet marked
          </span>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
          <span>Marking progress</span>
          <span>{marked}/{total}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
          <div className="bg-green-500 h-full transition-all duration-300" style={{ width: bar(counts.present) }} />
          <div className="bg-red-500 h-full transition-all duration-300" style={{ width: bar(counts.absent) }} />
          <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: bar(counts.late) }} />
        </div>
      </div>
    </div>
  );
}