import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Trash2, ChevronLeft, ChevronRight, Plus, Users } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useRecentStudents } from "../hooks/useDashboardStats";
import { listContainer, fadeUpFast, fadeUp } from "../animation/variant";

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    Active:    "bg-success/10 text-success",
    Suspended: "bg-danger/10 text-danger",
    Inactive:  "bg-text-muted/10 text-text-muted",
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-lato font-medium", styles[status] ?? styles.Inactive)}>
      {status}
    </span>
  );
};

const FeesBadge: React.FC<{ fees: string }> = ({ fees }) => {
  const styles: Record<string, string> = {
    Paid:    "bg-success/10 text-success",
    Partial: "bg-warning/10 text-warning",
    Unpaid:  "bg-danger/10 text-danger",
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-lato font-medium", styles[fees] ?? "")}>
      {fees}
    </span>
  );
};

const AvatarInitials: React.FC<{ name: string }> = ({ name }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["bg-brand-primary", "bg-success", "bg-warning", "bg-purple-500", "bg-pink-500"];
  const color  = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={cn("w-8 h-8 rounded-full flex-center text-white text-xs font-semibold shrink-0", color)}>
      {initials}
    </div>
  );
};

const RecentStudentsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const { data, isLoading } = useRecentStudents(page, perPage);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const totalPages = data ? Math.ceil(data.total / perPage) : 1;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="bg-white rounded-2xl border border-border-line02 card-shadow overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          <h2 className="section-title">Recent Students</h2>
          <p className="text-xs text-text-muted mt-0.5">
            {data?.total ?? 0} total students enrolled
          </p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.3, ease: "backOut" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 bg-brand-primary hover:bg-brand-hover text-white text-sm font-lato font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </motion.button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-lato">
          <thead>
            <tr className="bg-bg-soft text-text-muted text-xs uppercase tracking-wide">
              {["Student Name", "Adm. No.", "Class", "Status", "Fees", "GPA", "Action"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <AnimatePresence mode="wait">
            <motion.tbody
              key={page}
              variants={listContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="divide-y divide-border-line02"
            >
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <motion.tr key={i} variants={fadeUpFast}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-5 py-3.5">
                          <div className="h-4 bg-border-line02 rounded animate-pulse" />
                        </td>
                      ))}
                    </motion.tr>
                  ))
                : data && data.data.length === 0
                ? (
                    <motion.tr variants={fadeUpFast}>
                      <td colSpan={7} className="px-5 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-bg-soft flex-center">
                            <Users className="w-5 h-5 text-text-muted" />
                          </div>
                          <p className="text-sm text-text-secondary font-medium">Not available</p>
                          <p className="text-xs text-text-muted">No recent students data yet</p>
                        </div>
                      </td>
                    </motion.tr>
                  )
                : data?.data.map((student) => (
                    <motion.tr
                      key={student.id}
                      variants={fadeUpFast}
                      whileHover={{ backgroundColor: "hsla(0,0%,94%,0.6)" }}
                      className="transition-colors cursor-default"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <AvatarInitials name={student.name} />
                          <span className="font-medium text-text-primary">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-text-muted">{student.admNo}</td>
                      <td className="px-4 py-3.5 text-text-secondary">{student.classLabel}</td>
                      <td className="px-4 py-3.5"><StatusBadge status={student.status} /></td>
                      <td className="px-4 py-3.5"><FeesBadge fees={student.fees} /></td>
                      <td className="px-4 py-3.5 font-semibold text-text-primary">{student.gpa}</td>
                      <td className="px-4 py-3.5">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, data?.total ?? 0)} of {data?.total ?? 0}
        </p>
        <div className="flex items-center gap-1">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:bg-bg-soft disabled:opacity-40 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
          </motion.button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setPage(i + 1)} className={cn("w-7 h-7 flex-center rounded-lg text-xs font-lato font-medium transition-colors", page === i + 1 ? "bg-brand-primary text-white" : "border border-border-line02 text-text-muted hover:bg-bg-soft")}>
              {i + 1}
            </motion.button>
          ))}
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:bg-bg-soft disabled:opacity-40 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentStudentsTable;