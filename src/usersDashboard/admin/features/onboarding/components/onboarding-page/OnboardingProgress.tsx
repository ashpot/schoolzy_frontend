import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface Props {
  percentage: number;
  completed: number;
  total: number;
  score: number;
  status: string;
}

export default function OnboardingProgress({ percentage, completed, total, score, status }: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="page-title">Welcome to Schoolzy</h1>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-input border border-border-line02 px-3 py-1 text-xs font-medium text-text-muted01">
          <Activity size={13} className="text-success" />
          {score} · {status}
        </span>
      </div>
      <p className="text-body-small text-text-secondary mt-1">
        Finish these steps to get your school up and running.
      </p>

      <div className="mt-5 h-2.5 w-full rounded-full bg-border-line02 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-brand-primary"
        />
      </div>
      <p className="mt-2 text-sm text-text-secondary">
        {percentage}% Complete · {completed}/{total} items
      </p>
    </div>
  );
}