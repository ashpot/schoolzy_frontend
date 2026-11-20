import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { useCountUp } from "@/usersDashboard/super-admin/shared/hooks/useCountUp";
import { fadeUp } from "../../animations/variants";
import type { UserStat } from "../../types";

export default function UserStatCard({ stat }: { stat: UserStat }) {
  const count = useCountUp(stat.value);
  const Icon = stat.icon;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="flex items-start gap-4 rounded-3xl border border-border-line02 bg-white p-6 transition-shadow hover:card-shadow"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
        className={cn("flex-center h-12 w-12 shrink-0 rounded-xl", toneIconTile[stat.tone])}
      >
        <Icon size={22} aria-hidden />
      </motion.span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">{stat.label}</p>
        <p className="mt-1 font-lato text-[32px] font-semibold leading-tight tabular-nums text-text-primary">
          {count.toLocaleString("en-US")}
        </p>
        {stat.hint && <p className="mt-1 text-sm text-text-secondary">{stat.hint}</p>}
      </div>
    </motion.article>
  );
}