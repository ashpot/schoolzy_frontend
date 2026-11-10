import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Printer, X } from "lucide-react";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";
import { useSchoolProfile } from "../../hooks/useStudentResult";
import type { ClassSheet } from "../../types/classResult";
import { formatLongDate, ordinal } from "../../utils/resultFormat";

interface Props { isOpen: boolean; sheet: ClassSheet; onClose: () => void }

const cell = "px-2.5 py-2 text-center";

// Portal + .print-root: same print pattern as the student result, plus landscape paper
const ClassPrintableModal: React.FC<Props> = ({ isOpen, sheet, onClose }) => {
  const { data: school } = useSchoolProfile(isOpen);
  const { meta, columns, rows, stats } = sheet;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="print-root print-landscape fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="print-hide fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div variants={modalVariant} initial="hidden" animate="show" exit="exit"
            className="print-sheet relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-4">
            <div className="print-hide flex items-center justify-between px-6 py-4 border-b border-border-line02 sticky top-0 bg-white rounded-t-2xl z-10">
              <div className="flex items-center gap-2 font-semibold text-text-primary">
                <Eye size={18} className="text-brand-primary" /> Printable Class Result
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-hover transition-colors">
                  <Printer size={15} /> Print
                </button>
                <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
              </div>
            </div>

            <div className="px-8 py-8 flex flex-col gap-5 text-text-primary">
              <div className="text-center pb-4 border-b-2 border-brand-primary">
                <h1 className="text-xl font-bold uppercase tracking-wide">{school?.name ?? "School"}</h1>
                <h2 className="text-sm font-semibold tracking-widest mt-1">CLASS RESULT SHEET</h2>
                <p className="text-sm text-text-secondary mt-1 capitalize">
                  {meta.className} · {meta.termName} · {meta.session} · {stats.students} students · Class average {Number(stats.classAverage.toFixed(1))}
                </p>
              </div>

              <table className="w-full text-xs border border-border-line02">
                <thead className="bg-text-nav text-white">
                  <tr>
                    <th className={`${cell} text-left`}>#</th>
                    <th className={`${cell} text-left`}>Student</th>
                    {columns.map((c) => <th key={c.key} className={cell}>{c.name}</th>)}
                    <th className={cell}>Subjects</th>
                    <th className={cell}>Obtainable</th>
                    <th className={cell}>Total</th>
                    <th className={cell}>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id} className="border-t border-border-line02">
                      <td className={`${cell} text-left`}>{i + 1}</td>
                      <td className={`${cell} text-left capitalize whitespace-nowrap`}>
                        {r.name}<span className="block text-text-muted">{r.admissionNo}</span>
                      </td>
                      {columns.map((c) => <td key={c.key} className={cell}>{c.key in r.scores ? r.scores[c.key] : "—"}</td>)}
                      <td className={cell}>{r.subjectsOffered}</td>
                      <td className={cell}>{r.marksObtainable}</td>
                      <td className={`${cell} font-semibold`}>{r.total}</td>
                      <td className={cell}>{ordinal(r.position)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-xs text-text-muted text-center pt-3 border-t border-border-line02">
                Generated on {formatLongDate()} · {school?.name ?? "School"}
                {!meta.published && " · PROVISIONAL (results not yet published)"}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ClassPrintableModal;