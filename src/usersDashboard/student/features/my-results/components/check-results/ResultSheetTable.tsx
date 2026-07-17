import { motion } from "framer-motion";
import { Printer, Download } from "lucide-react";
// import { staggerContainer, rowVariant } from "../../animations/variants";
import { gradeStyles } from "../../utils/gradeUtils";
import type { ResultSheet } from "../../types";
import { staggerContainer } from "@/shared/utils/animations";
import { rowVariant } from "../../../dashboard/animations/variants";

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-text-muted uppercase">{label}</p>
      <p className="font-medium text-text-primary">{value}</p>
    </div>
  );
}

export default function ResultSheetTable({ result }: { result: ResultSheet }) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="section-title">Result Sheet</h3>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm rounded-lg border border-border-line02 flex items-center gap-1.5 hover:bg-bg-input">
            <Printer size={14} /> Print
          </button>
          <button className="px-3 py-2 text-sm rounded-lg bg-brand-primary text-white flex items-center gap-1.5 hover:bg-brand-hover">
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-body-small">
        <Info label="Student Name" value={result.studentName} />
        <Info label="Admission Number" value={result.admissionNumber} />
        <Info label="Class" value={result.className} />
        <Info label="Session" value={result.session} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-text-muted uppercase border-b border-border-line02">
              <th className="py-2">Subject</th>
              <th className="py-2">Assessment</th>
              <th className="py-2">Exam</th>
              <th className="py-2">Total</th>
              <th className="py-2">Grade</th>
              <th className="py-2">Remark</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {result.subjects.map((s) => (
              <motion.tr key={s.id} variants={rowVariant} className="border-b border-border-line02 last:border-0">
                <td className="py-3 font-medium text-text-primary">{s.subject}</td>
                <td className="py-3 text-text-secondary">{s.assessmentScore}/30</td>
                <td className="py-3 text-text-secondary">{s.examScore}/70</td>
                <td className="py-3 font-semibold">{s.totalScore}/100</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${gradeStyles[s.grade]}`}>{s.grade}</span>
                </td>
                <td className="py-3 text-text-secondary">{s.remark}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-border-line02">
        <div className="flex gap-8 text-body-small">
          <Info label="Class Position" value={`${result.classPosition}/${result.classSize}`} />
          <Info label="Overall Average" value={`${result.overallAverage}/100`} />
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 max-w-sm">
          <p className="text-xs text-amber-700 font-medium mb-0.5">Overall Remark</p>
          <p className="text-body-small text-amber-800">{result.overallRemark}</p>
        </div>
      </div>
    </div>
  );
}