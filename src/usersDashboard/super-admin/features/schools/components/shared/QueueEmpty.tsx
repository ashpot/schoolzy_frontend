import type { LucideIcon } from "lucide-react";

interface QueueEmptyProps {
  icon: LucideIcon;
  title: string;
  hint: string;
}

export default function QueueEmpty({ icon: Icon, title, hint }: QueueEmptyProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="flex-center h-14 w-14 rounded-full bg-sa-blue-soft text-sa-blue-icon">
        <Icon size={24} aria-hidden />
      </span>
      <p className="text-sm font-medium text-text-primary">{title}</p>
      <p className="text-xs text-text-muted">{hint}</p>
    </div>
  );
}