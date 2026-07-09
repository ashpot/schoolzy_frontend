import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import type { Subject } from "../../types";

const PAGE_SIZE = 5;

export default function SubjectsTable({ subjects }: { subjects: Subject[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => subjects.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [subjects, search]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-brand-primary" />
          <h3 className="section-title">My Subjects</h3>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs">
            {subjects.length}
          </span>
        </div>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search subject..."
          className="px-3 py-2 text-sm rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-text-muted uppercase border-b border-border-line02">
              <th className="py-3 px-6">S/N</th>
              <th className="py-3 px-6">Subject Name</th>
              <th className="py-3 px-6">Code</th>
              <th className="py-3 px-6">Elective</th>
            </tr>
          </thead>
          <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
            {pageItems.map((s, i) => (
              <motion.tr key={s.id} variants={rowVariant} className="border-b border-border-line02 last:border-0 hover:bg-gray-50/50">
                <td className="py-3 px-6 text-text-muted">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td className="py-3 px-6 font-medium text-text-primary">{s.name}</td>
                <td className="py-3 px-6">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs">{s.code}</span>
                </td>
                <td className="py-3 px-6">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-text-secondary text-xs">
                    {s.elective ? "Yes" : "No"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 text-body-small text-text-secondary">
        <span>
          Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
          {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-border-line02 disabled:opacity-40">
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)} className={`w-7 h-7 rounded-lg text-xs ${n === page ? "bg-brand-primary text-white" : "border border-border-line02 hover:bg-bg-input"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-border-line02 disabled:opacity-40">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}