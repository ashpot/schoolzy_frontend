import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Crown } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { formatNaira, getPlanTone, getSchoolDetails } from "@/shared/utils/planUtils";

export default function HeaderPlanChip() {
  const [open, setOpen] = useState(false);
  const [details] = useState(getSchoolDetails);
  const ref = useOutsideClick(() => open && setOpen(false));

  if (!details?.subscription_plan) return null;

  const plan = details.subscription_plan;
  const tone = getPlanTone(plan);
  const isFree = plan.toLowerCase() === "free";

  return (
    <div ref={ref} className="relative hidden md:block">
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
        <span className="relative flex h-2 w-2">
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", tone.dot)} />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", tone.dot)} />
        </span>
        <span>{plan}</span>
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
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg border", tone.badge)}>
                <Crown className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-text-muted">Current plan</p>
                <p className="truncate text-sm font-semibold text-text-primary">{plan}</p>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-border-line02 pt-3">
              <span className="text-xs text-text-muted">Price</span>
              <span className="text-sm font-semibold text-text-primary">
                {formatNaira(details.subscription_price)}
                {!isFree && <span className="text-xs font-normal text-text-muted"> /month</span>}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}