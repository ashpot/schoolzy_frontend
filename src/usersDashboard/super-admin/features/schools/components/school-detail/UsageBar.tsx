import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { toneBar, toneText } from "@/usersDashboard/super-admin/shared/utils/tones";
import { usageTone } from "../../utils/detailTones";
import { percentOf } from "../../utils/formatDetail";

interface UsageBarProps {
  label: string;
  used: number;
  limit: number;
  suffix?: string;
  percentInline?: boolean; // true: "83%" beside the numbers; false: "83% used" under the bar
}

export default function UsageBar({ label, used, limit, suffix = "", percentInline = false }: UsageBarProps) {
  const pct = percentOf(used, limit);
  const tone = usageTone(pct);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-text-primary">{label}</span>
        <span className="text-sm text-text-secondary tabular-nums">
          {used} / {limit}
          {suffix}
          {percentInline && <span className={cn("ml-3 text-xs font-semibold", toneText[tone])}>{pct}%</span>}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-sa-gray-line"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn("h-full rounded-full", toneBar[tone])}
        />
      </div>
      {!percentInline && <p className={cn("mt-1 text-xs", toneText[tone])}>{pct}% used</p>}
    </div>
  );
}