import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Download } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { gradeStyles } from "../../utils/gradeUtils";
import { getInitials, avatarColor } from "../../utils/avatar";
import type { SubjectResultRow2 } from "../../types";

interface Props {
  rows: SubjectResultRow2[];
  subjectLabel: string;
}

export default function SubjectResultsTable({ rows, subjectLabel }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => rows.filter((r) => r.studentName.toLowerCase().includes(search.toLowerCase())),
    [rows, search]
  );

  const handleExport = () => {
    const header = ["Student", "Admission Number", "Subject", "Assessment", "Exam", "Total", "Grade", "Position", "Remark"];
    const lines = rows.map((r) => [r.studentName, r.admissionNo, subjectLabel, r.assessmentScore, r.examScore, r.totalScore, r.grade, r.position, r.remark].join(","));
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subjectLabel}-results.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <h3 className="section-title">Results</h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-bg-input text-text-secondary">{rows.length} students</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search student..." className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary" />
          </div>
          <button type="button" onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-brand-primary text-white hover:bg-brand-hover transition-colors">
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-text-muted uppercase text-left">
              <th className="px-6 py-3 font-medium">Student</th>
              <th className="px-2 py-3 font-medium">Admission Number</th>
              <th className="px-2 py-3 font-medium">Subject</th>
              <th className="px-2 py-3 font-medium">Assessment Score</th>
              <th className="px-2 py-3 font-medium">Exam Score</th>
              <th className="px-2 py-3 font-medium">Total Score</th>
              <th className="px-2 py-3 font-medium">Grade</th>
              <th className="px-2 py-3 font-medium">Position</th>
              <th className="px-6 py-3 font-medium">Remark</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {filtered.map((r) => (
              <motion.tr key={r.studentId} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`flex-center w-8 h-8 rounded-full text-xs font-semibold ${avatarColor(r.studentName)}`}>{getInitials(r.studentName)}</span>
                    <span className="font-medium text-text-primary">{r.studentName}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-text-secondary">{r.admissionNo}</td>
                <td className="px-2 py-3">
                  <span className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">{subjectLabel}</span>
                </td>
                <td className="px-2 py-3 text-text-secondary">{r.assessmentScore}</td>
                <td className="px-2 py-3 text-text-secondary">{r.examScore}</td>
                <td className="px-2 py-3 font-semibold">{r.totalScore}</td>
                <td className="px-2 py-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeStyles[r.grade]}`}>{r.grade}</span>
                </td>
                <td className="px-2 py-3 text-text-secondary">{r.position}{r.position === 1 ? "st" : r.position === 2 ? "nd" : r.position === 3 ? "rd" : "th"}</td>
                <td className="px-6 py-3 text-text-secondary">{r.remark}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}