import React from "react";
import { Award, BookOpen, TrendingUp, Users } from "lucide-react";
import type { ClassSheet } from "../../types/classResult";

const ClassResultStatCards: React.FC<{ sheet: ClassSheet }> = ({ sheet }) => {
  const { stats } = sheet;
  const cards = [
    { icon: Users, value: String(stats.students), label: "Total Students", color: "bg-blue-50 text-brand-primary" },
    { icon: TrendingUp, value: String(Number(stats.classAverage.toFixed(1))), label: "Class Average", color: "bg-green-50 text-success" },
    { icon: Award, value: stats.topStudent ?? "—", label: "Top Student", color: "bg-purple-50 text-purple-600" },
    { icon: BookOpen, value: stats.passRate === null ? "—" : `${stats.passRate}%`, label: "Pass Rate", color: "bg-orange-50 text-orange-500" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-3 min-w-0">
          <div className={`w-11 h-11 rounded-xl flex-center shrink-0 ${c.color}`}>
            <c.icon size={19} />
          </div>
          <div className="min-w-0">
            <p className="card-number truncate capitalize">{c.value}</p>
            <p className="text-body-small text-text-secondary">{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassResultStatCards;