import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import SplitLayout from "../components/shared/SplitLayout";
import TeacherDetailsCard from "../components/dashboard/TeacherDetailsCard";
import MySubjectsCard from "../components/dashboard/MySubjectsCard";

export default function DashboardPage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <SplitLayout left={<TeacherDetailsCard />} right={<MySubjectsCard />} />
    </motion.div>
  );
}