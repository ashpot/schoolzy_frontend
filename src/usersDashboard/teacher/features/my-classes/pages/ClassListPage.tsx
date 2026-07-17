import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import ClassListFilterForm from "../components/class-list/ClassListFilterForm";
import EnrolledStudentsTable from "../components/class-list/EnrolledStudentsTable";
import { useLoadStudents } from "../hooks/useClassList";
import { classOptions } from "../data/mockData";
import type { ClassListFilterValues } from "../schemas";

export default function ClassListPage() {
  const loadStudents = useLoadStudents();

  const onSubmit = (values: ClassListFilterValues) => {
    loadStudents.mutate(values);
  };

  const selectedClassLabel =
    classOptions.find((c) => c.value === loadStudents.variables?.classId)?.label ?? "";

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <ClassListFilterForm onSubmit={onSubmit} isLoading={loadStudents.isPending} />

      {loadStudents.data && (
        <EnrolledStudentsTable className={selectedClassLabel} students={loadStudents.data} />
      )}
    </motion.div>
  );
}