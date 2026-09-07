import React from "react";
import { Users, TrendingUp, Award, BookOpen } from "lucide-react";
import type { ClassResultData } from "../../types/classResult";

interface ClassResultStatCardsProps {
  result: ClassResultData;
}

const ClassResultStatCards: React.FC<ClassResultStatCardsProps> = ({ result }) => {
  const cards = [
    { icon: Users, value: result.totalStudents, label: "Total Students", color: "bg-blue-50 text-brand-primary" },
    { icon: TrendingUp, value: `${result.classAverage}%`, label: "Class Average", color: "bg-green-50 text-success" },
    { icon: Award, value: result.topStudent, label: "Top Student", color: "bg-purple-50 text-purple-600" },
    { icon: BookOpen, value: `${result.passRate}%`, label: "Pass Rate", color: "bg-amber-50 text-warning" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex-center shrink-0 ${card.color}`}>
            <card.icon size={19} />
          </div>
          <div>
            <p className="card-number">{card.value}</p>
            <p className="text-body-small text-text-secondary">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassResultStatCards;