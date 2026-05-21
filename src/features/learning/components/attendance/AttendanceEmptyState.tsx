import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

export function AttendanceEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center min-h-110"
    >
      <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
        <CalendarCheck className="w-9 h-9 text-brand-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text-nav mb-2">
        Ready to take attendance
      </h3>
      <p className="text-sm text-text-muted max-w-xs">
        Select a class, group and date above, then click{" "}
        <span className="font-semibold text-text-nav">
          Load Students
        </span>
      </p>
    </motion.div>
  );
}