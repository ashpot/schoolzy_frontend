import { useState } from "react";
import { motion } from "framer-motion";
import { School } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { ClassListItem } from "../types";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import ClassForm from "../components/classes/ClassForm";
import ClassesTable from "../components/classes/ClassesTable";
import { useClassesList } from "../hooks/useSections";
import ClassCreatedModal from "../components/shared/ClassCreateModal";

export default function ClassesPage() {
  const { data: classes = [] } = useClassesList();
  const [createdClass, setCreatedClass] = useState<ClassListItem | null>(null);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Classes</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Manage academic classes and their section assignments
          </p>
        </div>
        <StatPill icon={School} label={`${classes.length} classes`} />
      </div>
      <SplitLayout
        left={<ClassForm onSuccess={setCreatedClass} />}
        right={<ClassesTable classes={classes} />}
      />

      <ClassCreatedModal
        isOpen={!!createdClass}
        onClose={() => setCreatedClass(null)}
        title="Class Created"
        name={createdClass?.name ?? ""}
        id={createdClass?.id ?? ""}
      />
    </motion.div>
  );
}