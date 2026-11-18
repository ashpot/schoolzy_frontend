import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { toneBar, toneText } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { UsageEntry } from "../../types";
import { usageBarTone } from "../../utils/tones";

export function InfoCell({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className="rounded-2xl bg-bg-input p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">{label}</p>
      <div className={cn("mt-1.5 text-sm font-semibold text-text-primary", className)}>{children}</div>
    </div>
  );
}

export function DrawerSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border-line02 px-8 py-6">
      <h3 className="mb-4 font-jakarta text-base font-semibold text-text-primary">{title}</h3>
      {children}
    </section>
  );
}

export function DrawerUsage({ label, entry, suffix = "" }: { label: string; entry: UsageEntry; suffix?: string }) {
  const pct = entry.limit > 0 ? Math.min(100, Math.round((entry.used / entry.limit) * 100)) : 0;
  const tone = usageBarTone(pct);

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold text-text-primary">{label}</span>
        <span className={cn("tabular-nums", toneText.gray)}>
          {entry.used.toLocaleString()}{suffix} / {entry.limit.toLocaleString()}{suffix}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-2 overflow-hidden rounded-full bg-sa-gray-line"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn("h-full rounded-full", toneBar[tone])}
        />
      </div>
    </div>
  );
}