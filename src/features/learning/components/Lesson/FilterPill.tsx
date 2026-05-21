import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FilterPillProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}

export default function FilterPill({ label, value, options, onChange }: FilterPillProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel =
    value === "" ? label : options.find((o) => o.value === value)?.label ?? label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border-line02)] bg-white text-sm text-[var(--color-text-nav)] hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-1 left-0 z-20 bg-white rounded-xl border border-[var(--color-border-line02)] shadow-lg min-w-[160px] py-1 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  value === ""
                    ? "bg-blue-50 text-[var(--color-brand-primary)]"
                    : "text-[var(--color-text-nav)] hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    value === opt.value
                      ? "bg-blue-50 text-[var(--color-brand-primary)]"
                      : "text-[var(--color-text-nav)] hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}