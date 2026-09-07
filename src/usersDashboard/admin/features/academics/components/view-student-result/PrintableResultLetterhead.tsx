import React from "react";
import { BookOpen } from "lucide-react";

const PrintableResultLetterhead: React.FC = () => (
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-blue-50 flex-center mb-4">
      <BookOpen size={26} className="text-brand-primary" />
    </div>
    {/* TODO: Replace with real school profile data from GET /schools/settings/ */}
    <h1 className="text-2xl font-bold text-text-primary tracking-tight">GREENFIELD ACADEMY</h1>
    <p className="text-sm text-text-secondary mt-1">12 Education Boulevard, Victoria Island, Lagos State</p>
    <p className="text-sm text-text-secondary">Tel: +234 801 234 5678 | Email: info@greenfieldacademy.edu.ng</p>
    <p className="text-sm italic text-brand-primary bg-blue-50 px-4 py-1.5 rounded-full mt-3">
      "Excellence in Learning, Character in Living"
    </p>
    <h2 className="text-lg font-semibold text-text-primary mt-4 tracking-wide">STUDENT ACADEMIC REPORT</h2>
    <div className="w-full h-0.5 bg-brand-primary mt-3" />
  </div>
);

export default PrintableResultLetterhead;