import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { Priority, TicketStatus } from "../types";

export const statusTone: Record<TicketStatus, Tone> = {
  Open: "red",
  "In Progress": "blue",
  Waiting: "amber",
  Resolved: "green",
  Closed: "gray",
};

export const priorityTone: Record<Priority, Tone> = {
  Critical: "red",
  High: "red",
  Medium: "amber",
  Low: "gray",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === "Critical") {
    return <span className="inline-flex whitespace-nowrap rounded-full bg-sa-red-icon px-3 py-1 text-xs font-medium text-white">Critical</span>;
  }
  return <StatusBadge label={priority} tone={priorityTone[priority]} />;
}