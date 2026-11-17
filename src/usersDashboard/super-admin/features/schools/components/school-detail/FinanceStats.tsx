import { motion } from "framer-motion";
import { Activity, AlertCircle, CreditCard, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile, toneText, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { formatNumber, signed } from "../../utils/format";
import { formatCompactNaira } from "../../utils/formatDetail";
import type { SchoolFinance } from "../../types/detail";

export default function FinanceStats({ f }: { f: SchoolFinance }) {
  const cards = [
    { label: "Fees Collected", value: formatCompactNaira(f.feesCollected), icon: DollarSign, tone: "green" as Tone, delta: `${signed(f.feesChangePct)}% this term`, good: f.feesChangePct >= 0 },
    { label: "Outstanding Fees", value: formatCompactNaira(f.outstandingFees), icon: AlertCircle, tone: "red" as Tone, delta: `${f.outstandingStudents} students`, good: false },
    { label: "Total Expenses", value: formatCompactNaira(f.totalExpenses), icon: CreditCard, tone: "amber" as Tone, delta: `${signed(f.expensesChangePct)}% vs last term`, good: f.expensesChangePct <= 0 },
    { label: "Transactions", value: formatNumber(f.transactions), icon: Activity, tone: "blue" as Tone, delta: `+${f.transactionsThisMonth} this month`, good: true },
  ];

  return (
    <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, tone, delta, good }) => {
        const Trend = good ? TrendingUp : TrendingDown;
        const deltaTone: Tone = good ? "green" : "red";
        return (
          <motion.article key={label} variants={fadeUp} whileHover={{ y: -3 }} className="rounded-3xl border border-border-line02 bg-white p-6 transition-shadow hover:card-shadow">
            <div className="flex items-start justify-between">
              <span className={cn("flex-center h-12 w-12 rounded-xl", toneIconTile[tone])}><Icon size={22} aria-hidden /></span>
              <Trend size={16} className={toneText[deltaTone]} aria-hidden />
            </div>
            <p className="mt-4 font-lato text-[28px] font-semibold leading-tight text-text-primary">{value}</p>
            <p className="mt-1 text-sm text-text-secondary">{label}</p>
            <p className={cn("mt-2 text-sm", toneText[deltaTone])}>{delta}</p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}