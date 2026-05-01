import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { usePrimaryStats } from "../hooks/useDashboardStats";
import { cardGrid, scaleUp } from "@/features/dashboard/animation/variant"

const PrimaryStatCards: React.FC = () => {
  const { data, isLoading } = usePrimaryStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-border-line02 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 font-lato"
      variants={cardGrid}
      initial="hidden"
      animate="show"
    >
      {data?.map((stat) => (
        <motion.div
          key={stat.id}
          variants={scaleUp}
          whileHover={{
            y: -4,
            boxShadow: "0 16px 40px -8px rgba(0,0,0,0.18)",
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          className={cn(
            "relative flex flex-col justify-between p-5 rounded-2xl text-white overflow-hidden card-shadow cursor-default",
            `bg-${stat.bg}`
          )}
        >
          {/* Icon */}
          <div className="flex justify-between">

            {/* label + values */}
            <div className="space-y-1">
              <p className="text-sm font-lato font-medium text-bg-main">{stat.label}</p>
              <p className="card-number text-bg-main text-2xl">{stat.value}</p>
              <div className="flex items-center gap-1 text-[11px] text-bg-main">
                {stat.positive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-white" />
                )}
                <span>{stat.change}</span>
            </div>
          </div>
            <motion.div
              initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "backOut" }}
              className="w-12 h-12 rounded-xl bg-bg-main flex-center shrink-0"
            >
              <stat.Icon className={cn(`w-6 h-6 text-${stat.bg}`)} />
            </motion.div>
          </div>


          {/* Decorative animated circle */}
          <motion.div
            className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
          />
          <motion.div
            className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "backOut" }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PrimaryStatCards;