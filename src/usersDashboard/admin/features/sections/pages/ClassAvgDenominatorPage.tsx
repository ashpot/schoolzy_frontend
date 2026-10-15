import { motion } from "framer-motion";
import { Percent } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { useDenominatorsList } from "../hooks/useSections";
import SplitLayout      from "../components/shared/SplitLayout";
import StatPill         from "../components/shared/StatPill";
import DenominatorForm  from "../components/class-avg-denominator/DenominatorForm";
import DenominatorTable from "../components/class-avg-denominator/DenominatorTable";

export default function ClassAvgDenominatorPage() {
  const { data: denominators = [], isLoading, isError, refetch } = useDenominatorsList();

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Class Average Denominator</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Set the maximum score used to compute class averages per class
          </p>
        </div>
        <StatPill icon={Percent} label={`${denominators.length} configured`} />
      </div>
      <SplitLayout
        left={<DenominatorForm />}
        right={
          <DenominatorTable
            denominators={denominators}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => refetch()}
          />
        }
      />
    </motion.div>
  );
}