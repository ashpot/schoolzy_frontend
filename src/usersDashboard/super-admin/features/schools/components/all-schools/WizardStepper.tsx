import { Fragment } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { WIZARD_STEPS } from "../../utils/constants";

export default function WizardStepper({ current }: { current: number }) {
  return (
    <div role="group" aria-label="Progress" className="flex items-center gap-3">
      {WIZARD_STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const Icon = step.icon;
        return (
          <Fragment key={step.label}>
            <div className="flex shrink-0 items-center gap-2" aria-current={active ? "step" : undefined}>
              <motion.span
                animate={{ scale: active ? 1.08 : 1 }}
                className={cn(
                  "flex-center h-9 w-9 rounded-full text-white transition-colors",
                  done && "bg-sa-green-icon",
                  active && "bg-brand-primary",
                  !done && !active && "bg-sa-gray-soft text-text-muted"
                )}
              >
                {done ? <Check size={16} aria-hidden /> : <Icon size={16} aria-hidden />}
              </motion.span>
              <span
                className={cn(
                  "text-sm",
                  active ? "font-semibold text-text-primary" : "hidden text-text-muted sm:inline"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < WIZARD_STEPS.length - 1 && (
              <span className="relative h-0.5 flex-1 overflow-hidden rounded bg-border-line03" aria-hidden>
                <motion.span
                  className="absolute inset-y-0 left-0 bg-sa-green-icon"
                  initial={false}
                  animate={{ width: i < current ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}