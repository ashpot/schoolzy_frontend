import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, FileEdit, Info, Loader2, SearchX } from "lucide-react";
import PageHeader from "@/shared/ui/PageHeader";
import ActiveFiltersBar from "../components/manage-scores/ActiveFiltersBar";
import ScoreFilterForm from "../components/manage-scores/ScoreFilterForm";
import ScoresTable from "../components/manage-scores/ScoresTable";
import SummaryPlaceholder from "../components/attendance-summaries/SummaryPlaceholder";
import { useScoresList } from "../hooks/useManageScore";
import { useScoreEditor } from "../hooks/useScoreEditor";
import type { ScoreFilters } from "../types/manageScore";

const ManageScoresPage: React.FC = () => {
  const [filters, setFilters] = useState<ScoreFilters | null>(null);
  const query = useScoresList(filters);
  const editor = useScoreEditor(query.data, filters?.max ?? null);

  const handleLoad = (next: ScoreFilters) => {
    const same =
      filters?.classGroupId === next.classGroupId && filters?.termId === next.termId &&
      filters?.subjectId === next.subjectId && filters?.assessmentTypeId === next.assessmentTypeId;
    if (same) query.refetch();
    else setFilters(next);
  };

  const renderBody = () => {
    if (!filters) {
      return (
        <SummaryPlaceholder icon={<FileEdit className="w-9 h-9 text-brand-primary" />} title="No scores loaded yet"
          text={<>Fill in the filters above then click <span className="font-semibold text-text-nav">Load Scores</span> to get started</>} />
      );
    }
    if (query.isLoading) {
      return <SummaryPlaceholder icon={<Loader2 className="w-9 h-9 text-brand-primary animate-spin" />} title="Loading scores..." text="Fetching uploaded scores" />;
    }
    if (query.error) {
      return <SummaryPlaceholder icon={<AlertCircle className="w-9 h-9 text-danger" />} title="Couldn't load scores" text={query.error.message} />;
    }
    if (editor.rows.length === 0) {
      return (
        <SummaryPlaceholder icon={<SearchX className="w-9 h-9 text-brand-primary" />} title="No scores found"
          text="No scores have been uploaded for these filters yet. Use Upload Results to add them." />
      );
    }
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 mt-6">
        <ActiveFiltersBar filters={filters.labels.map((label) => ({ label }))} />
        {/* TODO: remove this notice once the score update endpoint is wired */}
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100 text-sm text-amber-700">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          Score editing isn't connected to the server yet. Changes are kept on this page only and are lost when you leave or reload.
        </div>
        <ScoresTable editor={editor} max={filters.max} />
      </motion.div>
    );
  };

  return (
    <div>
      <PageHeader
        title="Manage Scores"
        subtitle="View scores already uploaded, filtered by class group, subject, assessment type and term."
        showAdd={false}
      />
      <ScoreFilterForm isLoading={query.isFetching} onLoad={handleLoad} />
      {renderBody()}
    </div>
  );
};

export default ManageScoresPage;