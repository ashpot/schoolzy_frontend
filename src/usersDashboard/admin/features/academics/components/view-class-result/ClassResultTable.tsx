import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import type { ClassSheet } from "../../types/classResult";
import AvatarInitials from "../../../users/components/shared/AvatarInitials";
import { staggerContainer } from "@/landing/animations/variants";
import { rowVariant } from "../../../onboarding/animations/variants";

const PER_PAGE = 10;
const th = "px-5 py-3 font-medium uppercase whitespace-nowrap text-center";

const ClassResultTable: React.FC<{ sheet: ClassSheet }> = ({ sheet }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { columns, rows, meta } = sheet;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? rows.filter((r) => r.name.toLowerCase().includes(q) || r.admissionNo.toLowerCase().includes(q)) : rows;
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const paged = filtered.slice(start, start + PER_PAGE);
  const pageBtn = "w-8 h-8 rounded-lg border border-border-line02 flex-center text-text-muted disabled:opacity-40";

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between gap-3 flex-wrap px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="section-title">Result Sheet</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-xs font-medium text-brand-primary">
            {meta.className} - {meta.termName}, {meta.session}
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

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-max">
          <thead>
            <tr className="text-text-muted text-xs bg-bg-soft/60">
              <th className={`${th} text-left`}>#</th>
              <th className={`${th} text-left`}>Student Name</th>
              {columns.map((c) => <th key={c.key} className={th}>{c.name}</th>)}
              <th className={th}>Total Subjects</th>
              <th className={th}>Total Marks Obtainable</th>
              <th className={th}>Cumulative Total</th>
            </tr>
          </thead>
          <motion.tbody key={`${page}-${search}`} variants={staggerContainer} initial="hidden" animate="show">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={5 + columns.length} className="py-12 text-center text-text-muted text-sm">
                  No students found for this class and term
                </td>
              </tr>
            ) : (
              paged.map((r, i) => (
                <motion.tr key={r.id} variants={rowVariant} className="border-t border-border-line02 hover:bg-bg-soft/50">
                  <td className="px-5 py-4 text-text-muted">{start + i + 1}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      {r.photo
                        ? <img src={r.photo} alt="" className="h-9 w-9 rounded-full object-cover" />
                        : <AvatarInitials name={r.name} />}
                      <div>
                        <p className="font-medium text-text-primary capitalize whitespace-nowrap">{r.name}</p>
                        <p className="text-xs text-text-muted">{r.admissionNo || "—"}</p>
                      </div>
                    </div>
                  </td>
                  {columns.map((c) => (
                    <td key={c.key} className="px-5 py-4 text-center font-semibold text-text-primary">
                      {c.key in r.scores ? r.scores[c.key] : <span className="text-text-muted font-normal">—</span>}
                    </td>
                  ))}
                  <td className="px-5 py-4 text-center font-semibold">{r.subjectsOffered}</td>
                  <td className="px-5 py-4 text-center font-semibold">{r.marksObtainable}</td>
                  <td className="px-5 py-4 text-center font-semibold">{r.total}</td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-body-small text-text-secondary">
          Showing {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + PER_PAGE, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className={pageBtn}><ChevronLeft size={15} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${p === page ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-bg-soft"}`}>
              {p}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className={pageBtn}><ChevronRight size={15} /></button>
        </div>
      </div>
    </div>
  );
};

export default ClassResultTable;