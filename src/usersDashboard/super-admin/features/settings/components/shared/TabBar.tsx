import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { fadeUp } from "../../animations/variants";

interface TabBarProps<T extends string> {
  tabs: { id: T; label: string }[];
  active: T;
  onChange: (t: T) => void;
  layoutId: string; // unique per page so the sliding underline doesn't clash
  label: string;
}

export default function TabBar<T extends string>({ tabs, active, onChange, layoutId, label }: TabBarProps<T>) {
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    onChange(next.id);
    document.getElementById(`${layoutId}-${next.id}`)?.focus();
  };

  return (
    <motion.div variants={fadeUp} role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b border-border-line03">
      {tabs.map((t, i) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            id={`${layoutId}-${t.id}`}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls="sa-settings-panel"
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn("relative whitespace-nowrap px-5 py-3 text-sm font-medium outline-none transition-colors", on ? "text-brand-primary" : "text-text-secondary hover:text-text-primary")}
          >
            {t.label}
            {on && (
              <motion.span layoutId={layoutId} transition={{ type: "spring", stiffness: 400, damping: 34 }} className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-primary" />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}