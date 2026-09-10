import React from "react";
import { Printer, Download, Calendar, Hash, BookOpen } from "lucide-react";
import type { StudentResultData } from "../../types/studentResult";

interface StudentResultHeaderProps {
  result: StudentResultData;
  onPrint: () => void;
}

const StudentResultHeader: React.FC<StudentResultHeaderProps> = ({ result, onPrint }) => (
  <div className="bg-linear-to-r from-brand-primary to-brand-hover rounded-2xl px-6 py-5 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-white/20 overflow-hidden shrink-0" />
      <div>
        <h2 className="text-white text-lg font-semibold">{result.fullName}</h2>
        <div className="flex items-center gap-3 text-white/80 text-sm mt-1">
          <span className="flex items-center gap-1"><Hash size={13} /> {result.admissionNumber}</span>
          <span className="flex items-center gap-1"><BookOpen size={13} /> {result.className}</span>
          <span className="flex items-center gap-1"><Calendar size={13} /> {result.term} · {result.session}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onPrint}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 text-white text-sm font-medium hover:bg-white/25 transition-colors"
      >
        <Printer size={15} /> Print
      </button>
      <button
        onClick={() => {
          // TODO: Implement PDF download
          console.log("Downloading result for", result.studentId);
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-brand-primary text-sm font-medium hover:bg-white/90 transition-colors"
      >
        <Download size={15} /> Download
      </button>
    </div>
  </div>
);

export default StudentResultHeader;