import { motion } from "framer-motion";
import {
  Building2, Check, DollarSign, Minus, TrendingDown, TrendingUp, Users, type LucideIcon,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp } from "../../animations/variants";
import type { StatCardData, StatId, Trend } from "../../types";

const ICONS: Record<StatId, LucideIcon> = {
  totalSchools: Building2,
  activeSchools: Check,
  totalStudents: Users,
  monthlyRevenue: DollarSign,
};

const TREND_ICON: Record<Trend, LucideIcon> = {
  up: TrendingUp,
  down: TrendingDown,
  unchanged: Minus,
};

const TREND_TEXT: Record<Trend, string> = {
  up: "text-success",
  down: "text-danger",
  unchanged: "text-text-muted",
};

export default function StatCard({ stat }: { stat: StatCardData }) {
  const Icon = ICONS[stat.id];
  const TrendIcon = TREND_ICON[stat.trend];

  return (
    <motion.article variants={fadeUp} className="rounded-3xl border border-border-line02 bg-white p-6">
      <div className="flex items-start justify-between">
        <span className={cn("flex-center h-12 w-12 rounded-xl", toneIconTile[stat.tone])}>
          <Icon size={22} aria-hidden />
        </span>
        <TrendIcon size={16} className={TREND_TEXT[stat.trend]} aria-hidden />
      </div>
      <p className="mt-4 font-lato text-[32px] font-semibold leading-tight text-text-primary">{stat.value}</p>
      <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
      <p className={cn("mt-2 text-sm", TREND_TEXT[stat.trend])}>{stat.delta}</p>
    </motion.article>
  );
}