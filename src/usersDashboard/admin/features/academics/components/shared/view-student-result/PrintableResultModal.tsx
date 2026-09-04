import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Printer, X } from "lucide-react";
import { gradeStyles } from "@/shared/utils/gradeUtils";
import PrintableResultLetterhead from "./PrintableResultLetterhead";
import PrintableGradeScale from "./PrintableGradeScale";
import type { StudentResultData } from "../../../types/studentResult";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";

interface PrintableResultModalProps {
  isOpen: boolean;
  result: StudentResultData;
  onClose: () => void;
}

const PrintableResultModal: React.FC<PrintableResultModalProps> = ({ isOpen, result, onClose }) => {
  const totals = result.subjects.reduce(
    (acc, s) => ({
      assignment: acc.assignment + s.assignment,
      test: acc.test + s.test,
      exam: acc.exam + s.exam,
      total: acc.total + s.total,
    }),
    { assignment: 0, test: 0, exam: 0, total: 0 }
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div variants={modalVariant} initial="hidden" animate="show" exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2 text-text-primary font-semibold">
                <Eye size={18} className="text-brand-primary" /> Printable Format Preview
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-hover transition-colors"
                >
                  <Printer size={15} /> Print
                </button>
                <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
              </div>
            </div>

            <div className="px-8 py-8 flex flex-col gap-6">
              <PrintableResultLetterhead />

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 bg-bg-input rounded-xl p-5 text-sm">
                <p><span className="text-text-muted">Student Name: </span><span className="font-medium">{result.fullName}</span></p>
                <p><span className="text-text-muted">Admission No.: </span><span className="font-medium">{result.admissionNumber}</span></p>
                <p><span className="text-text-muted">Class: </span><span className="font-medium">{result.className}</span></p>
                <p><span className="text-text-muted">Section: </span><span className="font-medium">{result.section}</span></p>
                <p><span className="text-text-muted">Term: </span><span className="font-medium">{result.term}</span></p>
                <p><span className="text-text-muted">Session: </span><span className="font-medium">{result.session}</span></p>
                <p><span className="text-text-muted">Position in Class: </span><span className="font-medium">{result.positionInClass} out of {result.classSize}</span></p>
                <p><span className="text-text-muted">Overall Grade: </span><span className="font-medium">{result.overallGrade}2 — Very Good</span></p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-3 tracking-wide">ACADEMIC PERFORMANCE</h4>
                <table className="w-full text-sm border border-border-line02 rounded-lg overflow-hidden">
                  <thead className="bg-text-nav text-white">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">#</th>
                      <th className="px-3 py-2 text-left font-medium">Subject</th>
                      <th className="px-3 py-2 text-left font-medium">Asgn /10</th>
                      <th className="px-3 py-2 text-left font-medium">Test /20</th>
                      <th className="px-3 py-2 text-left font-medium">Exam /70</th>
                      <th className="px-3 py-2 text-left font-medium">Total /100</th>
                      <th className="px-3 py-2 text-left font-medium">Grade</th>
                      <th className="px-3 py-2 text-left font-medium">Subject Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.subjects.map((s, i) => (
                      <tr key={s.id} className="border-t border-border-line02">
                        <td className="px-3 py-2">{i + 1}</td>
                        <td className="px-3 py-2 font-medium">{s.subject}</td>
                        <td className="px-3 py-2">{s.assignment}</td>
                        <td className="px-3 py-2">{s.test}</td>
                        <td className="px-3 py-2">{s.exam}</td>
                        <td className="px-3 py-2 font-semibold">{s.total}</td>
                        <td className={`px-3 py-2 font-semibold ${gradeStyles[s.grade].split(" ").find((c) => c.startsWith("text-"))}`}>
                          {s.grade}{s.total >= 75 ? "1" : "4"}
                        </td>
                        <td className="px-3 py-2">{s.subjectPosition}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-border-line02 bg-blue-50 font-semibold">
                      <td className="px-3 py-2" colSpan={2}>Summary</td>
                      <td className="px-3 py-2">{totals.assignment}</td>
                      <td className="px-3 py-2">{totals.test}</td>
                      <td className="px-3 py-2">{totals.exam}</td>
                      <td className="px-3 py-2">{totals.total}</td>
                      <td className="px-3 py-2 text-brand-primary" colSpan={2}>Avg: {result.averageScore}% · {result.overallGrade}2</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3 tracking-wide">PSYCHOMOTIVE EVALUATION</h4>
                  <table className="w-full text-sm border border-border-line02 rounded-lg overflow-hidden">
                    <thead className="bg-text-nav text-white">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Skill</th>
                        <th className="px-3 py-2 text-left font-medium">Score /5</th>
                        <th className="px-3 py-2 text-left font-medium">Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.psychomotive.map((p) => (
                        <tr key={p.skill} className="border-t border-border-line02">
                          <td className="px-3 py-2">{p.skill}</td>
                          <td className="px-3 py-2 font-semibold text-brand-primary">{p.score}</td>
                          <td className="px-3 py-2">{p.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3 tracking-wide">ATTENDANCE SUMMARY</h4>
                  <div className="border border-border-line02 rounded-lg divide-y divide-border-line02 text-sm">
                    {[
                      ["Times School Opened", result.attendance.timesSchoolOpened],
                      ["Times Present", result.attendance.timesPresent],
                      ["Times Early", result.attendance.timesEarly],
                      ["Times Late", result.attendance.timesLate],
                      ["Times Absent", result.attendance.timesAbsent],
                    ].map(([label, value]) => (
                      <div key={label as string} className="flex items-center justify-between px-3 py-2.5">
                        <span className="text-text-secondary">{label}</span>
                        <span className="font-semibold text-text-primary">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-border-line02 rounded-xl p-5">
                <h4 className="text-xs font-semibold text-text-muted tracking-wide mb-2">CLASS TEACHER'S COMMENT</h4>
                <p className="text-sm italic text-text-secondary min-h-6">{result.comments.classTeacherComment || "No comment added."}</p>
                <div className="flex items-center justify-between mt-6 pt-3 border-t border-border-line02">
                  <span className="text-xs text-text-muted">Class Teacher's Signature</span>
                  <div className="w-40 border-b border-border-line02" />
                </div>
              </div>

              <div className="border border-border-line02 rounded-xl p-5">
                <h4 className="text-xs font-semibold text-text-muted tracking-wide mb-2">PRINCIPAL'S COMMENT</h4>
                <p className="text-sm italic text-text-secondary min-h-6">{result.comments.principalComment || "No comment added."}</p>
                <div className="flex items-center justify-between mt-6 pt-3 border-t border-border-line02">
                  <span className="text-xs text-text-muted">Principal's Signature</span>
                  <div className="w-40 border-b border-border-line02" />
                </div>
              </div>

              <PrintableGradeScale />

              <p className="text-xs text-text-muted text-center pt-2">
                Generated on {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} · Greenfield Academy Official Result Sheet
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrintableResultModal;