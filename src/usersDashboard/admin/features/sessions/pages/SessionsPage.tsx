import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockSessions } from "../data/mockData";
import type { Session } from "../types";
import type { SessionValues } from "../schemas";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import SessionForm from "../components/sessions-page/SessionForm";
import SessionsTable from "../components/sessions-page/SessionsTable";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);

  const activeSession = sessions.find((s) => s.isActive);

  const handleCreate = (values: SessionValues) => {
    const newSession: Session = {
      id:        String(Date.now()),
      name:      values.name,
      startDate: values.startDate,
      endDate:   values.endDate,
      isActive:  values.isActive,
    };
    setSessions((prev) =>
      values.isActive
        ? [...prev.map((s) => ({ ...s, isActive: false })), newSession]
        : [...prev, newSession]
    );
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
    </motion.div>
  );
}