import { motion } from "framer-motion";
// import { fadeUp } from "../animations/variants";
import { useClassmates } from "../hooks/useMyClass";
import ClassListTable from "../components/class-list/ClassListTable";
import { fadeUp } from "@/usersDashboard/parent/features/results/animations/variants";

export default function MyClassPage() {
  const { data: classmates = [] } = useClassmates();

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Class List</h1>
        <p className="text-body-small text-text-secondary mt-1">Student Portal</p>
      </div>
      <ClassListTable classmates={classmates} />
    </motion.div>
  );
}