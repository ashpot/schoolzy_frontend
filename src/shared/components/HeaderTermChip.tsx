import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CalendarDays, ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";

// TODO: Replace with the active term/session from the API
// (GET /academics/terms/ and /academics/sessions/, pick is_active === true)
const CURRENT_TERM = "First Term";
const CURRENT_SESSION = "2026/2027";

export default function HeaderTermChip() {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => open && setOpen(false));

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[13px] font-lato font-medium transition-colors",
          open
            ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
            : "border-border-line02 bg-white text-text-muted01 hover:bg-bg-soft"
        )}
      >
        <BookOpen className="w-3.5 h-3.5 text-text-muted" />
        <span>{CURRENT_TERM}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-text-muted transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } }}
            className="absolute right-0 top-full z-30 mt-2 w-60 origin-top-right rounded-xl border border-border-line02 bg-white p-4 shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-100 bg-green-50 text-green-700">
                <CalendarDays className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-text-muted">Current term</p>
                <p className="truncate text-sm font-semibold text-text-primary">{CURRENT_TERM}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border-line02 pt-3">
              <span className="text-xs text-text-muted">Session</span>
              <span className="text-sm font-semibold text-text-primary">{CURRENT_SESSION}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}