import { motion } from "framer-motion";
import { Lightbulb, Zap } from "lucide-react";
import { rowVariant, staggerContainer } from "../animations/variants";

export default function SmartInsights({ insights }: { insights: string[] }) {
  return (
    <section className="rounded-3xl border border-border-line02 bg-white p-6 lg:p-8" aria-labelledby="sa-insights-title">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex-center h-10 w-10 shrink-0 rounded-xl bg-sa-blue-soft text-sa-blue-icon">
          <Lightbulb size={20} aria-hidden />
        </span>
        <div>
          <h2 id="sa-insights-title" className="section-title">Smart Insights</h2>
          <p className="text-sm text-text-secondary">AI-powered platform observations</p>
        </div>
      </div>
      <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-2">
        {insights.map((text) => (
          <motion.li key={text} variants={rowVariant} className="flex items-center gap-3 rounded-2xl border border-sa-blue-line bg-sa-blue-soft px-5 py-4 text-sm text-text-primary">
            <span className="flex-center h-7 w-7 shrink-0 rounded-full bg-sa-blue-icon text-white">
              <Zap size={14} aria-hidden />
            </span>
            {text}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}