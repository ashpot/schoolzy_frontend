import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { rowVariant } from "../../animations/variants";
import type { OnboardingStep } from "../../types";
import { countDone, getStepStartRoute, type StepStatus } from "../../utils/onboardingUtils";
import StepItemList from "./StepItemList";

interface Props {
  step: OnboardingStep;
  status: StepStatus;
}

const CARD_STYLES: Record<StepStatus, string> = {
  active: "border-brand-primary ring-2 ring-brand-primary/10",
  done: "border-border-line02",
  locked: "border-border-line02 opacity-60",
};

export default function StepCard({ step, status }: Props) {
  const { done, total } = countDone(step);

  return (
    <motion.div
      variants={rowVariant}
      className={`bg-white rounded-2xl border p-5 card-shadow ${CARD_STYLES[status]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="section-title">{step.title}</h3>
            {status === "active" && (
              <span className="rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-xs font-medium text-brand-primary">
                Next up
              </span>
            )}
            <span className="text-xs text-text-muted">{done}/{total} done</span>
          </div>
          <p className="text-body-small text-text-secondary mt-1">{step.description}</p>
        </div>

        {status === "done" && <CheckCircle2 size={28} className="shrink-0 text-success" />}
        {status === "active" && (
          <Link
            to={getStepStartRoute(step)}
            className="shrink-0 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-hover transition-colors"
          >
            {done > 0 ? "Continue" : "Start"}
          </Link>
        )}
        {status === "locked" && (
          <span
            aria-disabled="true"
            className="shrink-0 cursor-not-allowed rounded-lg bg-bg-soft px-6 py-2.5 text-sm font-medium text-text-muted"
          >
            Start
          </span>
        )}
      </div>

      <StepItemList items={step.items} locked={status === "locked"} />
    </motion.div>
  );
}