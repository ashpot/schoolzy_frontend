import type { LucideIcon } from "lucide-react";

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-4 border-b border-border-line02 py-4 last:border-b-0">
      <span className="flex-center h-10 w-10 shrink-0 rounded-xl bg-sa-gray-soft text-sa-gray-icon">
        <Icon size={18} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-text-muted">{label}</p>
        <p className="break-words text-sm font-medium text-text-primary">{value || "—"}</p>
      </div>
    </div>
  );
}