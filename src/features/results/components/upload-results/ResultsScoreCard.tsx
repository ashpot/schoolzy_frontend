import { CheckCheck, RotateCcw, Search } from "lucide-react";
import type { Student, ResultScoresMap } from "../../types";
import Button            from "@/shared/ui/Button";
import ResultsScoreTable from "./ResultsScoreTable";

interface Props {
  students:       Student[];
  scores:         ResultScoresMap;
  subjectLabel:   string;
  search:         string;
  onSearchChange: (v: string) => void;
  onScoreChange:  (id: string, field: "assignment" | "test" | "exam", value: number | "") => void;
  onFillAll:      () => void;
  onClearScores:  () => void;
}

export default function ResultsScoreCard({
  students, scores, subjectLabel, search, onSearchChange, onScoreChange, onFillAll, onClearScores,
}: Props) {
  const rows     = students.map((s) => scores[s.id]);
  const complete = rows.filter((r) => r && typeof r.assignment === "number" && typeof r.test === "number" && typeof r.exam === "number").length;
  const totals   = rows.filter(Boolean).map((r) => (Number(r!.assignment) || 0) + (Number(r!.test) || 0) + (Number(r!.exam) || 0)).filter((t) => t > 0);
  const avg      = totals.length > 0 ? totals.reduce((a, b) => a + b, 0) / totals.length : 0;
  const highest  = totals.length > 0 ? Math.max(...totals) : 0;
  const passed   = totals.filter((t) => (t / 100) * 100 >= 40).length;

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="p-5 border-b border-border-line02">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-text-muted">#</span>
            <h2 className="section-title">{subjectLabel} — Results</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{students.length} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="primary" size="sm" leftIcon={<CheckCheck size={14} />} onClick={onFillAll}>Fill All Max</Button>
            <Button type="button" variant="ghost"   size="sm" leftIcon={<RotateCcw  size={14} />} onClick={onClearScores}>Clear Scores</Button>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Search student..." value={search} onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-44 transition-all" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-medium text-text-secondary">{complete}/{students.length} complete</span>
          {avg > 0     && <span className="px-2.5 py-0.5 rounded-full bg-blue-50   text-blue-700   text-xs font-medium">Avg: {avg.toFixed(1)}/100</span>}
          {highest > 0 && <span className="px-2.5 py-0.5 rounded-full bg-green-50  text-green-700  text-xs font-medium">Highest: {highest}/100</span>}
          {passed > 0  && <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">Pass: {passed}/{complete}</span>}
        </div>
      </div>
      <ResultsScoreTable students={students} scores={scores} search={search} onScoreChange={onScoreChange} />
    </div>
  );
}