import { motion, type Variants } from "framer-motion";
import MetricCard, { type MetricItem } from "./MetricCard";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const COLS = {
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
} as const;

interface MetricGridProps {
  items: MetricItem[];
  isLoading: boolean;
  columns?: 3 | 4;
}

export default function MetricGrid({ items, isLoading, columns = 4 }: MetricGridProps) {
  if (isLoading) {
    return (
      <div className={`grid gap-6 ${COLS[columns]}`} aria-busy="true">
        {Array.from({ length: columns === 3 ? 6 : 4 }, (_, i) => (
          <div key={i} className="h-[150px] animate-pulse rounded-3xl bg-sa-gray-soft" />
        ))}
      </div>
    );
  }
  return (
    <motion.div variants={container} className={`grid gap-6 ${COLS[columns]}`}>
      {items.map((m) => (
        <MetricCard key={m.key} item={m} />
      ))}
    </motion.div>
  );
}