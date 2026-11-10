import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Save, Search } from "lucide-react";
import Button from "@/shared/ui/Button";
import { TablePagination } from "@/usersDashboard/admin/features/learning/components/shared/TablePagination";
import ScoreEditRow from "./ScoreEditRow";
import type { ScoreEditor } from "../../hooks/useScoreEditor";
import { staggerContainer } from "@/shared/utils/animations";

const PER_PAGE = 8;
const COLUMNS = ["#", "Date Uploaded", "Admission No.", "Student", "Added By", "Score", "Status", "Save"];

interface ScoresTableProps {
  editor: ScoreEditor;
  max: number | null;
}

export default function ScoresTable({ editor, max }: ScoresTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const q = search.trim().toLowerCase();
  const filtered = editor.rows.filter(
    (r) => !q || r.fullName.toLowerCase().includes(q) || r.admissionNumber.toLowerCase().includes(q)
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const rows = filtered.slice(start, start + PER_PAGE);

  const status = editor.error ? (
    <span className="text-danger">{editor.error}</span>
  ) : editor.errorCount > 0 ? (
    <span className="text-danger">Fix {editor.errorCount} invalid {editor.errorCount === 1 ? "score" : "scores"} to save</span>
  ) : editor.dirtyCount > 0 ? (
    <span>{editor.dirtyCount} unsaved {editor.dirtyCount === 1 ? "change" : "changes"}</span>
  ) : (
    <span>No changes</span>
  );

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h3 className="section-title">Scores</h3>
          <span className="px-2 py-0.5 rounded-full bg-bg-input text-xs font-medium text-text-secondary">{editor.rows.length}</span>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search student..."
            className="pl-9 pr-3 py-2 rounded-lg border border-border-line02 bg-bg-input text-sm w-56 focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="py-12 text-center text-sm text-text-muted">No students match your search</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-line02">
                {COLUMNS.map((c) => (
                  <th key={c} className="px-4 first:px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide text-left whitespace-nowrap">{c}</th>
                ))}
              </tr>
            </thead>
            <motion.tbody key={current} variants={staggerContainer} initial="hidden" animate="show">
              {rows.map((r, i) => (
                <ScoreEditRow key={r.id} row={r} number={start + i + 1} max={max}
                  saving={editor.savingId === r.id} locked={editor.savingAll}
                  onChange={editor.setDraft} onSave={editor.saveRow} />
              ))}
            </motion.tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && (
        <TablePagination currentPage={current} totalPages={totalPages} startIndex={start + 1}
          endIndex={Math.min(start + PER_PAGE, filtered.length)} totalItems={filtered.length}
          itemLabel="scores" onPageChange={setPage} />
      )}

      <div className="px-6 py-4 bg-gray-50 border-t border-border-line02 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-text-secondary">{status}</p>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" size="sm" leftIcon={<RotateCcw size={14} />}
            onClick={editor.resetAll} disabled={editor.dirtyCount === 0 || editor.savingAll}>Reset</Button>
          <Button type="button" variant="primary" size="sm" leftIcon={<Save size={14} />}
            isLoading={editor.savingAll} disabled={editor.dirtyCount === 0 || editor.errorCount > 0}
            onClick={editor.saveAll}>Save All</Button>
        </div>
      </div>
    </div>
  );
}