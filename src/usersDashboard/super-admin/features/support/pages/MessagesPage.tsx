import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { fadeUp } from "../animations/variants";
import { useConversations, useMarkRead } from "../hooks/useSupport";
import ChatPanel from "../components/messages/ChatPanel";
import ConversationList from "../components/messages/ConversationList";
import CreateTicketModal from "../components/messages/CreateTicketModal";
import SchoolDetailsPanel from "../components/messages/SchoolDetailsPanel";

export default function MessagesPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useConversations();
  const markRead = useMarkRead();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [ticketOpen, setTicketOpen] = useState(false);
  const deferred = useDeferredValue(search);

  const all = useMemo(() => data ?? [], [data]);
  const visible = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return all.filter((c) => !q || [c.school, c.contact, c.messages[c.messages.length - 1]?.text ?? ""].some((v) => v.toLowerCase().includes(q)));
  }, [all, deferred]);

  const currentId = activeId ?? all[0]?.id ?? null;
  const active = all.find((c) => c.id === currentId) ?? null;

  // Opening a conversation marks it read
  const unread = active?.unread ?? 0;
  useEffect(() => {
    if (currentId && unread > 0) markRead(currentId);
  }, [currentId, unread, markRead]);

  if (isError) return <div className="dashboard-p"><div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div></div>;

  if (isLoading) {
    return (
      <div className="dashboard-p grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)_320px]" aria-busy="true">
        {[0, 1, 2].map((i) => <div key={i} className="h-[640px] animate-pulse rounded-3xl bg-sa-gray-soft" />)}
      </div>
    );
  }

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p">
      {!active ? (
        <div className="rounded-3xl border border-border-line02 bg-white px-6 py-16 text-center text-sm text-text-muted">No conversations yet.</div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)_320px]">
          <ConversationList conversations={visible} activeId={currentId} onSelect={setActiveId} search={search} onSearch={setSearch} />
          <ChatPanel
            key={active.id}
            conversation={active}
            onViewSchool={() => navigate(SA_PATHS.schoolDetail(active.schoolId))}
            onCreateTicket={() => setTicketOpen(true)}
          />
          <div className="lg:col-span-2 xl:col-span-1">
            <SchoolDetailsPanel
              conversation={active}
              onOpenSchool={() => navigate(SA_PATHS.schoolDetail(active.schoolId))}
              onCreateTicket={() => setTicketOpen(true)}
              onViewSubscription={() => navigate(SA_PATHS.activeSubscriptions)}
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {ticketOpen && active && <CreateTicketModal key="create-ticket" conversation={active} onClose={() => setTicketOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}