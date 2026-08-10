import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, ReceiptText } from "lucide-react";
import { useRecentSales } from "../hooks/useDashboardStats";
import { listContainer, fadeUpFast, fadeUp } from "../animation/variant";

const RecentSales: React.FC = () => {
  const { data, isLoading } = useRecentSales();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const sales = (data ?? []) as { id: string; name: string; detail: string; amount: string }[];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="bg-white rounded-2xl border border-border-line02 card-shadow p-5 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          Recent Sales
        </motion.h2>
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          whileHover={{ x: 2 }}
          className="text-xs text-brand-primary font-lato font-medium hover:underline"
        >
          View all
        </motion.button>
      </div>

      {isLoading ? (
        <motion.div className="flex flex-col gap-1" variants={listContainer} initial="hidden" animate="show">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div key={i} variants={fadeUpFast} className="flex items-center gap-3 py-3">
              <div className="w-8 h-8 rounded-xl bg-border-line02 animate-pulse shrink-0" />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-3 w-36 bg-border-line02 rounded animate-pulse" />
                <div className="h-2.5 w-24 bg-border-line02 rounded animate-pulse" />
              </div>
              <div className="h-3 w-16 bg-border-line02 rounded animate-pulse" />
            </motion.div>
          ))}
        </motion.div>
      ) : sales.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <div className="w-10 h-10 rounded-full bg-bg-soft flex-center">
            <ReceiptText className="w-5 h-5 text-text-muted" />
          </div>
          <p className="text-sm text-text-secondary font-medium">Not available</p>
          <p className="text-xs text-text-muted">No recent sales data yet</p>
        </div>
      ) : (
        <motion.div className="flex flex-col gap-1" variants={listContainer} initial="hidden" animate={inView ? "show" : "hidden"}>
          {sales.map((sale) => (
            <motion.div
              key={sale.id}
              variants={fadeUpFast}
              whileHover={{ x: 3, backgroundColor: "hsla(0,0%,94%,0.5)", transition: { duration: 0.15 } }}
              className="flex items-center gap-3 py-3 border-b border-border-line02 last:border-0 rounded-lg px-1 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1, transition: { duration: 0.2 } }}
                className="w-8 h-8 rounded-xl bg-brand-primary/10 flex-center shrink-0"
              >
                <TrendingUp className="w-4 h-4 text-brand-primary" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-lato font-medium text-text-primary truncate">{sale.name}</p>
                <p className="text-xs text-text-muted">{sale.detail}</p>
              </div>
              <p className="text-sm font-lato font-semibold text-success whitespace-nowrap">{sale.amount}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecentSales;