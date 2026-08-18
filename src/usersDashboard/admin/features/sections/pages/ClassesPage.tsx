import { useState } from "react";
import { motion } from "framer-motion";
import { School } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { Class } from "../types";
import { mockClasses } from "../data/mockData";
import SplitLayout  from "../components/shared/SplitLayout";
import StatPill     from "../components/shared/StatPill";
import ClassForm    from "../components/classes/ClassForm";
import ClassesTable from "../components/classes/ClassesTable";
import ClassCreatedModal from "../components/shared/ClassCreateModal";

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [createdClass, setCreatedClass] = useState<Class | null>(null);

  const handleAdd = (c: Class) => {
    setClasses((p) => [c, ...p]);
    setCreatedClass(c);
  };
  const handleDelete = (id: string) => setClasses((p) => p.filter((c) => c.id !== id));

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
        left={<ClassForm onSuccess={handleAdd} />}
        right={<ClassesTable classes={classes} onDelete={handleDelete} />}
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