import type { LucideIcon } from "lucide-react";

interface StatPillProps {
  icon: LucideIcon;
  label?: string;
  value: string | number;
  variant?: "blue" | "green" | "amber" | "red";
}

const variantStyles = {
  blue:  "bg-blue-50  text-blue-700  border border-blue-100",
  green: "bg-green-50 text-green-700 border border-green-100",
  amber: "bg-amber-50 text-amber-700 border border-amber-100",
  red:   "bg-red-50   text-red-700   border border-red-100",
};

const iconStyles = {
  blue:  "text-blue-500",
  green: "text-green-500",
  amber: "text-amber-500",
  red:   "text-red-500",
};

export default function StatPill({ icon: Icon, label, value, variant = "blue" }: StatPillProps) {
  return (
    <div className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium ${variantStyles[variant]}`}>
      <Icon size={14} className={iconStyles[variant]} />
      {label && <span className="text-text-secondary">{label}:</span>}
      <span className="font-semibold">{value}</span>
    </div>
  );
}