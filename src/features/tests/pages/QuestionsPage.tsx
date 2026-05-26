import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import QuestionForm from "@/features/tests/components/questions/QuestionForm"
import QuestionsTable from "../components/questions/QuestionsTable";
import PageHeader from "@/shared/ui/PageHeader";

export default function QuestionsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="dashboard-p space-y-6"
    >
      <PageHeader
        title="Questions"
        subtitle="Manage test questions across all subjects"
        showAdd={false}
      />
      <QuestionForm onQuestionAdded={() => setRefreshKey((k) => k + 1)} />
      <QuestionsTable refreshKey={refreshKey} />
    </motion.div>
  );
}