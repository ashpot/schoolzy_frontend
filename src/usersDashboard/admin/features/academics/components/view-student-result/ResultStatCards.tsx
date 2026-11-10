import React from "react";
import { Award, BookOpen, Hash, TrendingUp } from "lucide-react";
import type { StudentResult } from "../../types/studentResult";
import { fmt, ordinal } from "../../utils/resultFormat";

const ResultStatCards: React.FC<{ result: StudentResult }> = ({ result }) => {
  const { summary } = result;
  const position = summary.position === null
    ? "—"
    : `${ordinal(summary.position)}${summary.studentsCount ? ` / ${summary.studentsCount}` : ""}`;

  const cards = [
    { icon: TrendingUp, value: summary.average === null ? "—" : `${fmt(summary.average)}%`, label: "Average Score", color: "bg-blue-50 text-brand-primary" },
    { icon: Award, value: summary.grade || "—", label: "Overall Grade", color: "bg-blue-50 text-brand-primary" },
    { icon: Hash, value: position, label: "Class Position", color: "bg-green-50 text-success" },
    { icon: BookOpen, value: String(summary.subjectsOffered), label: "Subjects Offered", color: "bg-amber-50 text-warning" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-2xl card-shadow p-5 flex flex-col items-center text-center">
          <div className={`w-11 h-11 rounded-xl flex-center mb-3 ${c.color}`}>
            <c.icon size={19} />
          </div>
          <p className="card-number">{c.value}</p>
          <p className="text-body-small text-text-secondary mt-1">{c.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultStatCards;