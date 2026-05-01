import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useInventory } from "../hooks/useDashboardStats";
import { listContainer, fadeUpFast, fadeUp } from "../animation/variant";

const ItemsSold: React.FC = () => {
  const { data, isLoading } = useInventory();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="bg-white rounded-2xl border border-border-line02 card-shadow p-5 flex flex-col gap-5"
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <h2 className="section-title">Items Sold</h2>
          <p className="text-xs text-text-muted mt-0.5">Inventory progress this term</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
          animate={inView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4, ease: "backOut" }}
          className="w-9 h-9 rounded-xl bg-brand-primary/10 flex-center"
        >
          <Package className="w-5 h-5 text-brand-primary" />
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col gap-4"
        variants={listContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <motion.div key={i} variants={fadeUpFast} className="flex flex-col gap-1.5">
                <div className="h-3 w-32 bg-border-line02 rounded animate-pulse" />
                <div className="h-2.5 w-full bg-border-line02 rounded-full animate-pulse" />
              </motion.div>
            ))
          : data?.map((item) => {
              const pct = Math.round((item.sold / item.total) * 100);
              return (
                <motion.div key={item.id} variants={fadeUpFast}>
                  <div className="flex items-center justify-between mb-1.5 text-sm font-lato">
                    <span className="text-text-primary font-medium">{item.name}</span>
                    <span className="text-text-muted text-xs">
                      {item.sold} / {item.total}
                      <span className={cn("ml-2 font-semibold", item.color.replace("bg-", "text-"))}>
                        {pct}% sold
                      </span>
                    </span>
                  </div>
                  {/* Progress bar — animates width from 0 */}
                  <div className="h-2 w-full bg-border-line02 rounded-full overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full", item.color)}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              );
            })}
      </motion.div>
    </motion.div>
  );
};

export default ItemsSold;