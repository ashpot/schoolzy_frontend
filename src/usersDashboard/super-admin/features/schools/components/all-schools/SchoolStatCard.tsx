import { motion } from "framer-motion";
import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile, toneText, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { useCountUp } from "@/usersDashboard/super-admin/shared/hooks/useCountUp";
import { fadeUp } from "../../animations/variants";
import { formatNumber } from "../../utils/format";

export interface SchoolStat {
  key: string;
  icon: LucideIcon;
  tone: Tone;
  value: number;
  label: string;
  delta: string;
  deltaTone: Tone;
  trend: "up" | "down" | "flat";
}

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus } as const;

export default function SchoolStatCard({ stat }: { stat: SchoolStat }) {
  const count = useCountUp(stat.value);
  const Icon = stat.icon;
  const Trend = TREND_ICON[stat.trend];

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-border-line02 bg-white p-6 transition-shadow hover:card-shadow"
    >
      <div className="flex items-start justify-between">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
          className={cn("flex-center h-12 w-12 rounded-xl", toneIconTile[stat.tone])}
        >
          <Icon size={22} aria-hidden />
        </motion.span>
        <Trend size={16} className={toneText[stat.deltaTone]} aria-hidden />
      </div>
      <p className="mt-4 font-lato text-[32px] font-semibold leading-tight text-text-primary tabular-nums">
        {formatNumber(count)}
      </p>
      <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
      <p className={cn("mt-2 text-sm", toneText[stat.deltaTone])}>{stat.delta}</p>
    </motion.article>
  );
}