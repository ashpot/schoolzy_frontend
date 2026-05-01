import React from "react";
import { motion } from "framer-motion";
// import { pageContainer, fadeUp } from "./animation/variant";
import { pageContainer, fadeUp } from "../animation/variant";
import PrimaryStatCards from "../components/PrimaryStatCards";
import SecondaryStatCards  from "../components/SecondaryStatCards";
import MonthlyIncomeChart from "../components/MonthlyIncomeChart";
import AttendanceChart from "../components/AttendanceChart";
import RecentStudentsTable from "../components/RecentStudentsTable";
import ItemsSold from "../components/ItemsSold";
import RecentSales from "../components/RecentSales";

const DashboardPage: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={pageContainer}
      initial="hidden"
      animate="show"
    >
      {/* Page title */}
      <motion.div variants={fadeUp}>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-body-small mt-1">Welcome back, Ben</p>
      </motion.div>

      {/* Primary stat cards */}
      <motion.div variants={fadeUp}>
        <PrimaryStatCards />
      </motion.div>

      {/* Secondary stat cards */}
      <motion.div variants={fadeUp}>
        <SecondaryStatCards />
      </motion.div>

      {/* Charts row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <MonthlyIncomeChart />
        </div>
        <div className="xl:col-span-2">
          <AttendanceChart />
        </div>
      </motion.div>

      {/* Bottom row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <RecentStudentsTable />
        </div>
        <div className="xl:col-span-2 flex flex-col gap-4">
          <ItemsSold />
          <RecentSales />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;