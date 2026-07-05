import type { LucideIcon } from "lucide-react";

interface StatPillProps {
  icon: LucideIcon;
  label: string;
}

export default function StatPill({ icon: Icon, label }: StatPillProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
      <Icon size={14} className="text-brand-primary" />
      <span className="text-xs font-medium text-brand-primary">{label}</span>
    </div>
  );
}