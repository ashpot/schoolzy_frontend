import { motion } from "framer-motion";
import { Database, HardDrive, Server, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { toneBadge, toneBar, toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { SystemSettings } from "../../types";
import { percent } from "../../utils/format";
import { rowVariant, staggerContainer } from "../../animations/variants";

const loadTone = (pct: number): Tone => (pct >= 85 ? "red" : pct >= 70 ? "amber" : "green");

function Tile({ icon: Icon, tone, badge, title, sub, pct }: { icon: LucideIcon; tone: Tone; badge: string; title: string; sub: string; pct?: number }) {
  return (
    <motion.li variants={rowVariant} className="rounded-2xl border border-border-line02 p-5">
      <div className="flex items-start justify-between">
        <span className={cn("flex-center h-11 w-11 rounded-xl", toneIconTile[tone])}><Icon size={20} aria-hidden /></span>
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", toneBadge[tone])}>{badge}</span>
      </div>
      <p className="mt-4 font-semibold text-text-primary">{title}</p>
      <p className="text-xs text-text-muted">{sub}</p>
      {pct !== undefined && (
        <div role="progressbar" aria-label={title} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="mt-3 h-1.5 overflow-hidden rounded-full bg-sa-gray-line">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: "easeOut" }} className={cn("h-full rounded-full", toneBar[tone])} />
        </div>
      )}
    </motion.li>
  );
}

export default function SystemStatusCard({ status: s }: { status: SystemSettings["status"] }) {
  const storage = percent(s.storageUsedGb, s.storageTotalGb);
  const db = percent(s.dbUsedGb, s.dbTotalGb);
  const apiOk = s.api.toLowerCase() === "operational";

  return (
    <SectionCard title="System Status" subtitle="Real-time platform health indicators.">
      <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Tile icon={HardDrive} tone={loadTone(storage)} badge={`${storage}%`} title="Storage" sub={`${s.storageUsedGb} GB / ${s.storageTotalGb} GB`} pct={storage} />
        <Tile icon={Database} tone={db >= 85 ? "red" : "blue"} badge={`${db}%`} title="Database" sub={`${s.dbUsedGb} GB / ${s.dbTotalGb} GB`} pct={db} />
        <Tile icon={Zap} tone={apiOk ? "green" : "red"} badge={apiOk ? "OK" : "Issue"} title="API Status" sub={s.api} />
        <Tile icon={Server} tone="green" badge="OK" title="Server" sub={s.server} />
      </motion.ul>
    </SectionCard>
  );
}