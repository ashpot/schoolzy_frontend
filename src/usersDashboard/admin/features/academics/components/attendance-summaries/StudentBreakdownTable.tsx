import React, { useState } from "react";
import { Search } from "lucide-react";
import StudentAttendanceRow from "./StudentAttendanceRow";
import type { AttendanceSummaryData } from "../../types/attendanceSummary";

interface StudentBreakdownTableProps {
  data: AttendanceSummaryData;
}

const PER_PAGE = 8;

const StudentBreakdownTable: React.FC<StudentBreakdownTableProps> = ({ data }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = data.students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber.toLowerCase().includes(search.toLowerCase())
  );
  const start = (page - 1) * PER_PAGE;
  const paged = filtered.slice(start, start + PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <h3 className="section-title">Student Breakdown</h3>
          <span className="px-2 py-0.5 rounded-full bg-bg-input text-xs font-medium text-text-secondary">
            {data.students.length}
          </span>
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

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-text-muted text-xs">
            <th className="px-6 py-3 font-medium">#</th>
            <th className="px-6 py-3 font-medium">STUDENT NAME</th>
            <th className="px-6 py-3 font-medium">TOTAL PRESENT</th>
            <th className="px-6 py-3 font-medium">TOTAL ABSENT</th>
            <th className="px-6 py-3 font-medium">LATE ENTRIES</th>
            <th className="px-6 py-3 font-medium">ATTENDANCE %</th>
            <th className="px-6 py-3 font-medium">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((row, i) => (
            <StudentAttendanceRow key={row.id} row={row} rowNumber={start + i + 1} />
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

export default StudentBreakdownTable;