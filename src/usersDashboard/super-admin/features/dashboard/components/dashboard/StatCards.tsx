import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/variants";
import type { StatCardData } from "../../types";
import StatCard from "./StatCard";

export default function StatCards({ stats }: { stats: StatCardData[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((s) => (
        <StatCard key={s.id} stat={s} />
      ))}
    </motion.div>
  );
}