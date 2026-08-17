import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockTerms } from "../data/mockData";
import type { Term } from "../types";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import TermForm from "../components/terms-page/TermForm";
import TermsTable from "../components/terms-page/TermsTable";
import SessionCreatedModal from "../components/shared/SessionCreateModal";

export default function TermsPage() {
  const [terms, setTerms] = useState<Term[]>(mockTerms);
  const [createdTerm, setCreatedTerm] = useState<Term | null>(null);

  const activeTerm = terms.find((t) => t.isActive);

  const handleCreate = (term: Term) => {
    setTerms((prev) =>
      term.isActive
        ? [...prev.map((t) => ({ ...t, isActive: false })), term]
        : [term, ...prev]
    );
    setCreatedTerm(term);
  };

  const handleDelete = (id: string) => {
    setTerms((prev) => prev.filter((t) => t.id !== id));
  };

  const statLabel = activeTerm
    ? `Active: ${activeTerm.name} — ${activeTerm.sessionName}`
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

      <SessionCreatedModal
        isOpen={!!createdTerm}
        onClose={() => setCreatedTerm(null)}
        title="Term Created"
        name={createdTerm?.name ?? ""}
        id={createdTerm?.id ?? ""}
      />
    </motion.div>
  );
}