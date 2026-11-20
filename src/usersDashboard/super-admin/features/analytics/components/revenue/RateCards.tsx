import { motion } from "framer-motion";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneText } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp, staggerContainer } from "../../animations/variants";
import type { RateKey, RevenueRate } from "../../types/revenue";

const LABELS: Record<RateKey, string> = {
  renewal: "Renewal Rate",
  success: "Payment Success Rate",
  outstanding: "Outstanding Revenue",
  refund: "Refund Rate",
};

export default function RateCards({ rates }: { rates: RevenueRate[] }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-6 sm:grid-cols-2">
      {rates.map((r) => {
        const Icon = r.delta.flat ? Minus : r.delta.good ? TrendingUp : TrendingDown;
        return (
          <motion.article key={r.key} variants={fadeUp} whileHover={{ y: -3 }} className="rounded-3xl border border-border-line02 bg-white p-6 transition-shadow hover:card-shadow">
            <p className={cn("font-lato text-[32px] font-semibold leading-tight tabular-nums", toneText[r.tone])}>{r.value}</p>
            <p className="mt-2 text-sm font-medium text-text-primary">{LABELS[r.key]}</p>
            <p className={cn("mt-2 flex items-center gap-1.5 text-xs", r.delta.good ? "text-sa-green-text" : "text-sa-red-text")}>
              <Icon size={13} aria-hidden /> {r.delta.text}
            </p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}