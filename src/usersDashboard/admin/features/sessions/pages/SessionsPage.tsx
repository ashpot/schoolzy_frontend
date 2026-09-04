import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Loader2, AlertCircle } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { useSessionsList } from "../hooks/useSessions";
import type { Session, SessionListItem } from "../types";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import SessionForm from "../components/sessions-page/SessionForm";
import SessionsTable from "../components/sessions-page/SessionsTable";
import SessionCreatedModal from "../components/shared/SessionCreateModal";

// API shape → UI shape
function toSession(item: SessionListItem): Session {
  return {
    id: String(item.id),
    name: item.name,
    startDate: item.start_date,
    endDate: item.end_date,
    isActive: item.is_active,
  };
}

export default function SessionsPage() {
  const { data, isLoading, isError, error } = useSessionsList();
  const [createdSession, setCreatedSession] = useState<Session | null>(null);

  const sessions = (data ?? []).map(toSession);
  const activeSession = sessions.find((s) => s.isActive);

  // Query invalidation (see useCreateSession) refetches the list on success,
  // so we only need this to drive the "created" confirmation modal.
  const handleCreate = (session: Session) => {
    setCreatedSession(session);
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Sessions</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Manage academic sessions and set the active one
          </p>
        </div>
        {activeSession && (
          <StatPill icon={CalendarDays} label={`Active: ${activeSession.name}`} />
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Loading sessions…</span>
        </div>
      ) : isError ? (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-danger text-sm">
          <AlertCircle size={16} />
          {error instanceof Error ? error.message : "Failed to load sessions."}
        </div>
      ) : (
        <SplitLayout
          left={<SessionForm onSuccess={handleCreate} />}
          right={<SessionsTable sessions={sessions} onDelete={() => {}} />}
        />
      )}

      <SessionCreatedModal
        isOpen={!!createdSession}
        onClose={() => setCreatedSession(null)}
        title="Session Created"
        name={createdSession?.name ?? ""}
        id={createdSession?.id ?? ""}
      />
    </motion.div>
  );
}