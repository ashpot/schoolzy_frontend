import type { LucideIcon } from "lucide-react";

interface EmptyPanelProps {
  icon: LucideIcon;
  title: string;
  hint?: string;
}

export default function EmptyPanel({ icon: Icon, title, hint }: EmptyPanelProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <span className="flex-center h-12 w-12 rounded-full bg-blue-50 text-brand-primary">
        <Icon size={22} aria-hidden />
      </span>
      <p className="text-sm font-medium text-text-primary">{title}</p>
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  );
}