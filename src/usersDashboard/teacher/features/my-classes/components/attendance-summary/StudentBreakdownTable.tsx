import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { computeStatus, statusStyles } from "../../utils/attendanceStatus";
import { attendanceBarColor } from "../../utils/avatar";
import type { StudentAttendance } from "../../types";

const PAGE_SIZE = 8;

export default function StudentBreakdownTable({ students }: { students: StudentAttendance[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <h2 className="section-title">Student Breakdown</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-medium">
            {filtered.length}
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search student..."
            className="pl-8 pr-3 py-2 text-sm rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-56"
          />
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-t border-border-line02 text-xs text-text-muted uppercase tracking-wide">
            <th className="text-left font-medium px-6 py-3">#</th>
            <th className="text-left font-medium px-6 py-3">Student Name</th>
            <th className="text-left font-medium px-6 py-3">Total Present</th>
            <th className="text-left font-medium px-6 py-3">Total Absent</th>
            <th className="text-left font-medium px-6 py-3">Late Entries</th>
            <th className="text-left font-medium px-6 py-3">Attendance %</th>
            <th className="text-left font-medium px-6 py-3">Status</th>
          </tr>
        </thead>
        <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
          {pageItems.map((s, i) => {
            const status = computeStatus(s.attendancePercent);
            return (
              <motion.tr key={s.id} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
                <td className="px-6 py-4 text-body-small text-text-muted">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td className="px-6 py-4">
                  <p className="text-body-small text-text-primary font-medium">{s.name}</p>
                  <p className="text-xs text-text-muted">{s.admissionNumber}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs">{s.totalPresent} days</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-red-50 text-danger text-xs">{s.totalAbsent} days</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-warning text-xs">{s.lateEntries} days</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 w-32">
                    <div className="flex-1 h-1.5 rounded-full bg-bg-input overflow-hidden">
                      <div className={`h-full rounded-full ${attendanceBarColor(s.attendancePercent)}`} style={{ width: `${s.attendancePercent}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-text-primary">{s.attendancePercent}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>{status}</span>
                </td>
              </motion.tr>
            );
          })}
        </motion.tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-2.5 py-1.5 rounded-lg text-text-muted hover:bg-bg-input disabled:opacity-40"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-medium ${
                p === page ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-bg-input"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-2.5 py-1.5 rounded-lg text-text-muted hover:bg-bg-input disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}