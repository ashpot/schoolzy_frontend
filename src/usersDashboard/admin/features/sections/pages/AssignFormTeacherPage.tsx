import { useState } from "react";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { FormTeacherAssignment } from "../types";
import { mockAssignments, mockClasses, mockTeachers } from "../data/mockData";
import SplitLayout      from "../components/shared/SplitLayout";
import StatPill         from "../components/shared/StatPill";
import FormTeacherStats from "../components/assign-form-teacher/FormTeacherStats";
import FormTeacherForm  from "../components/assign-form-teacher/FormTeacherForm";
import FormTeacherTable from "../components/assign-form-teacher/FormTeacherTable";

export default function AssignFormTeacherPage() {
  const [assignments, setAssignments] = useState<FormTeacherAssignment[]>(mockAssignments);

  const handleAdd    = (a: FormTeacherAssignment) => setAssignments((p) => [a, ...p]);
  const handleDelete = (id: string)               => setAssignments((p) => p.filter((a) => a.id !== id));

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
        totalClasses={mockClasses.length}
        totalTeachers={mockTeachers.length}
        assigned={assignments.length}
      />
      <SplitLayout
        left={<FormTeacherForm onSuccess={handleAdd} />}
        right={<FormTeacherTable assignments={assignments} onDelete={handleDelete} />}
      />
    </motion.div>
  );
}