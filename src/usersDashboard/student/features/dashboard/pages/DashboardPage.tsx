import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import { useStudentDetails, useMySubjects } from "../hooks/useDashboard";
import StudentDetailsCard from "../components/dashboard/StudentDetailsCard";
import SubjectsTable from "../components/dashboard/SubjectsTable";

export default function DashboardPage() {
  const { data: student } = useStudentDetails();
  const { data: subjects = [] } = useMySubjects();

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-body-small text-text-secondary mt-1">Student Portal</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-start">
        {student && <StudentDetailsCard student={student} />}
        <SubjectsTable subjects={subjects} />
      </div>
    </motion.div>
  );
}