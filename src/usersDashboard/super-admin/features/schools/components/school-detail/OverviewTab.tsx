import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/variants";
import type { SchoolDetail } from "../../types/detail";
import SchoolInfoCard from "./SchoolInfoCard";
import AdminInfoCard from "./AdminInfoCard";
import UsageSummaryCard from "./UsageSummaryCard";
import SubscriptionOverviewCard from "./SubscriptionOverviewCard";

export default function OverviewTab({ school }: { school: SchoolDetail }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid items-start gap-6 xl:grid-cols-2">
      <div className="space-y-6">
        <motion.div variants={fadeUp}><SchoolInfoCard school={school} /></motion.div>
        <motion.div variants={fadeUp}><SubscriptionOverviewCard school={school} /></motion.div>
      </div>
      <div className="space-y-6">
        <motion.div variants={fadeUp}><AdminInfoCard school={school} /></motion.div>
        <motion.div variants={fadeUp}><UsageSummaryCard school={school} /></motion.div>
      </div>
    </motion.div>
  );
}