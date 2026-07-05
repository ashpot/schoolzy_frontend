import type { LucideIcon } from "lucide-react";

interface Props {
  icon:  LucideIcon;
  label: string;
}

export default function StatPill({ icon: Icon, label }: Props) {
  return (
    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-blue-50 text-brand-primary border border-blue-100">
      <Icon size={15} />
      {label}
    </span>
  );
}