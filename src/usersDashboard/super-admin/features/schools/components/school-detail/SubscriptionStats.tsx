import { motion } from "framer-motion";
import { Banknote, Calendar, Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { formatDate, formatNaira } from "../../utils/format";
import type { SchoolSubscription } from "../../types/detail";

export default function SubscriptionStats({ sub }: { sub: SchoolSubscription }) {
  const cards = [
    { label: "Current Plan", value: sub.plan, icon: ShieldCheck, tone: "blue" as Tone },
    { label: "Billing Cycle", value: sub.billingCycle, icon: Calendar, tone: "green" as Tone },
    { label: "Renewal Date", value: formatDate(sub.renewalDate), icon: Clock, tone: "amber" as Tone },
    { label: "Next Invoice", value: formatNaira(sub.nextInvoice), icon: Banknote, tone: "purple" as Tone },
  ];

  return (
    <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <motion.article key={label} variants={fadeUp} whileHover={{ y: -3 }} className="rounded-3xl border border-border-line02 bg-white p-6 transition-shadow hover:card-shadow">
          <span className={cn("flex-center h-12 w-12 rounded-xl", toneIconTile[tone])}><Icon size={22} aria-hidden /></span>
          <p className="mt-4 font-lato text-2xl font-semibold text-text-primary">{value}</p>
          <p className="mt-1 text-sm text-text-secondary">{label}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}