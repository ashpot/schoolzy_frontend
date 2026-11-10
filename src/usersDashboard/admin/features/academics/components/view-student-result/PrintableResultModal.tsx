import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Printer, X } from "lucide-react";
import { modalVariant } from "@/usersDashboard/admin/features/users/animations/variants";
import { useSchoolProfile } from "../../hooks/useStudentResult";
import type { PsychomotiveScore, ResultComments, StudentResult } from "../../types/studentResult";
import PrintableSheet from "./PrintableSheet";

interface Props {
  isOpen: boolean;
  result: StudentResult;
  psychomotive: PsychomotiveScore[];
  comments: ResultComments;
  onClose: () => void;
}

// Rendered in a portal on <body> so the print CSS can hide the rest of the app
// and let the sheet flow across pages (this is what fixes Ctrl+P).
const PrintableResultModal: React.FC<Props> = ({ isOpen, result, psychomotive, comments, onClose }) => {
  const { data: school } = useSchoolProfile(isOpen);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="print-root fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="print-hide fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}
          />
          <motion.div
            variants={modalVariant} initial="hidden" animate="show" exit="exit"
            className="print-sheet relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-4"
          >
            <div className="print-hide flex items-center justify-between px-6 py-4 border-b border-border-line02 sticky top-0 bg-white rounded-t-2xl z-10">
              <div className="flex items-center gap-2 text-text-primary font-semibold">
                <Eye size={18} className="text-brand-primary" /> Printable Format Preview
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-hover transition-colors">
                  <Printer size={15} /> Print
                </button>
                <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
              </div>
            </div>
            <PrintableSheet result={result} school={school} psychomotive={psychomotive} comments={comments} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PrintableResultModal;