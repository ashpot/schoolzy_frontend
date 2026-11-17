import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { useCountUp } from "@/usersDashboard/super-admin/shared/hooks/useCountUp";
import { fadeUp } from "../../animations/variants";
import { formatNumber } from "../../utils/format";

interface StatTileProps {
  icon: LucideIcon;
  tone: Tone;
  label: string;
  value: number | string; // numbers count up, strings render as-is
  suffix?: string;
}

export default function StatTile({ icon: Icon, tone, label, value, suffix = "" }: StatTileProps) {
  const count = useCountUp(typeof value === "number" ? value : 0);

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-border-line02 bg-white p-5 text-center transition-shadow hover:card-shadow"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
        className={cn("flex-center mx-auto h-12 w-12 rounded-xl", toneIconTile[tone])}
      >
        <Icon size={22} aria-hidden />
      </motion.span>
      <p className="mt-3 font-lato text-2xl font-semibold tabular-nums text-text-primary">
        {typeof value === "number" ? `${formatNumber(count)}${suffix}` : value}
      </p>
      <p className="mt-1 text-sm text-text-secondary">{label}</p>
    </motion.article>
  );
}