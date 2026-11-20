import { motion } from "framer-motion";
import { FileSpreadsheet } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import { fadeUp } from "../../animations/variants";

interface PeriodBarProps<T extends string> {
  tabs: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  layoutId: string; // unique per page so the sliding pill doesn't clash
  onExcel: () => void;
  excelDisabled: boolean;
}

export default function PeriodBar<T extends string>({ tabs, value, onChange, layoutId, onExcel, excelDisabled }: PeriodBarProps<T>) {
  return (
    <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label="Time period" className="flex flex-wrap gap-1 rounded-2xl bg-sa-blue-soft p-1.5">
        {tabs.map((t) => {
          const active = t.id === value;
          return (
            <button key={t.id} type="button" aria-pressed={active} onClick={() => onChange(t.id)} className="relative rounded-xl px-5 py-2.5 text-sm font-medium">
              {active && (
                <motion.span layoutId={layoutId} transition={{ type: "spring", stiffness: 400, damping: 34 }} className="absolute inset-0 rounded-xl bg-brand-primary" />
              )}
              <span className={cn("relative z-10", active ? "text-white" : "text-text-secondary")}>{t.label}</span>
            </button>
          );
        })}
      </div>
      <Button type="button" variant="outline" leftIcon={<FileSpreadsheet size={16} />} onClick={onExcel} disabled={excelDisabled}>
        Excel
      </Button>
    </motion.div>
  );
}