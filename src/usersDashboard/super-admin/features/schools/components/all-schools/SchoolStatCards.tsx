import { motion } from "framer-motion";
import { AlertCircle, Building2, CheckCircle2, Clock } from "lucide-react";
import { staggerContainer } from "../../animations/variants";
import type { SchoolsSummary } from "../../types";
import SchoolStatCard, { type SchoolStat } from "./SchoolStatCard";

function buildStats(s: SchoolsSummary): SchoolStat[] {
  return [
    {
      key: "total", icon: Building2, tone: "blue", value: s.total, label: "Total Schools",
      delta: `+${s.addedThisMonth} this month`,
      deltaTone: s.addedThisMonth > 0 ? "green" : "gray",
      trend: s.addedThisMonth > 0 ? "up" : "flat",
    },
    {
      key: "active", icon: CheckCircle2, tone: "green", value: s.active, label: "Active Schools",
      delta: `+${s.activeThisWeek} this week`,
      deltaTone: s.activeThisWeek > 0 ? "green" : "gray",
      trend: s.activeThisWeek > 0 ? "up" : "flat",
    },
    {
      key: "pending", icon: Clock, tone: "amber", value: s.pending, label: "Pending Approval",
      delta: `${s.pendingNewThisWeek} new this week`,
      deltaTone: s.pendingNewThisWeek > 0 ? "amber" : "gray",
      trend: s.pendingNewThisWeek > 0 ? "up" : "flat",
    },
    {
      key: "suspended", icon: AlertCircle, tone: "red", value: s.suspendedExpired, label: "Suspended/Expired",
      delta: `${s.suspendedThisWeek} this week`,
      deltaTone: s.suspendedThisWeek > 0 ? "red" : "gray",
      trend: s.suspendedThisWeek > 0 ? "down" : "flat",
    },
  ];
}

interface SchoolStatCardsProps {
  summary?: SchoolsSummary;
  isLoading: boolean;
}

export default function SchoolStatCards({ summary, isLoading }: SchoolStatCardsProps) {
  if (isLoading || !summary) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[170px] animate-pulse rounded-3xl bg-sa-gray-soft" />
        ))}
      </div>
    );
  }

  return (
    <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {buildStats(summary).map((stat) => (
        <SchoolStatCard key={stat.key} stat={stat} />
      ))}
    </motion.div>
  );
}