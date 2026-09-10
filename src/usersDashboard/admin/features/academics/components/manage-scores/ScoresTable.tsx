import React, { useState } from "react";
import { Search, Info } from "lucide-react";
import Button from "@/shared/ui/Button";
import ScoreRow from "./ScoreRow";
import type { ScoreRow as ScoreRowType } from "../../types/manageScores";

interface ScoresTableProps {
  rows: ScoreRowType[];
  onSaveRow: (id: string, score: number) => void;
  onSaveAll: () => void;
  isSavingRow: boolean;
  isSavingAll: boolean;
}

const PER_PAGE = 10;

const ScoresTable: React.FC<ScoresTableProps> = ({ rows, onSaveRow, onSaveAll, isSavingRow, isSavingAll }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = rows.filter((r) => r.fullName.toLowerCase().includes(search.toLowerCase()));
  const start = (page - 1) * PER_PAGE;
  const paged = filtered.slice(start, start + PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const savedCount = rows.filter((r) => r.status === "saved").length;

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <h3 className="section-title">Student Scores</h3>
          <span className="px-2 py-0.5 rounded-full bg-bg-input text-xs font-medium text-text-secondary">{rows.length}</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-warning text-xs font-medium">{savedCount}/{rows.length} saved</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search student..."
              className="pl-9 pr-3 py-2 rounded-lg border border-border-line02 bg-bg-input text-sm w-56 focus:outline-none focus:border-brand-primary"
            />
          </div>
          <Button variant="primary" onClick={onSaveAll} isLoading={isSavingAll}>Save All</Button>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-blue-50 px-6 py-3">
        <Info size={15} className="text-brand-primary shrink-0 mt-0.5" />
        <p className="text-body-small text-text-secondary">
          Scores are out of <span className="font-semibold">100</span> marks. Grade and remarks are calculated automatically. Click <span className="font-semibold">Save</span> per row or <span className="font-semibold">Save All</span> to commit all changes.
        </p>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-text-muted text-xs">
            <th className="px-6 py-3 font-medium">DATE UPLOADED</th>
            <th className="px-6 py-3 font-medium">TERM</th>
            <th className="px-6 py-3 font-medium">STUDENT NAME</th>
            <th className="px-6 py-3 font-medium">SUBJECT</th>
            <th className="px-6 py-3 font-medium">ASSESSMENT TYPE</th>
            <th className="px-6 py-3 font-medium">SCORE (/100)</th>
            <th className="px-6 py-3 font-medium">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((row) => (
            <ScoreRow key={row.id} row={row} onSave={onSaveRow} isSaving={isSavingRow} />
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-body-small text-text-secondary">
          Showing {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + PER_PAGE, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
            className="w-8 h-8 rounded-lg border border-border-line02 flex-center text-text-muted disabled:opacity-40">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${p === page ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-bg-soft"}`}>
              {p}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
            className="w-8 h-8 rounded-lg border border-border-line02 flex-center text-text-muted disabled:opacity-40">›</button>
        </div>
      </div>
    </div>
  );
};

export default ScoresTable;