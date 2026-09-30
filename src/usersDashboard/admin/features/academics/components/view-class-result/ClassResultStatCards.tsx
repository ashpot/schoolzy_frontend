import React from "react";
import { Users, TrendingUp, Award, TrendingDown } from "lucide-react";
import type { ClassResultResponse } from "../../types/classResult";

const ClassResultStatCards: React.FC<{ result: ClassResultResponse }> = ({ result }) => {
  const { statistics } = result;
  const cards = [
    { icon: Users, value: statistics.students, label: "Total Students", color: "bg-blue-50 text-brand-primary" },
    { icon: TrendingUp, value: statistics.class_average.toFixed(1), label: "Class Average", color: "bg-green-50 text-success" },
    { icon: Award, value: statistics.highest_total, label: "Highest Total", color: "bg-purple-50 text-purple-600" },
    { icon: TrendingDown, value: statistics.lowest_total, label: "Lowest Total", color: "bg-amber-50 text-warning" },
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