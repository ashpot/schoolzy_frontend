import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/variants";
import type { SubStat } from "../../types";
import SubStatCard from "./SubStatCard";

export default function StatGrid({ stats, isLoading }: { stats: SubStat[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[130px] animate-pulse rounded-3xl bg-sa-gray-soft" />
        ))}
      </div>
    );
  }
  return (
    <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <SubStatCard key={s.key} stat={s} />
      ))}
    </motion.div>
  );
}