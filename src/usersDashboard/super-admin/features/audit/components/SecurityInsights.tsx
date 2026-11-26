import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Shield, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile, toneTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { rowVariant, staggerContainer } from "../animations/variants";
import type { Insight } from "../types";
import { clock, isToday } from "../utils/format";

const ICON: Record<Insight["tone"], LucideIcon> = { red: AlertCircle, amber: AlertTriangle, purple: Shield };
const TIME: Record<Insight["tone"], string> = { red: "text-sa-red-text", amber: "text-sa-amber-text", purple: "text-sa-purple-text" };

export default function SecurityInsights({ insights }: { insights: Insight[] }) {
  return (
    <section className="rounded-3xl border border-border-line02 bg-white p-6 lg:p-8" aria-labelledby="sa-insights-title">
      <div className="mb-5 flex items-center gap-3">
        <span className={cn("flex-center h-11 w-11 rounded-xl", toneIconTile.red)}><Shield size={20} aria-hidden /></span>
        <div>
          <h2 id="sa-insights-title" className="section-title">Security Insights</h2>
          <p className="text-sm text-text-secondary">{insights.length} alerts requiring attention</p>
        </div>
      </div>
      <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-3">
        {insights.map((i) => {
          const Icon = ICON[i.tone];
          const t: Tone = i.tone;
          return (
            <motion.li key={i.id} variants={rowVariant} className={cn("flex gap-3 rounded-2xl border p-4", toneTile[t])}>
              <span className={cn("flex-center h-9 w-9 shrink-0 rounded-lg bg-white", toneIconTile[t].split(" ")[1])}><Icon size={17} aria-hidden /></span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary">{i.title}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{i.text}</p>
                <p className={cn("mt-1 text-xs font-medium", TIME[i.tone])}>{clock(i.at)}{isToday(i.at) ? "" : " yesterday"}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}