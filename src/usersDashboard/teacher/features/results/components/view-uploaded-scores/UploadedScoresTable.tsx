import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, CheckCircle2 } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { gradeStyles } from "../../utils/gradeUtils";
import { getInitials, avatarColor } from "../../utils/avatar";
import type { UploadedScoreRow } from "../../types";

interface Props {
  rows: UploadedScoreRow[];
}

type SortKey = "total" | "grade" | null;

export default function UploadedScoresTable({ rows }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let data = rows.filter((r) => r.studentName.toLowerCase().includes(search.toLowerCase()));
    if (sortKey) {
      data = [...data].sort((a, b) => {
        const av = sortKey === "total" ? a.total : a.grade;
        const bv = sortKey === "total" ? b.total : b.grade;
        return sortAsc ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
      });
    }
    return data;
  }, [rows, search, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const totals = rows.map((r) => r.total);
  const avg = totals.length ? (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1) : "0.0";
  const highest = totals.length ? Math.max(...totals) : 0;
  const lowest = totals.length ? Math.min(...totals) : 0;

  const handleExport = () => {
    const header = ["Student", "Admission No", "Assignment", "Test", "Exam", "Total", "Grade", "Status"];
    const lines = rows.map((r) => [r.studentName, r.admissionNo, r.assignment, r.test, r.exam, r.total, r.grade, r.status].join(","));
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uploaded-scores.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-border-line02">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary" />
        </div>
        <button type="button" onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-border-line02 hover:border-brand-primary hover:text-brand-primary transition-colors">
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-text-muted uppercase text-left">
              <th className="px-6 py-3 font-medium">#</th>
              <th className="px-2 py-3 font-medium">Student</th>
              <th className="px-2 py-3 font-medium">Admission No</th>
              <th className="px-2 py-3 font-medium">Assignment</th>
              <th className="px-2 py-3 font-medium">Test</th>
              <th className="px-2 py-3 font-medium">Exam</th>
              <th className="px-2 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort("total")}>Total ↕</th>
              <th className="px-2 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort("grade")}>Grade ↕</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {filtered.map((r, i) => (
              <motion.tr key={r.studentId} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
                <td className="px-6 py-3 text-text-muted">{i + 1}</td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`flex-center w-8 h-8 rounded-full text-xs font-semibold ${avatarColor(r.studentName)}`}>{getInitials(r.studentName)}</span>
                    <span className="font-medium text-text-primary">{r.studentName}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-text-secondary">{r.admissionNo}</td>
                <td className="px-2 py-3 text-text-secondary">{r.assignment}</td>
                <td className="px-2 py-3 text-text-secondary">{r.test}</td>
                <td className="px-2 py-3 text-text-secondary">{r.exam}</td>
                <td className="px-2 py-3 font-semibold">{r.total}</td>
                <td className="px-2 py-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeStyles[r.grade]}`}>{r.grade}</span>
                </td>
                <td className="px-6 py-3">
                  <span className="flex items-center gap-1 text-xs font-medium text-success">
                    <CheckCircle2 size={13} /> {r.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-4 px-6 py-3 border-t border-border-line02 text-xs text-text-secondary">
        <span>Class Average: <span className="font-semibold text-text-primary">{avg}</span></span>
        <span>Highest Score: <span className="font-semibold text-success">{highest}</span></span>
        <span>Lowest Score: <span className="font-semibold text-danger">{lowest}</span></span>
        <span>Showing: <span className="font-semibold text-text-primary">{filtered.length}</span> of {rows.length} students</span>
      </div>
    </div>
  );
}