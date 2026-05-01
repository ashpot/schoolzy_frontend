import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { useSecondaryStats } from "../hooks/useDashboardStats";
import { cardGrid, scaleUp } from "@/features/dashboard/animation/variant"


const SecondaryStatCards: React.FC = () => {
  const { data, isLoading } = useSecondaryStats();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-border-line02 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 xl:grid-cols-4 gap-4"
      variants={cardGrid}
      initial="hidden"
      animate="show"
    >
      {data?.map((stat) => (
        <motion.div
          key={stat.id}
          variants={scaleUp}
          whileHover={{
            y: -3,
            boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)",
            transition: { duration: 0.18, ease: "easeOut" },
          }}
          className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border-line02 card-shadow cursor-default"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.35, ease: "backOut" }}
            className={cn("w-10 h-10 rounded-xl flex-center shrink-0", stat.iconBg)}
          >
            <stat.Icon className={cn("w-5 h-5", stat.iconColor)} />
          </motion.div>
          <div className="min-w-0">
            <p className="text-base font-lato font-semibold text-text-primary leading-tight">
              {stat.value}
            </p>
            <p className="text-xs text-text-muted truncate">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SecondaryStatCards;