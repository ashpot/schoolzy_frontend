import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Crown } from "lucide-react";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { formatNaira, getPlanTone, getSchoolDetails } from "../../utils/planUtils";

export default function PlanBadge() {
  const [open, setOpen] = useState(false);
  const [details] = useState(getSchoolDetails);
  const ref = useOutsideClick(() => setOpen(false));

  if (!details?.subscription_plan) return null;

  const tone = getPlanTone(details.subscription_plan);
  const isFree = details.subscription_plan.toLowerCase() === "free";

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tone.badge}`}
      >
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${tone.dot}`} />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${tone.dot}`} />
        </span>
        {details.subscription_plan}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={12} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -6, scale: 0.95, transition: { duration: 0.15 } }}
            className="absolute right-0 top-full z-20 mt-2 w-56 origin-top-right rounded-xl border border-border-line02 bg-white p-4 shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${tone.badge}`}>
                <Crown size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-text-muted">Current plan</p>
                <p className="truncate text-sm font-semibold text-text-primary">
                  {details.subscription_plan}
                </p>
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