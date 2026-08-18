import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockSessions } from "../data/mockData";
import type { Session } from "../types";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import SessionForm from "../components/sessions-page/SessionForm";
import SessionsTable from "../components/sessions-page/SessionsTable";
import SessionCreatedModal from "../components/shared/SessionCreateModal";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [createdSession, setCreatedSession] = useState<Session | null>(null);

  const activeSession = sessions.find((s) => s.isActive);

  const handleCreate = (session: Session) => {
    setSessions((prev) =>
      session.isActive
        ? [...prev.map((s) => ({ ...s, isActive: false })), session]
        : [session, ...prev]
    );
    setCreatedSession(session);
  };

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
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

      <SplitLayout
        left={<SessionForm onSuccess={handleCreate} />}
        right={<SessionsTable sessions={sessions} onDelete={handleDelete} />}
      />

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