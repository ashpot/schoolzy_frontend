import { CheckCheck, RotateCcw, Search } from "lucide-react";
import type { Student, ScoresMap } from "../../types";
import Button           from "@/shared/ui/Button";
import WeeklyScoreTable from "./WeeklyScoreTable";

interface Props {
  students:       Student[];
  scores:         ScoresMap;
  selectedWeek:   number;
  subjectLabel:   string;
  search:         string;
  onSearchChange: (v: string) => void;
  onScoreChange:  (id: string, value: number | "") => void;
  onFillAll:      () => void;
  onClearScores:  () => void;
}

const WEEKLY_MAX = 10;

export default function WeeklyScoreCard({
  students, scores, selectedWeek, subjectLabel, search, onSearchChange, onScoreChange, onFillAll, onClearScores,
}: Props) {
  const filledScores = students.map((s) => scores[s.id]).filter((v): v is number => typeof v === "number");
  const filledCount  = filledScores.length;
  const avg          = filledCount > 0 ? filledScores.reduce((a, b) => a + b, 0) / filledCount : 0;
  const highest      = filledCount > 0 ? Math.max(...filledScores) : 0;
  const progress     = students.length > 0 ? (filledCount / students.length) * 100 : 0;
  // const filtered     = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.studentId.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="p-5 border-b border-border-line02">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-text-muted font-semibold">#</span>
            <h2 className="section-title">Week {selectedWeek} — {subjectLabel}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{students.length} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="primary" size="sm" leftIcon={<CheckCheck size={14} />} onClick={onFillAll}>Fill All {WEEKLY_MAX}</Button>
            <Button type="button" variant="ghost"   size="sm" leftIcon={<RotateCcw  size={14} />} onClick={onClearScores}>Clear Scores</Button>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Search student..." value={search} onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-44 transition-all" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-medium text-text-secondary">{filledCount}/{students.length} filled</span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">Avg: {filledCount > 0 ? avg.toFixed(1) : "0.0"}/{WEEKLY_MAX}</span>
          {filledCount > 0 && <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">High: {highest}/{WEEKLY_MAX}</span>}
          <div className="flex-1 min-w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      <WeeklyScoreTable students={students} scores={scores} selectedWeek={selectedWeek} search={search} onScoreChange={onScoreChange} />
    </div>
  );
}