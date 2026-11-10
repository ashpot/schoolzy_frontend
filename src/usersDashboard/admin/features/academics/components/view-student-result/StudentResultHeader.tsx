import React from "react";
import { BookOpen, Calendar, Hash, Printer } from "lucide-react";
import type { StudentResult } from "../../types/studentResult";
import { getInitials } from "../../utils/resultFormat";

interface Props { result: StudentResult; onPrint: () => void }

const StudentResultHeader: React.FC<Props> = ({ result, onPrint }) => {
  const { student, term } = result;
  return (
    <div className="bg-linear-to-r from-brand-primary to-brand-hover rounded-2xl px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-white/20 overflow-hidden shrink-0 flex-center text-white font-semibold">
          {student.photo ? (
            <img src={student.photo} alt={student.fullName} className="h-full w-full object-cover" />
          ) : getInitials(student.fullName)}
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold capitalize">{student.fullName}</h2>
          <div className="flex items-center gap-3 flex-wrap text-white/80 text-sm mt-1">
            <span className="flex items-center gap-1"><Hash size={13} /> {student.admissionNo || "—"}</span>
            <span className="flex items-center gap-1 capitalize"><BookOpen size={13} /> {student.className || "—"}</span>
            <span className="flex items-center gap-1"><Calendar size={13} /> {term.name} · {term.session}</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onPrint}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-brand-primary text-sm font-medium hover:bg-white/90 transition-colors"
      >
        <Printer size={15} /> Print
      </button>
    </div>
  );
};

export default StudentResultHeader;