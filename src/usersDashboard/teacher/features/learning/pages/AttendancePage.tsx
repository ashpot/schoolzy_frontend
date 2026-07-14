import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import AttendanceSetupForm from "../components/attendance-page/AttendanceSetupForm";
import AttendanceEmptyState from "../components/attendance-page/AttendanceEmptyState";
import AttendancePanel from "../components/attendance-page/AttendancePanel";
import RecentAttendanceList from "../components/attendance-page/RecentAttendanceList";
import { useLoadAttendanceStudents, useSaveAttendance } from "../hooks/useAttendance";
import { classOptions } from "../data/mockData";
import type { AttendanceSetupValues } from "../schemas";
import type { AttendanceStudent } from "../types";

export default function AttendancePage() {
  const loadStudents = useLoadAttendanceStudents();
  const saveAttendance = useSaveAttendance();

  const onSubmit = (values: AttendanceSetupValues) => loadStudents.mutate(values);
  const onSave = (students: AttendanceStudent[]) => saveAttendance.mutate(students);

  const selectedClassLabel =
    classOptions.find((c) => c.value === loadStudents.variables?.classId)?.label ?? "";

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Attendance</h1>
        <p className="text-body-small text-text-secondary mt-1">
          Take and manage daily class attendance quickly and efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-start">
        <AttendanceSetupForm onSubmit={onSubmit} isLoading={loadStudents.isPending} />

        {loadStudents.data ? (
          <AttendancePanel
            className={selectedClassLabel}
            students={loadStudents.data}
            onSave={onSave}
            isSaving={saveAttendance.isPending}
          />
        ) : (
          <AttendanceEmptyState />
        )}
      </div>

      <RecentAttendanceList />
    </motion.div>
  );
}