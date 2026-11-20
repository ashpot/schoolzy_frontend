import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { staggerContainer } from "../../animations/variants";
import type { Ticket } from "../../types";
import { formatDay, formatStamp } from "../../utils/format";
import { rowVariant } from "../../../analytics/animations/variants";

export default function ActivityTimeline({ ticket }: { ticket: Ticket }) {
  const replies = ticket.messages.filter((m) => m.author === "agent");
  const latest = replies[replies.length - 1];
  const steps = [
    { label: "Ticket Created", when: formatDay(ticket.createdAt), done: true },
    { label: "Assigned", when: ticket.agent ? formatDay(ticket.createdAt) : "—", done: Boolean(ticket.agent) },
    { label: "First Response", when: ticket.firstResponseAt ? formatStamp(ticket.firstResponseAt) : "—", done: Boolean(ticket.firstResponseAt) },
    { label: "Latest Reply", when: latest ? formatStamp(latest.at) : "—", done: Boolean(latest) },
    { label: "Resolved", when: ticket.resolvedAt ? formatDay(ticket.resolvedAt) : "—", done: Boolean(ticket.resolvedAt) },
  ];

  return (
    <section className="rounded-3xl border border-border-line02 bg-white p-6" aria-labelledby="sa-ticket-activity">
      <h2 id="sa-ticket-activity" className="font-jakarta text-lg font-semibold text-text-primary">Activity Timeline</h2>
      <motion.ol variants={staggerContainer} initial="hidden" animate="show" className="mt-4">
        {steps.map((s, i) => (
          <motion.li key={s.label} variants={rowVariant} className="relative flex gap-4 pb-5 last:pb-0">
            {i < steps.length - 1 && <span aria-hidden className="absolute bottom-0 left-[13px] top-8 w-px bg-sa-green-line" />}
            <span className={cn("flex-center h-7 w-7 shrink-0 rounded-full", s.done ? "bg-sa-green-icon text-white" : "bg-sa-gray-soft text-sa-gray-icon")}>
              {s.done ? <Check size={14} aria-hidden /> : <Clock size={14} aria-hidden />}
            </span>
            <div>
              <p className={cn("text-sm font-semibold", s.done ? "text-text-primary" : "text-text-muted")}>{s.label}</p>
              <p className="text-xs text-text-muted">{s.when}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}