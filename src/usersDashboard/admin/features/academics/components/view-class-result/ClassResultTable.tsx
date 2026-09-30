import React, { useState } from "react";
import { Search } from "lucide-react";
import type { ClassResultResponse } from "../../types/classResult";
import AvatarInitials from "../../../users/components/shared/AvatarInitials";

const PER_PAGE = 10;
const HEADERS = ["#", "STUDENT NAME", "SUBJECTS OFFERED", "TOTAL", "AVERAGE", "GRADE", "POSITION"];

const ClassResultTable: React.FC<{ result: ClassResultResponse }> = ({ result }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const q = search.toLowerCase();
  const filtered = result.students.filter(
    (s) =>
      s.student.full_name.toLowerCase().includes(q) ||
      (s.student.admission_number ?? "").toLowerCase().includes(q)
  );
  const start = (page - 1) * PER_PAGE;
  const paged = filtered.slice(start, start + PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  // TODO: per-subject score columns once students[].subjects shape is confirmed

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <h3 className="section-title">Result Sheet</h3>
          <span className="px-2 py-0.5 rounded-full bg-bg-input text-xs font-medium text-brand-primary">
            {result.class.name} - {result.term.name}, {result.term.session}
          </span>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name or adm. no..."
            className="pl-9 pr-3 py-2 rounded-lg border border-border-line02 bg-bg-input text-sm w-64 focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-text-muted text-xs">
            {HEADERS.map((h) => <th key={h} className="px-6 py-3 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr>
              <td colSpan={HEADERS.length} className="py-12 text-center text-text-muted text-sm">
                No students found for this class and term
              </td>
            </tr>
          ) : (
            paged.map((s, i) => (
              <tr key={s.student.id} className="border-t border-border-line02 hover:bg-bg-soft/50">
                <td className="px-6 py-3.5 text-text-muted">{start + i + 1}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <AvatarInitials name={s.student.full_name} />
                    <div>
                      <p className="font-medium text-text-primary">{s.student.full_name}</p>
                      <p className="text-xs text-text-muted">{s.student.admission_number ?? "—"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-text-secondary">{s.summary.subjects_offered}</td>
                <td className="px-6 py-3.5 font-semibold text-text-primary">{s.summary.total}</td>
                <td className="px-6 py-3.5 text-text-secondary">{s.summary.average.toFixed(1)}</td>
                <td className="px-6 py-3.5 text-text-secondary">{s.summary.grade}</td>
                <td className="px-6 py-3.5 text-text-secondary">{s.summary.class_position ?? "—"}</td>
              </tr>
            ))
          )}
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

export default ClassResultTable;