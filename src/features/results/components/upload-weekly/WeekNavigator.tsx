import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

interface Props {
  selectedWeek: number;
  onChange:     (week: number) => void;
}

export default function WeekNavigator({ selectedWeek, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(Math.max(1, selectedWeek - 1))} disabled={selectedWeek === 1}
        className="w-7 h-7 flex-center rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors">
        <ChevronLeft size={16} className="text-text-secondary" />
      </button>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-line02 bg-white text-sm font-medium text-text-primary">
        <CalendarDays size={14} className="text-brand-primary" />
        Week {selectedWeek}
      </div>
      <button onClick={() => onChange(Math.min(12, selectedWeek + 1))} disabled={selectedWeek === 12}
        className="w-7 h-7 flex-center rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors">
        <ChevronRight size={16} className="text-text-secondary" />
      </button>
    </div>
  );
}