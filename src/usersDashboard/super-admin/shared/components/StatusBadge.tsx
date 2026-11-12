import { cn } from "@/shared/utils/cn";
import { toneBadge, type Tone } from "../utils/tones";

interface StatusBadgeProps {
  label: string;
  tone: Tone;
  className?: string;
}

export default function StatusBadge({ label, tone, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium",
        toneBadge[tone],
        className
      )}
    >
      {label}
    </span>
  );
}