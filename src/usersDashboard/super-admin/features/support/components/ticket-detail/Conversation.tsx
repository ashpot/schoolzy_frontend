import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { bubbleVariant, staggerContainer } from "../../animations/variants";
import type { TicketMessage } from "../../types";
import { formatStamp } from "../../utils/format";

function Bubble({ m }: { m: TicketMessage }) {
  const school = m.author === "school";
  const note = m.author === "note";
  return (
    <motion.li variants={bubbleVariant} className={cn("flex items-end gap-3", !school && "flex-row-reverse")}>
      <span className={cn("flex-center h-10 w-10 shrink-0 rounded-full text-xs font-semibold", school ? "bg-sa-green-soft text-sa-green-text" : "bg-sa-blue-soft text-sa-blue-text")}>
        {school ? "S" : "SA"}
      </span>
      <div className={cn("max-w-[78%]", !school && "text-right")}>
        <p className="mb-1 text-xs text-text-muted">
          <span className="font-semibold text-text-primary">{m.name}</span> {formatStamp(m.at)}
          {note && <span className="ml-2 rounded-full bg-sa-amber-soft px-2 py-0.5 text-sa-amber-text">Internal note</span>}
        </p>
        <p className={cn("whitespace-pre-wrap rounded-2xl px-5 py-3 text-left text-sm", school ? "bg-bg-input text-text-primary" : note ? "bg-sa-amber-soft text-text-primary" : "bg-sa-blue-soft text-text-primary")}>
          {m.text}
        </p>
      </div>
    </motion.li>
  );
}

export default function Conversation({ messages }: { messages: TicketMessage[] }) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <section className="rounded-3xl border border-border-line02 bg-white" aria-labelledby="sa-convo-title">
      <h2 id="sa-convo-title" className="border-b border-border-line02 px-6 py-5 font-jakarta text-lg font-semibold text-text-primary">Conversation</h2>
      <div ref={boxRef} className="max-h-[420px] overflow-y-auto p-6">
        {messages.length === 0 ? (
          <p className="py-10 text-center text-sm text-text-muted">No messages yet.</p>
        ) : (
          <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-6" aria-live="polite">
            {messages.map((m) => <Bubble key={m.id} m={m} />)}
          </motion.ul>
        )}
      </div>
    </section>
  );
}