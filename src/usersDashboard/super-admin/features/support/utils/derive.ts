import { AlertCircle, Check, Clock, TrendingUp } from "lucide-react";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import type { Ticket } from "../types";
import { OPEN_STATUSES } from "./constants";
import { formatDuration, isToday } from "./format";

export function ticketStats(tickets: Ticket[]): MetricItem[] {
  const open = tickets.filter((t) => OPEN_STATUSES.has(t.status));
  const resolvedToday = tickets.filter((t) => t.resolvedAt && isToday(t.resolvedAt)).length;
  const high = open.filter((t) => t.priority === "High" || t.priority === "Critical").length;
  const times = tickets
    .filter((t) => t.firstResponseAt)
    .map((t) => new Date(t.firstResponseAt as string).getTime() - new Date(t.createdAt).getTime());
  const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : null;

  // TODO: the delta pills need backend history
  return [
    { key: "open", icon: AlertCircle, tone: "red", value: open.length, label: "Open Tickets", delta: { text: "+2 today", good: false } },
    { key: "resolved", icon: Check, tone: "green", value: resolvedToday, label: "Resolved Today", delta: { text: "+1 vs yesterday", good: true } },
    { key: "high", icon: TrendingUp, tone: "amber", value: high, label: "High Priority", delta: { text: "-1 this week", good: true } },
    { key: "avg", icon: Clock, tone: "blue", value: avg === null ? "—" : formatDuration(avg), label: "Avg Response Time", delta: { text: "-8m vs last wk", good: true } },
  ];
}