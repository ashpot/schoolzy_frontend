import { CheckCircle2, FileText, MessageSquare, User, X } from "lucide-react";
import type { MenuItem } from "@/usersDashboard/super-admin/features/subscriptions/utils/menus";
import type { Ticket, TicketMenuKey } from "../types";

const ITEMS: Record<TicketMenuKey, MenuItem<TicketMenuKey>> = {
  view: { key: "view", label: "View Ticket", icon: FileText },
  assign: { key: "assign", label: "Assign Agent", icon: User },
  reply: { key: "reply", label: "Reply", icon: MessageSquare },
  close: { key: "close", label: "Close Ticket", icon: CheckCircle2 },
  delete: { key: "delete", label: "Delete", icon: X, danger: true },
};

export function ticketMenu(t: Ticket): MenuItem<TicketMenuKey>[] {
  const keys: TicketMenuKey[] = ["view", "assign", "reply"];
  if (t.status !== "Closed") keys.push("close");
  keys.push("delete");
  return keys.map((k) => ITEMS[k]);
}