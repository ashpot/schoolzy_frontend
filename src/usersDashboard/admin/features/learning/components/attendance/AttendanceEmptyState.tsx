import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { TableEmptyState } from "../shared/TableEmptyState";

export default function AttendanceEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl card-shadow"
    >
      <TableEmptyState
        icon={<CalendarCheck className="w-7 h-7 text-brand-primary" />}
        title="Ready to take attendance"
        description="Select a class group, then click Load Students"
        minHeight="440px"
      />
    </motion.div>
  );
}