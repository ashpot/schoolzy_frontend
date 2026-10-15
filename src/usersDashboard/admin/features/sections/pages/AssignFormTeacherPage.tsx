import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { useAssignmentsList, useClassGroupsList, useTeacherOptionsList } from "../hooks/useSections";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import FormTeacherStats from "../components/assign-form-teacher/FormTeacherStats";
import FormTeacherForm from "../components/assign-form-teacher/FormTeacherForm";
import FormTeacherTable from "../components/assign-form-teacher/FormTeacherTable";

export default function AssignFormTeacherPage() {
  const { data: assignments = [], isLoading, isError, refetch } = useAssignmentsList();
  const { data: groups = [] } = useClassGroupsList();
  const { data: teachers = [] } = useTeacherOptionsList();

  const assignedClasses = new Set(assignments.map((a) => a.classGroupId)).size;
  const assignedTeachers = new Set(assignments.map((a) => a.teacherId)).size;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Assign Class Form Teacher</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Assign a dedicated form teacher to each class
          </p>
        </div>
        <StatPill icon={Link2} label={`${assignments.length} assigned`} />
      </div>
      <FormTeacherStats
        totalClasses={groups.length}
        totalTeachers={teachers.length}
        assignedClasses={assignedClasses}
        assignedTeachers={assignedTeachers}
      />
      <SplitLayout
        left={<FormTeacherForm />}
        right={
          <FormTeacherTable
            assignments={assignments}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => refetch()}
          />
        }
      />
    </motion.div>
  );
}