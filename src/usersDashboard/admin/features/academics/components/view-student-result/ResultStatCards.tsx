import React from "react";
import { TrendingUp, Award, Hash, Calendar } from "lucide-react";
import type { StudentResultData } from "../../types/studentResult";

interface ResultStatCardsProps {
  result: StudentResultData;
}

const ResultStatCards: React.FC<ResultStatCardsProps> = ({ result }) => {
  const cards = [
    { icon: TrendingUp, value: `${result.averageScore}%`, label: "Average Score", color: "bg-blue-50 text-brand-primary" },
    { icon: Award, value: result.overallGrade + "2", label: "Overall Grade", color: "bg-blue-50 text-brand-primary" },
    { icon: Hash, value: `${result.positionInClass.replace(/\D/g, "")} / ${result.classSize}`, label: "Class Position", color: "bg-green-50 text-success" },
    { icon: Calendar, value: `${result.attendancePercentage}%`, label: "Attendance", color: "bg-amber-50 text-warning" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl card-shadow p-5 flex flex-col items-center text-center">
          <div className={`w-11 h-11 rounded-xl flex-center mb-3 ${card.color}`}>
            <card.icon size={19} />
          </div>
          <p className="card-number">{card.value}</p>
          <p className="text-body-small text-text-secondary mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultStatCards;