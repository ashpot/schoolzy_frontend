import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockTerms, mockSessions } from "../data/mockData";
import type { Term } from "../types";
import type { TermValues } from "../schemas";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import TermForm from "../components/terms-page/TermForm";
import TermsTable from "../components/terms-page/TermsTable";

export default function TermsPage() {
  const [terms, setTerms] = useState<Term[]>(mockTerms);

  const activeTerm    = terms.find((t) => t.isActive);
  const activeSession = mockSessions.find((s) => s.isActive);

  const handleCreate = (values: TermValues) => {
    const session = mockSessions.find((s) => s.id === values.sessionId);
    const newTerm: Term = {
      id:              String(Date.now()),
      name:            values.name,
      sessionId:       values.sessionId,
      sessionName:     session?.name ?? "",
      tag:             values.tag,
      startDate:       values.startDate,
      endDate:         values.endDate,
      isActive:        values.isActive,
      resultPublished: values.resultPublished,
    };
    setTerms((prev) =>
      values.isActive
        ? [...prev.map((t) => ({ ...t, isActive: false })), newTerm]
        : [...prev, newTerm]
    );
  };

  const handleDelete = (id: string) => {
    setTerms((prev) => prev.filter((t) => t.id !== id));
  };

  const statLabel = activeTerm
    ? `Active: ${activeTerm.name} — ${activeSession?.name ?? ""}`
    : "No active term";

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Terms</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Manage academic terms, result publication, and active status
          </p>
        </div>
        <StatPill icon={BookOpen} label={statLabel} />
      </div>

      <SplitLayout
        left={<TermForm onSuccess={handleCreate} />}
        right={<TermsTable terms={terms} onDelete={handleDelete} />}
      />
    </motion.div>
  );
}