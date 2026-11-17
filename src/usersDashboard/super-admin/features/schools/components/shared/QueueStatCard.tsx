import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { useCountUp } from "@/usersDashboard/super-admin/shared/hooks/useCountUp";
import { fadeUp } from "../../animations/variants";
import { formatNumber } from "../../utils/format";

export interface QueueStat {
  key: string;
  icon: LucideIcon;
  tone: Tone;
  value: number | string; // numbers count up, strings render as-is
  label: string;
  hint?: string;
}

export default function QueueStatCard({ stat }: { stat: QueueStat }) {
  const count = useCountUp(typeof stat.value === "number" ? stat.value : 0);
  const Icon = stat.icon;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-border-line02 bg-white p-6 transition-shadow hover:card-shadow"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
        className={cn("flex-center h-12 w-12 rounded-xl", toneIconTile[stat.tone])}
      >
        <Icon size={22} aria-hidden />
      </motion.span>
      <p className="mt-4 font-lato text-[32px] font-semibold leading-tight text-text-primary tabular-nums">
        {typeof stat.value === "number" ? formatNumber(count) : stat.value}
      </p>
      <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
      {stat.hint && <p className="mt-2 text-xs text-text-muted">{stat.hint}</p>}
    </motion.article>
  );
}