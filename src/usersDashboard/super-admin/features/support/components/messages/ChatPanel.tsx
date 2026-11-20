import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Paperclip, Send, Smile } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import { initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import { bubbleVariant } from "../../animations/variants";
import { chatSchema, type ChatValues } from "../../schemas";
import { useSendMessage } from "../../hooks/useSupport";
import type { Conversation } from "../../types";
import { formatClock } from "../../utils/format";

interface ChatPanelProps {
  conversation: Conversation;
  onViewSchool: () => void;
  onCreateTicket: () => void;
}

const iconBtn = "flex-center h-11 w-11 shrink-0 rounded-xl border border-border-line02 text-text-muted opacity-60";

export default function ChatPanel({ conversation: c, onViewSchool, onCreateTicket }: ChatPanelProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const mutation = useSendMessage();
  const { register, handleSubmit, watch, reset } = useForm<ChatValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { text: "" },
  });
  const empty = !watch("text")?.trim();

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [c.id, c.messages.length]);

  const onSubmit = (v: ChatValues) => {
    mutation.mutate({ id: c.id, text: v.text }, { onSuccess: () => reset({ text: "" }) });
  };

  return (
    <section className="flex h-[640px] flex-col overflow-hidden rounded-3xl border border-border-line02 bg-white" aria-label={`Chat with ${c.school}`}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border-line02 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className={cn("flex-center h-11 w-11 rounded-xl text-sm font-semibold", schoolTileClass(c.school))}>{initials2(c.school)}</span>
          <div>
            <p className="font-semibold text-text-primary">{c.school}</p>
            <p className="text-xs text-text-secondary">{c.contact} · <span className={c.online ? "text-sa-green-text" : "text-text-muted"}>{c.online ? "Online" : "Offline"}</span></p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" size="sm" onClick={onViewSchool}>View School</Button>
          <Button type="button" variant="primary" size="sm" onClick={onCreateTicket}>Create Ticket</Button>
        </div>
      </header>

      <div ref={boxRef} className="flex-1 overflow-y-auto p-6">
        <ul className="space-y-5" aria-live="polite">
          <AnimatePresence initial={false}>
            {c.messages.map((m) => {
              const mine = m.from === "admin";
              return (
                <motion.li key={m.id} variants={bubbleVariant} initial="hidden" animate="show" className={cn("flex items-end gap-3", mine && "flex-row-reverse")}>
                  <span className={cn("flex-center h-9 w-9 shrink-0 rounded-full text-[11px] font-semibold", mine ? "bg-sa-blue-soft text-sa-blue-text" : "bg-sa-green-soft text-sa-green-text")}>
                    {mine ? "SA" : initials2(c.school)}
                  </span>
                  <div className={cn("max-w-[75%]", mine && "text-right")}>
                    <p className={cn("whitespace-pre-wrap rounded-2xl px-4 py-3 text-left text-sm", mine ? "bg-brand-primary text-white" : "bg-bg-input text-text-primary")}>{m.text}</p>
                    <p className="mt-1 flex items-center justify-end gap-1 text-[11px] text-text-muted">
                      {!mine && <span className="mr-auto" />}
                      {formatClock(m.at)} {mine && <CheckCheck size={13} className={m.read ? "text-brand-primary" : "text-text-muted"} aria-label={m.read ? "Read" : "Sent"} />}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex items-center gap-3 border-t border-border-line02 p-4">
        {/* TODO: enable emoji and attachments once supported */}
        <button type="button" disabled title="Coming soon" aria-label="Emoji" className={iconBtn}><Smile size={16} /></button>
        <button type="button" disabled title="Coming soon" aria-label="Attach file" className={iconBtn}><Paperclip size={16} /></button>
        <input
          type="text"
          placeholder="Type a message..."
          aria-label="Message"
          autoComplete="off"
          disabled={mutation.isPending}
          className="min-w-0 flex-1 rounded-xl border border-border-line02 bg-bg-input px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          {...register("text")}
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={empty || mutation.isPending}
          className="flex-center h-11 w-11 shrink-0 rounded-xl bg-brand-primary text-white transition-opacity disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}