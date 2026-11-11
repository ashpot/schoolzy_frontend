import { motion } from "framer-motion";
import { Building2, Check, DollarSign, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp } from "../../animations/variants";
import type { StatCardData, StatId } from "../../types";

const ICONS: Record<StatId, LucideIcon> = {
  totalSchools: Building2,
  activeSchools: Check,
  totalStudents: Users,
  monthlyRevenue: DollarSign,
};

export default function StatCard({ stat }: { stat: StatCardData }) {
  const Icon = ICONS[stat.id];

  return (
    <motion.article variants={fadeUp} className="rounded-3xl border border-border-line02 bg-white p-6">
      <div className="flex items-start justify-between">
        <span className={cn("flex-center h-12 w-12 rounded-xl", toneIconTile[stat.tone])}>
          <Icon size={22} aria-hidden />
        </span>
        <TrendingUp size={16} className="text-success" aria-hidden />
      </div>
      <p className="mt-4 font-lato text-[32px] font-semibold leading-tight text-text-primary">{stat.value}</p>
      <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
      <p className="mt-2 text-sm text-success">{stat.delta}</p>
    </motion.article>
  );
}