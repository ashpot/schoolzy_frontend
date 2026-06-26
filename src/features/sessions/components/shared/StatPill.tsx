import type { LucideIcon } from "lucide-react";

interface StatPillProps {
  icon: LucideIcon;
  label: string;
}

export default function StatPill({ icon: Icon, label }: StatPillProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border-line02 card-shadow">
      <span className="w-2 h-2 rounded-full bg-brand-primary" />
      <Icon size={14} className="text-brand-primary" />
      <span className="text-sm font-medium text-text-primary">{label}</span>
    </div>
  );
}