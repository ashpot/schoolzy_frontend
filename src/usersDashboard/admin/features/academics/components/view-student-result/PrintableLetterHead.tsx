import React from "react";
import { BookOpen } from "lucide-react";
import type { SchoolProfile } from "../../types/studentResult";

const PrintableLetterhead: React.FC<{ school?: SchoolProfile }> = ({ school }) => {
  const contact = [school?.phone && `Tel: ${school.phone}`, school?.email && `Email: ${school.email}`]
    .filter(Boolean).join(" | ");

  return (
    <div className="flex flex-col items-center text-center pb-5 border-b-2 border-brand-primary print-avoid-break">
      {school?.logo ? (
        <img src={school.logo} alt="" className="h-20 w-20 object-contain" />
      ) : (
        <div className="h-20 w-20 rounded-full bg-blue-50 border-2 border-brand-primary flex-center">
          <BookOpen size={32} className="text-brand-primary" />
        </div>
      )}
      <h1 className="text-2xl font-bold tracking-wide text-text-primary mt-3 uppercase">{school?.name ?? "School"}</h1>
      {school?.address && <p className="text-sm text-text-secondary mt-1">{school.address}</p>}
      {contact && <p className="text-xs text-text-muted mt-0.5">{contact}</p>}
      {school?.motto && (
        <p className="mt-3 px-4 py-1 rounded-full bg-blue-50 text-brand-primary text-xs italic">“{school.motto}”</p>
      )}
      <h2 className="text-base font-semibold tracking-widest text-text-primary mt-4">STUDENT ACADEMIC REPORT</h2>
    </div>
  );
};

export default PrintableLetterhead;