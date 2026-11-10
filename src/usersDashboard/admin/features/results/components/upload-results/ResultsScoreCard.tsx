import { Search } from "lucide-react";
import ResultsScoreTable from "./ResultsScoreTable";
import type { ScoreInputs, Scoresheet } from "../../types/uploadResults";
import { summarizeRow } from "../../utils/scoreSheetMath";

interface ResultsScoreCardProps {
  sheet: Scoresheet;
  inputs: ScoreInputs;
  original: ScoreInputs;
  search: string;
  onSearchChange: (value: string) => void;
  onChange: (studentId: number, colId: number, value: string) => void;
}

export default function ResultsScoreCard({ sheet, inputs, original, search, onSearchChange, onChange }: ResultsScoreCardProps) {
  const summaries = sheet.rows.map((r) => summarizeRow(sheet.columns, inputs[String(r.studentId)]));
  const complete = summaries.filter((x) => x.filled === sheet.columns.length).length;

  // Stats only count fully entered students, so partial totals never skew them
  const graded = summaries.filter((x) => x.grade !== null);
  const totals = graded.map((x) => x.total as number);
  const max = graded[0]?.max;
  const avg = totals.length ? totals.reduce((a, b) => a + b, 0) / totals.length : 0;
  const highest = totals.length ? Math.max(...totals) : 0;
  const passed = graded.filter((x) => x.grade !== "F").length;
  const pill = "px-2.5 py-0.5 rounded-full text-xs font-medium";

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="p-5 border-b border-border-line02 space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="section-title">{sheet.subject} — Results</h2>
              <span className={`${pill} bg-blue-50 text-blue-700 font-semibold`}>{sheet.rows.length} students</span>
            </div>
            <p className="text-xs text-text-muted mt-1">{sheet.classGroup} · {sheet.term} · {sheet.session}</p>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-44 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-medium text-text-secondary">{complete}/{sheet.rows.length} complete</span>
          {graded.length > 0 && max != null && (
            <>
              <span className={`${pill} bg-blue-50 text-blue-700`}>Avg: {avg.toFixed(1)}/{max}</span>
              <span className={`${pill} bg-green-50 text-green-700`}>Highest: {highest}/{max}</span>
              <span className={`${pill} bg-purple-50 text-purple-700`}>Pass: {passed}/{graded.length}</span>
            </>
          )}
        </div>
      </div>
      <ResultsScoreTable sheet={sheet} inputs={inputs} original={original} search={search} onChange={onChange} />
    </div>
  );
}