import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { useMonthlyIncome } from "../hooks/useDashboardStats";
import { fadeIn, fadeUp } from "../animation/variant";

const formatNaira = (value: number) => {
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `₦${(value / 1_000).toFixed(0)}K`;
  return `₦${value}`;
};

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
          {p.name}: {formatNaira(p.value)}
        </p>
      ))}
    </motion.div>
  );
};

const MonthlyIncomeChart: React.FC = () => {
  const { data, isLoading } = useMonthlyIncome();
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
          <h2 className="section-title">Monthly Income</h2>
          <p className="text-xs text-text-muted mt-0.5">Sep 2025 – Mar 2026</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-4 text-xs font-lato text-text-muted"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary inline-block" />
            Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border-line03 inline-block" />
            Expenses
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
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="hsla(205,83%,45%,0.18)" />
                  <stop offset="95%" stopColor="hsla(205,83%,45%,0)" />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="hsla(220,6%,63%,0.15)" />
                  <stop offset="95%" stopColor="hsla(220,6%,63%,0)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(240,6%,93%,1)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsla(220,6%,63%,1)" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatNaira} tick={{ fontSize: 11, fill: "hsla(220,6%,63%,1)" }} axisLine={false} tickLine={false} width={52} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income"   name="Income"   stroke="hsla(205,83%,45%,1)" strokeWidth={2.5} fill="url(#colorIncome)"   dot={false} animationDuration={1200} animationEasing="ease-out" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="hsla(220,6%,63%,1)"  strokeWidth={2}   fill="url(#colorExpenses)" dot={false} animationDuration={1400} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MonthlyIncomeChart;