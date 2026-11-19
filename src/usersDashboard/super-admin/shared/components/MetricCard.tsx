import { motion, type Variants } from "framer-motion";
import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useCountUp } from "../hooks/useCountUp";
import { toneBadge, toneIconTile, type Tone } from "../utils/tones";

export interface MetricDelta {
  text: string;
  good: boolean;
  flat?: boolean;
}

export interface MetricItem {
  key: string;
  icon: LucideIcon;
  tone: Tone;
  value: number | string; // numbers count up, strings render as-is
  label: string;
  delta?: MetricDelta;
}

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function DeltaPill({ delta }: { delta: MetricDelta }) {
  const tone: Tone = delta.flat ? "gray" : delta.good ? "green" : "red";
  const Icon = delta.flat ? Minus : delta.good ? TrendingUp : TrendingDown;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium", toneBadge[tone])}>
      <Icon size={12} aria-hidden /> {delta.text}
    </span>
  );
}

export default function MetricCard({ item }: { item: MetricItem }) {
  const count = useCountUp(typeof item.value === "number" ? item.value : 0);
  const Icon = item.icon;

  return (
    <motion.article
      variants={rise}
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-border-line02 bg-white p-6 transition-shadow hover:card-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
          className={cn("flex-center h-12 w-12 shrink-0 rounded-xl", toneIconTile[item.tone])}
        >
          <Icon size={22} aria-hidden />
        </motion.span>
        {item.delta && <DeltaPill delta={item.delta} />}
      </div>
      <p className="mt-4 font-lato text-[32px] font-semibold leading-tight tabular-nums text-text-primary">
        {typeof item.value === "number" ? count.toLocaleString("en-US") : item.value}
      </p>
      <p className="mt-1 text-sm text-text-secondary">{item.label}</p>
    </motion.article>
  );
}