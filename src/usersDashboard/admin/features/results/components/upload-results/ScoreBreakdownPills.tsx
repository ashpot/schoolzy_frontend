import { FileText, BookOpen, FlaskConical, Sigma } from "lucide-react";

const PILLS = [
  { label: "Assignment /30", icon: FileText,    cls: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Test /20",       icon: BookOpen,    cls: "bg-blue-50   text-blue-700   border-blue-200"   },
  { label: "Exam /50",       icon: FlaskConical, cls: "bg-amber-50  text-amber-700  border-amber-200"  },
  { label: "Total /100",     icon: Sigma,       cls: "bg-gray-100  text-gray-600   border-gray-200"   },
];

export default function ScoreBreakdownPills() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {PILLS.map(({ label, icon: Icon, cls }) => (
        <span key={label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${cls}`}>
          <Icon size={12} />{label}
        </span>
      ))}
    </div>
  );
}