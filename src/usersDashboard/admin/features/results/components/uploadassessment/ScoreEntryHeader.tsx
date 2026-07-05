import { Info, Search } from "lucide-react";
import Button from "@/shared/ui/Button";

interface Props {
  totalCount:    number;
  filteredCount: number;
  filledCount:   number;
  avg:           number;
  maxScore:      number;
  search:        string;
  onSearchChange: (v: string) => void;
  onFillMax:      () => void;
}

export default function ScoreEntryHeader({
  totalCount, filteredCount, filledCount, avg, maxScore, search, onSearchChange, onFillMax,
}: Props) {
  const progress = totalCount > 0 ? (filledCount / totalCount) * 100 : 0;

  return (
    <div className="p-5 border-b border-border-line02">
      {/* Title row */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <h2 className="section-title">Score Entry</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            {filteredCount} students
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onFillMax}>
            Fill Max ({maxScore})
          </Button>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-48 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Stats + progress row */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-medium text-text-secondary">
          {filledCount}/{totalCount} filled
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
          Avg: {filledCount > 0 ? avg.toFixed(1) : "0.0"} / {maxScore}
        </span>
        <div className="flex-1 min-w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="flex items-center gap-1 text-xs text-text-muted">
          <Info size={12} />
          Max score for this type: {maxScore}
        </span>
      </div>
    </div>
  );
}