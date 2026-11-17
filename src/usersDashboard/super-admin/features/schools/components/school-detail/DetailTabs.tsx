import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { fadeUp } from "../../animations/variants";
import { DETAIL_TABS } from "../../utils/detailConstants";
import type { DetailTab } from "../../types/detail";

interface DetailTabsProps {
  active: DetailTab;
  onChange: (t: DetailTab) => void;
}

export default function DetailTabs({ active, onChange }: DetailTabsProps) {
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = DETAIL_TABS[(i + step + DETAIL_TABS.length) % DETAIL_TABS.length];
    onChange(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <motion.div
      variants={fadeUp}
      role="tablist"
      aria-label="School sections"
      className="flex gap-1 overflow-x-auto border-b border-border-line03"
    >
      {DETAIL_TABS.map((t, i) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="school-tabpanel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "relative whitespace-nowrap px-5 py-3 text-sm font-medium outline-none transition-colors",
              isActive ? "text-brand-primary" : "text-text-secondary hover:text-text-primary"
            )}
          >
            {t.label}
            {isActive && (
              <motion.span
                layoutId="sa-detail-tab"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-primary"
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}