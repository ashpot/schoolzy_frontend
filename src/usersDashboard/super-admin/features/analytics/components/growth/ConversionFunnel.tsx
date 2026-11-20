import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { formatNumber } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { FunnelStage } from "../../types/growth";

const SHADES = ["bg-sa-blue-icon", "bg-sa-blue-icon/90", "bg-sa-blue-icon/80", "bg-sa-blue-icon/70", "bg-sa-blue-icon"];

export default function ConversionFunnel({ stages }: { stages: FunnelStage[] }) {
  const top = stages[0]?.value || 1;

  return (
    <SectionCard title="Conversion Funnel" subtitle="Applications → Active Schools">
      <ol className="flex flex-col items-center">
        {stages.map((s, i) => {
          const width = Math.max(Math.round((s.value / top) * 100), 40);
          const prev = stages[i - 1];
          return (
            <li key={s.label} className="flex w-full flex-col items-center">
              {prev && (
                <p className="my-1.5 flex items-center gap-1 text-xs text-text-muted">
                  <ArrowDown size={12} aria-hidden /> {Math.round((s.value / prev.value) * 100)}% conv.
                </p>
              )}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${width}%`, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                className={`flex items-center justify-between overflow-hidden whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${SHADES[i % SHADES.length]}`}
              >
                <span>{s.label}</span>
                <span className="tabular-nums">{formatNumber(s.value)}</span>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </SectionCard>
  );
}