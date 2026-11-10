import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ListChecks, Users } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { useScoresheetSession } from "../hooks/useScoresheetSession";
import ResultSetup from "../components/upload-results/ResultSetup";
import ResultsScoreCard from "../components/upload-results/ResultsScoreCard";
import ResultsFooter from "../components/upload-results/ResultsFooter";
import ScoreBreakdownPills from "../components/upload-results/ScoreBreakdownPills";
import DiscardChangesModal from "../components/upload-results/DiscardChangesModal";
import EmptyState from "../components/shared/EmptyState";

export default function UploadResultsPage() {
  const s = useScoresheetSession();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { sheet } = s;

  const changeSetup = () => (s.changedCount > 0 ? setConfirmOpen(true) : s.clear());
  const discard = () => { s.clear(); setConfirmOpen(false); };
  const entryReady = !!sheet && sheet.columns.length > 0 && sheet.rows.length > 0;

  const renderBody = () => {
    if (!sheet) {
      return (
        <EmptyState icon={BookOpen} title="Ready for result entry"
          description={<>Select a term, class group and subject above, then click{" "}
            <span className="font-semibold text-text-primary">Load Scoresheet</span> to begin entering results</>} />
      );
    }
    if (sheet.columns.length === 0) {
      return (
        <EmptyState icon={ListChecks} title="No assessment types for this section"
          description="Add them under Academics → Assessment Types, then load the scoresheet again." />
      );
    }
    if (sheet.rows.length === 0) {
      return (
        <EmptyState icon={Users} title="No students on this scoresheet"
          description={`No students are listed for ${sheet.term} · ${sheet.session}. They may need to be enrolled for this session before scores can be entered.`} />
      );
    }
    return (
      <ResultsScoreCard sheet={sheet} inputs={s.inputs} original={s.original} search={s.search}
        onSearchChange={s.setSearch} onChange={s.setScore} />
    );
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6 pb-28">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Upload Results</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Enter scores per assessment type. Each one counts toward the term total by its percentage
          </p>
        </div>
        {sheet && sheet.columns.length > 0 && <ScoreBreakdownPills columns={sheet.columns} />}
      </div>

      <ResultSetup locked={!!sheet} isLoading={s.loading} error={s.loadError}
        onLoad={s.load} onChangeSetup={changeSetup} />

      {renderBody()}

      {entryReady && sheet && (
        <ResultsFooter sheet={sheet} changedCount={s.changedCount} problemCount={s.problemCount}
          isSaving={s.isSaving} saveError={s.saveError} saved={s.saved}
          onReset={s.resetChanges} onSave={s.save} />
      )}

      <AnimatePresence>
        {confirmOpen && (
          <DiscardChangesModal count={s.changedCount} onKeep={() => setConfirmOpen(false)} onDiscard={discard} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}