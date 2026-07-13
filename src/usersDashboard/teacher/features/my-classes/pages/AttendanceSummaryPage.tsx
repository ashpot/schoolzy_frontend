import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import AttendanceFilterForm from "../components/attendance-summary/AttendanceFilterForm";
import AttendanceStatCards from "../components/attendance-summary/AttendanceStatCards";
import WeeklyTrendChart from "../components/attendance-summary/WeeklyTrendChart";
import AttendanceDistributionChart from "../components/attendance-summary/AttendanceDistributionChart";
import StudentBreakdownTable from "../components/attendance-summary/StudentBreakdownTable";
import { useLoadAttendanceSummary } from "../hooks/useAttendanceSummary";
import type { AttendanceFilterValues } from "../schemas";

export default function AttendanceSummaryPage() {
  const summary = useLoadAttendanceSummary();

  const onSubmit = (values: AttendanceFilterValues) => summary.mutate(values);
  const onReset = () => summary.reset();

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Attendance Summaries</h1>
        <p className="text-body-small text-text-secondary mt-1">
          View class-level attendance analytics, trends and per-student breakdowns
        </p>
      </div>

      <AttendanceFilterForm onSubmit={onSubmit} onReset={onReset} isLoading={summary.isPending} />

      {!summary.data && !summary.isPending && (
        <div className="bg-white rounded-2xl card-shadow py-16 flex flex-col items-center text-center">
          <span className="w-12 h-12 rounded-full bg-blue-50 flex-center mb-3">
            <BarChart3 size={20} className="text-brand-primary" />
          </span>
          <p className="text-body font-semibold text-text-primary">No data loaded yet</p>
          <p className="text-body-small text-text-muted mt-1">
            Select a class, group, term and session above, then click Load Summary
          </p>
        </div>
      )}

      {summary.data && (
        <>
          <AttendanceStatCards stats={summary.data.stats} />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
            <WeeklyTrendChart data={summary.data.trend} />
            <AttendanceDistributionChart data={summary.data.distribution} />
          </div>
          <StudentBreakdownTable students={summary.data.students} />
        </>
      )}
    </motion.div>
  );
}