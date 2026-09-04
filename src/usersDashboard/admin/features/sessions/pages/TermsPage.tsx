import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { useTermsList } from "../hooks/useSessions";
import { useSessionsList } from "../hooks/useSessions";
import type { Term, TermResponse } from "../types";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import TermForm from "../components/terms-page/TermForm";
import TermsTable from "../components/terms-page/TermsTable";
import SessionCreatedModal from "../components/shared/SessionCreateModal";

export default function TermsPage() {
  const { data: termsData, isLoading: termsLoading, isError: termsError, error: termsErrObj } = useTermsList();
  const { data: sessionsData, isLoading: sessionsLoading } = useSessionsList();
  const [createdTerm, setCreatedTerm] = useState<Term | null>(null);

  const isLoading = termsLoading || sessionsLoading;

  // Map session id -> session name for display, since /academics/terms/
  // only returns the session FK id, not its name.
  const sessionNameById = new Map(
    (sessionsData ?? []).map((s) => [s.id, s.name])
  );

  const toTerm = (item: TermResponse): Term => ({
    id: String(item.id),
    name: item.name,
    sessionId: String(item.session),
    sessionName: sessionNameById.get(item.session) ?? "Unknown session",
    tag: (item.tag === "1" ? "1st" : item.tag === "2" ? "2nd" : "3rd") as Term["tag"],
    startDate: item.start_date,
    endDate: item.end_date,
    isActive: item.is_active,
    resultPublished: item.result_published,
  });

  const terms = (termsData ?? []).map(toTerm);
  const activeTerm = terms.find((t) => t.isActive);

  const handleCreate = (term: Term) => {
    setCreatedTerm(term);
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

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Loading terms…</span>
        </div>
      ) : termsError ? (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-danger text-sm">
          <AlertCircle size={16} />
          {termsErrObj instanceof Error ? termsErrObj.message : "Failed to load terms."}
        </div>
      ) : (
        <SplitLayout
          left={<TermForm onSuccess={handleCreate} />}
          right={<TermsTable terms={terms} onDelete={() => {}} />}
        />
      )}

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