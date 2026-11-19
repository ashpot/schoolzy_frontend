import { motion } from "framer-motion";
import { FileSpreadsheet } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import { fadeUp } from "../animations/variants";
import type { Period } from "../types";
import { PERIODS } from "../utils/constants";

interface AnalyticsControlsProps {
  period: Period;
  onPeriod: (p: Period) => void;
  onExcel: () => void;
  exportDisabled: boolean;
}

export default function AnalyticsControls({ period, onPeriod, onExcel, exportDisabled }: AnalyticsControlsProps) {
  return (
    <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label="Time period" className="flex flex-wrap gap-1 rounded-2xl bg-sa-blue-soft p-1.5">
        {PERIODS.map((p) => {
          const active = p.id === period;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={active}
              onClick={() => onPeriod(p.id)}
              className="relative rounded-xl px-5 py-2.5 text-sm font-medium"
            >
              {active && (
                <motion.span
                  layoutId="sa-analytics-period"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-brand-primary"
                />
              )}
              <span className={cn("relative z-10", active ? "text-white" : "text-text-secondary")}>{p.label}</span>
            </button>
          );
        })}
      </div>
      <Button type="button" variant="outline" leftIcon={<FileSpreadsheet size={16} />} onClick={onExcel} disabled={exportDisabled}>
        Excel
      </Button>
    </motion.div>
  );
}