import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Eye, Download, BarChart2 } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { ViewScore } from "../types";
import type { ViewScoresFilterValues } from "../schemas/viewScores";
import ScoresFilters     from "../components/view-scores/ScoresFilters";
import PageHeaderStats   from "../components/view-scores/PageHeaderStats";
import ScoreStatsRow     from "../components/view-scores/ScoreStatsRow";
import GradeDistribution from "../components/view-scores/GradeDistribution";
import ScoresTable       from "../components/view-scores/ScoresTable";
import EmptyState        from "../components/shared/EmptyState";

export default function ViewScoresPage() {
  const [scores,        setScores]        = useState<ViewScore[]>([]);
  const [activeFilters, setActiveFilters] = useState<ViewScoresFilterValues | null>(null);

  const handleLoad = (filters: ViewScoresFilterValues, loaded: ViewScore[]) => {
    setActiveFilters(filters);
    setScores(loaded);
  };

  const isLoaded = scores.length > 0;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">View Uploaded Scores</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Browse previously uploaded results by class, group, subject and term
          </p>
        </div>
        {isLoaded && <PageHeaderStats scores={scores} />}
      </div>

      <ScoresFilters isLoaded={isLoaded} activeFilters={activeFilters} onLoad={handleLoad} />

      {isLoaded ? (
        <>
          <ScoreStatsRow     scores={scores} />
          <GradeDistribution scores={scores} />
          <ScoresTable       scores={scores} />
        </>
      ) : (
        <EmptyState
          icon={ClipboardList}
          title="No scores loaded yet"
          description={<>Choose a class, group, subject and term above, then click{" "}<span className="font-semibold text-text-primary">Load Scores</span> to view uploaded results</>}
          hintPills={[
            { icon: Eye,       label: "Read-only view"   },
            { icon: Download,  label: "CSV & PDF export" },
            { icon: BarChart2, label: "Grade breakdown"  },
          ]}
        />
      )}
    </motion.div>
  );
}