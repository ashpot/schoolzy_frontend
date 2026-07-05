import { useState } from "react";
import { motion } from "framer-motion";
import { Percent } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { Denominator } from "../types";
import { mockDenominators } from "../data/mockData";
import SplitLayout      from "../components/shared/SplitLayout";
import StatPill         from "../components/shared/StatPill";
import DenominatorForm  from "../components/class-avg-denominator/DenominatorForm";
import DenominatorTable from "../components/class-avg-denominator/DenominatorTable";

export default function ClassAvgDenominatorPage() {
  const [denominators, setDenominators] = useState<Denominator[]>(mockDenominators);

  const handleAdd    = (d: Denominator) => setDenominators((p) => [d, ...p]);
  const handleDelete = (id: string)     => setDenominators((p) => p.filter((d) => d.id !== id));

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
        left={<DenominatorForm onSuccess={handleAdd} />}
        right={<DenominatorTable denominators={denominators} onDelete={handleDelete} />}
      />
    </motion.div>
  );
}