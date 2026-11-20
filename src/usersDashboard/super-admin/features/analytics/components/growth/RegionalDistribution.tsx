import { motion } from "framer-motion";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import type { Region } from "../../types/growth";

const LEGEND = [
  { label: "High", size: 16 },
  { label: "Mid", size: 11 },
  { label: "Low", size: 7 },
];

export default function RegionalDistribution({ regions }: { regions: Region[] }) {
  const max = Math.max(...regions.map((r) => r.count), 1);

  return (
    <SectionCard title="Regional Distribution" subtitle="School density by state (bubble size = school count)">
      <div className="relative h-[300px] overflow-hidden rounded-2xl bg-sa-blue-soft" role="img" aria-label="Bubble chart of school counts by state">
        <p className="absolute left-1/2 top-3 -translate-x-1/2 text-[11px] text-text-muted">Nigeria — School Distribution</p>
        {regions.map((r, i) => {
          const size = 22 + (r.count / max) * 56;
          return (
            <motion.span
              key={r.code}
              title={`${r.state}: ${r.count} schools`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 240, damping: 20 }}
              style={{ left: `${r.x}%`, top: `${r.y}%`, width: size, height: size }}
              className="flex-center absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-sa-blue-icon/50 text-[9px] font-semibold text-white"
            >
              {r.code}
            </motion.span>
          );
        })}
      </div>
      <ul className="mt-4 flex items-center gap-5 text-xs text-text-secondary">
        {LEGEND.map((l) => (
          <li key={l.label} className="flex items-center gap-2">
            <span className="rounded-full bg-sa-blue-icon/60" style={{ width: l.size, height: l.size }} aria-hidden /> {l.label}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}