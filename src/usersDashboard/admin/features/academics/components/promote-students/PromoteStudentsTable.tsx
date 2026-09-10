import React, { useState } from "react";
import Button from "@/shared/ui/Button";
import PromoteStatusTabs, { type StatusFilter } from "./PromoteStatusTabs";
import PromoteStudentRow from "./PromoteStudentRow";
import type { PromoteStudentRow as RowType } from "../../types/promoteStudents";

interface PromoteStudentsTableProps {
  className: string;
  promoteToOptions: { value: string; label: string }[];
  rows: RowType[];
  onPromote: (id: string) => void;
  onRepeat: (id: string) => void;
  onUndo: (id: string) => void;
  onPromoteSelected: (ids: string[]) => void;
  isPending: boolean;
}

const PER_PAGE = 10;

const PromoteStudentsTable: React.FC<PromoteStudentsTableProps> = ({
  className, promoteToOptions, rows, onPromote, onRepeat, onUndo, onPromoteSelected, isPending,
}) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [promoteTo, setPromoteTo] = useState(promoteToOptions[0]?.value ?? "");
  const [ignoreWarning, setIgnoreWarning] = useState(false);

  const counts = {
    all: rows.length,
    pending: rows.filter((r) => r.status === "pending").length,
    promoted: rows.filter((r) => r.status === "promoted").length,
    repeated: rows.filter((r) => r.status === "repeated").length,
  };

  const filtered = statusFilter === "all" ? rows : rows.filter((r) => r.status === statusFilter);
  const start = (page - 1) * PER_PAGE;
  const paged = filtered.slice(start, start + PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const toggleRow = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setChecked((prev) => (prev.size === paged.length ? new Set() : new Set(paged.map((r) => r.id))));
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <h3 className="section-title">Promote Students from {className}</h3>
        <Button
          variant="primary"
          disabled={checked.size === 0}
          isLoading={isPending}
          onClick={() => { onPromoteSelected(Array.from(checked)); setChecked(new Set()); }}
        >
          Promote Selected
        </Button>
      </div>

      <div className="flex items-center gap-6 px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-secondary">Promote to</label>
          <select value={promoteTo} onChange={(e) => setPromoteTo(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border-line02 bg-bg-input text-sm focus:outline-none">
            {promoteToOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-secondary">Class Group</label>
          <select className="px-3 py-2 rounded-lg border border-border-line02 bg-bg-input text-sm focus:outline-none">
            <option>Select Group</option>
          </select>
        </div>
        <div className="ml-auto">
          <PromoteStatusTabs active={statusFilter} counts={counts} onChange={(f) => { setStatusFilter(f); setPage(1); }} />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-text-muted text-xs">
            <th className="px-6 py-3 font-medium">
              <input type="checkbox" checked={checked.size > 0 && checked.size === paged.length} onChange={toggleAll}
                className="w-4 h-4 rounded border-border-line02 text-brand-primary" />
            </th>
            <th className="px-6 py-3 font-medium">STUDENT NAME</th>
            <th className="px-6 py-3 font-medium">CURRENT CLASS</th>
            <th className="px-6 py-3 font-medium">NEXT CLASS</th>
            <th className="px-6 py-3 font-medium">STATUS</th>
            <th className="px-6 py-3 font-medium">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((row) => (
            <PromoteStudentRow
              key={row.id}
              row={row}
              isChecked={checked.has(row.id)}
              onToggle={toggleRow}
              onPromote={onPromote}
              onRepeat={onRepeat}
              onUndo={onUndo}
              isPending={isPending}
            />
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

      <label className="flex items-center gap-2 px-6 py-4 border-t border-border-line02 text-sm text-text-secondary cursor-pointer">
        <input type="checkbox" checked={ignoreWarning} onChange={(e) => setIgnoreWarning(e.target.checked)}
          className="w-4 h-4 rounded border-border-line02 text-brand-primary" />
        Ignore non-empty class group warning
      </label>
    </div>
  );
};

export default PromoteStudentsTable;