import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/variants";
import type { ViewScore } from "../../types";
import ScoresTableHeader from "./ScoresTableHeader";
import ScoresTableRow   from "./ScoresTableRow";

interface Props { scores: ViewScore[]; }

const PAGE_SIZE = 10;
type SortKey    = "name" | "assignment" | "test" | "exam" | "total";

export default function ScoresTable({ scores }: Props) {
  const [search,      setSearch]      = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [sortKey,     setSortKey]     = useState<SortKey>("name");
  const [sortDir,     setSortDir]     = useState<"asc" | "desc">("asc");
  const [page,        setPage]        = useState(1);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const filtered = scores
    .filter((s) => {
      const q = search.toLowerCase();
      return (s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q) || s.grade.toLowerCase().includes(q))
        && (gradeFilter === "All" || s.grade === gradeFilter);
    })
    .sort((a, b) => {
      const av = sortKey === "name" ? a.name : a[sortKey];
      const bv = sortKey === "name" ? b.name : b[sortKey];
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const thBase = "py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hover:text-[var(--color-text-primary)] transition-colors";
  const si     = (k: SortKey) => sortKey === k ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <ScoresTableHeader search={search} gradeFilter={gradeFilter}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        onGradeChange={(v)  => { setGradeFilter(v); setPage(1); }} />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-border-line02">
              <th className="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">#</th>
              <th className={`${thBase} text-text-muted`} onClick={() => toggleSort("name")}>Student{si("name")}</th>
              <th className={`${thBase} text-purple-500`}                onClick={() => toggleSort("assignment")}>Assignment /30{si("assignment")}</th>
              <th className={`${thBase} text-blue-500`}                  onClick={() => toggleSort("test")}>Test /20{si("test")}</th>
              <th className={`${thBase} text-amber-500`}                 onClick={() => toggleSort("exam")}>Exam /50{si("exam")}</th>
              <th className={`${thBase} text-text-muted`} onClick={() => toggleSort("total")}>Total /100{si("total")}</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Grade</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show" key={page}>
            {paginated.map((s, i) => (
              <ScoresTableRow key={s.studentId} index={(page - 1) * PAGE_SIZE + i} score={s} />
            ))}
          </motion.tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} students
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="w-8 h-8 flex-center rounded-lg text-sm hover:bg-gray-100 disabled:opacity-30 transition-colors">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 flex-center rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-brand-primary text-white" : "hover:bg-gray-100 text-text-secondary"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-8 h-8 flex-center rounded-lg text-sm hover:bg-gray-100 disabled:opacity-30 transition-colors">›</button>
          </div>
        )}
      </div>
    </div>
  );
}