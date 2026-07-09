import { motion } from "framer-motion";
// import { fadeUp } from "../animations/variants";
import { useCheckResult } from "../hooks/useMyResults";
import CheckResultForm from "../components/check-results/CheckResultForm";
import ResultStats from "../components/check-results/ResultStats";
import ResultSheetTable from "../components/check-results/ResultSheetTable";
import { fadeUp } from "../../dashboard/animations/variants";

export default function MyResults() {
  const mutation = useCheckResult();

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Check Result</h1>
        <p className="text-body-small text-text-secondary mt-1">
          Select a term and session to view your result sheet.
        </p>
      </div>

      <CheckResultForm onCheck={(v) => mutation.mutate(v)} isLoading={mutation.isPending} />

      {mutation.data && (
        <>
          <ResultStats result={mutation.data} />
          <ResultSheetTable result={mutation.data} />
        </>
      )}
    </motion.div>
  );
}