import { School, Users, AlertCircle } from "lucide-react";

interface Props {
  totalClasses:  number;
  totalTeachers: number;
  assigned:      number;
}

export default function FormTeacherStats({ totalClasses, totalTeachers, assigned }: Props) {
  const unassigned = totalClasses - assigned;

  const stats = [
    { value: totalClasses,  label: "Total Classes",    sub: `${assigned} assigned`,              icon: School,       bg: "bg-blue-50",   iconCls: "text-blue-500",   border: "border-blue-100"   },
    { value: totalTeachers, label: "Total Teachers",   sub: `${assigned} serving as form teacher`, icon: Users,        bg: "bg-purple-50", iconCls: "text-purple-500", border: "border-purple-100" },
    { value: unassigned,    label: "Unassigned Classes", sub: "still need a form teacher",         icon: AlertCircle,  bg: "bg-amber-50",  iconCls: "text-amber-500",  border: "border-amber-100"  },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ value, label, sub, icon: Icon, bg, iconCls, border }) => (
        <div key={label} className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${bg} ${border}`}>
          <div className={`w-10 h-10 rounded-xl bg-white/60 flex-center shrink-0`}>
            <Icon size={20} className={iconCls} />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary leading-tight">{value}</p>
            <p className={`text-sm font-medium ${iconCls}`}>{label}</p>
            <p className="text-xs text-text-muted">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}