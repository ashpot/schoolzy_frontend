import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import { mockParentDetails, mockChildren } from "../data/mockData";
import ParentDetailsCard from "../components/dashboard/ParentDetailsCard";
import MyKidsCard from "../components/dashboard/MyKidsCard";

export default function DashboardPage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-body-small text-text-secondary mt-1">Welcome back to your parent portal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ParentDetailsCard parent={mockParentDetails} />
        <MyKidsCard children={mockChildren} />
      </div>
    </motion.div>
  );
}