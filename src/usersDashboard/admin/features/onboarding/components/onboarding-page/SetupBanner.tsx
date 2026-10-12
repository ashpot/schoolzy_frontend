import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useOnboarding } from "../../hooks/useOnboarding";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Module-level on purpose:
// - survives route changes (Routes remounts on every pathname change)
// - resets on a full page reload, so the card comes back
let dismissedThisLoad = false;

export default function SetupBanner() {
  const { data } = useOnboarding();
  const [dismissed, setDismissed] = useState(dismissedThisLoad);

  const skip = () => {
    dismissedThisLoad = true;
    setDismissed(true);
  };

  const show = !!data && !data.onboarding.completed && !dismissed;
  const percentage = data?.onboarding.progress.percentage ?? 0;
  const nextLabel = data?.onboarding.next_action?.label;

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } }}
          exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.2 } }}
          className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] sm:w-80 rounded-2xl border border-border-line02 bg-white p-4 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0">
              <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90">
                <circle cx="24" cy="24" r={RADIUS} fill="none" strokeWidth="4" className="stroke-border-line02" />
                <motion.circle
                  cx="24"
                  cy="24"
                  r={RADIUS}
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="stroke-brand-primary"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - percentage / 100) }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute inset-0 flex-center text-xs font-semibold text-text-primary">
                {percentage}%
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                <Sparkles size={14} className="text-brand-primary" />
                Finish setting up your school
              </h3>
              <p className="mt-0.5 truncate text-xs text-text-secondary">
                {nextLabel ? `Next: ${nextLabel}` : "You're almost there"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Link
              to="/onboarding"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover transition-colors"
            >
              Continue setup <ArrowRight size={14} />
            </Link>
            <button
              type="button"
              onClick={skip}
              className="rounded-lg border border-border-line02 px-4 py-2 text-sm font-medium text-text-muted01 hover:bg-bg-soft transition-colors"
            >
              Skip for now
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}