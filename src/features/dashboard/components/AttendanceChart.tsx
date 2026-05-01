import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { useAttendance } from "../hooks/useDashboardStats";
import { fadeIn, fadeUp } from "../animation/variant";
import { useCountUp } from "../animation/useCountUp";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="bg-white border border-border-line02 rounded-xl px-4 py-3 shadow-lg text-sm font-lato"
    >
      <p className="text-text-muted mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </motion.div>
  );
};

// Animated stat number sub-component
const AnimatedStat: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  inView: boolean;
}> = ({ value, suffix = "", prefix = "", decimals = 0, className, inView }) => {
  const { value: counted, ref } = useCountUp(inView ? value : 0, 1100, decimals);
  return (
    <motion.p
      ref={ref as any}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      {prefix}{decimals > 0 ? counted.toFixed(decimals) : Math.round(counted).toLocaleString()}{suffix}
    </motion.p>
  );
};

const AttendanceChart: React.FC = () => {
  const { data, isLoading } = useAttendance();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="bg-white rounded-2xl border border-border-line02 card-shadow p-5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="section-title">Attendance Overview</h2>
          <p className="text-xs text-text-muted mt-0.5">This week's attendance</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-4 text-xs font-lato text-text-muted"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary inline-block" />
            Present
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-danger inline-block" />
            Absent
          </span>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="h-52 rounded-xl bg-border-line02 animate-pulse" />
      ) : (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 0.25 }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} barGap={4} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(240,6%,93%,1)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsla(220,6%,63%,1)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsla(220,6%,63%,1)" }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="present" name="Present" fill="hsla(205,83%,45%,1)"   radius={[4, 4, 0, 0]} maxBarSize={32} animationDuration={1000} animationEasing="ease-out" />
              <Bar dataKey="absent"  name="Absent"  fill="hsla(0,84%,60%,0.35)"  radius={[4, 4, 0, 0]} maxBarSize={32} animationDuration={1100} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Bottom stats with count-up */}
      <motion.div
        className="grid grid-cols-3 divide-x divide-border-line02 pt-2 border-t border-border-line02"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="text-center px-2">
          <AnimatedStat value={91.3} suffix="%" decimals={1} className="text-xl font-lato font-bold text-brand-primary" inView={inView} />
          <p className="text-xs text-text-muted mt-0.5">Avg Attendance</p>
        </div>
        <div className="text-center px-2">
          <AnimatedStat value={3412} className="text-xl font-lato font-bold text-text-primary" inView={inView} />
          <p className="text-xs text-text-muted mt-0.5">Today Present</p>
        </div>
        <div className="text-center px-2">
          <AnimatedStat value={435} className="text-xl font-lato font-bold text-danger" inView={inView} />
          <p className="text-xs text-text-muted mt-0.5">Today Absent</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AttendanceChart;