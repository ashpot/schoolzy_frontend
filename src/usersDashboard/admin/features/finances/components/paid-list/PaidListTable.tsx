import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Search, Download, CheckCircle, AlertCircle } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { formatNaira, formatDisplayDate } from "../../utils/feeUtils";
import { avatarColor, getInitials } from "../../data/mockData";
import SectionBadge from "../shared/SectionBadge";
import Button from "@/shared/ui/Button";
import type { PaidListEntry } from "../../types";

interface PaidListTableProps {
  entries: PaidListEntry[];
}

const PAGE_SIZE = 8;

export default function PaidListTable({ entries }: PaidListTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);

  const filtered = useMemo(
    () => entries.filter((e) =>
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.admissionNo.toLowerCase().includes(search.toLowerCase())
    ),
    [entries, search]
  );

  const pageTotal       = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).reduce((s, e) => s + e.amountPaid, 0), [filtered, page]);
  const pageOutstanding = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).reduce((s, e) => s + Math.max(0, e.totalFeeAmount - e.amountPaid), 0), [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const start = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(page * PAGE_SIZE, filtered.length);

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-brand-primary" />
          <span className="font-semibold text-text-primary">Paid Students</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            {entries.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search students…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-3 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary placeholder:text-text-muted outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-40 transition-all"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={13} />}
            onClick={() => {}}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-line02 bg-gray-50/60">
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Student Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Class</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Amount Paid</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Date Paid</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Balance</th>
            </tr>
          </thead>
          <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
            {paginated.map((entry, idx) => {
              const balance = entry.totalFeeAmount - entry.amountPaid;
              const isPaid  = balance <= 0;
              return (
                <motion.tr
                  key={entry.studentId + idx}
                  variants={rowVariant}
                  className="border-b border-border-line02 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-text-muted font-medium">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex-center text-xs font-bold shrink-0 ${avatarColor(entry.studentName)}`}>
                        {getInitials(entry.studentName)}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{entry.studentName}</p>
                        <p className="text-xs text-text-muted">{entry.admissionNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">
                        {entry.studentClass}
                      </span>
                      <SectionBadge label={entry.sectionLabel} size="sm" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-green-600">{formatNaira(entry.amountPaid)}</p>
                    <p className="text-xs text-text-muted mt-0.5">of {formatNaira(entry.totalFeeAmount)}</p>
                  </td>
                  <td className="px-4 py-4 text-text-secondary text-sm">
                    {formatDisplayDate(entry.datePaid)}
                  </td>
                  <td className="px-4 py-4">
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                        <CheckCircle size={11} /> Fully Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                        <AlertCircle size={11} /> {formatNaira(balance)}
                      </span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>

          {/* Page total row */}
          {filtered.length > 0 && (
            <tfoot>
              <tr className="border-t border-border-line02 bg-gray-50/60">
                <td colSpan={2} className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Page total ({paginated.length} students)
                </td>
                <td />
                <td className="px-4 py-3 font-bold text-green-600">{formatNaira(pageTotal)}</td>
                <td />
                <td className="px-4 py-3 font-semibold text-red-500 text-sm">{pageOutstanding > 0 ? formatNaira(pageOutstanding) : ""}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing <span className="font-semibold text-text-primary">{start}–{end}</span> of{" "}
          <span className="font-semibold text-text-primary">{filtered.length}</span> students
        </p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)}
              className={`w-7 h-7 flex-center rounded-lg text-sm font-medium transition-all
                ${n === page ? "bg-brand-primary text-white" : "border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">›</button>
        </div>
      </div>
    </div>
  );
}