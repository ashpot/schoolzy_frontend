import { AlertCircle, Bell, FileText, RefreshCw, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import type { MenuKey, Subscription } from "../types";

export interface MenuItem<K extends string = string> {
  key: K;
  label: string;
  icon: LucideIcon;
  danger?: boolean;
}

const ITEMS: Record<MenuKey, MenuItem<MenuKey>> = {
  view: { key: "view", label: "View Subscription", icon: FileText },
  upgrade: { key: "upgrade", label: "Upgrade", icon: TrendingUp },
  downgrade: { key: "downgrade", label: "Downgrade", icon: TrendingDown },
  invoice: { key: "invoice", label: "Generate Invoice", icon: FileText },
  renew: { key: "renew", label: "Renew", icon: RefreshCw },
  reminder: { key: "reminder", label: "Send Reminder", icon: Bell },
  suspend: { key: "suspend", label: "Suspend", icon: AlertCircle, danger: true },
};

const ACTIVE_KEYS: MenuKey[] = ["view", "upgrade", "downgrade", "invoice", "renew", "suspend"];
const RENEWAL_KEYS: MenuKey[] = ["view", "renew", "invoice", "reminder"];

export const activeMenu = (s: Subscription) =>
  ACTIVE_KEYS.filter((k) => !(k === "suspend" && s.status === "Suspended")).map((k) => ITEMS[k]);

export const renewalMenu = () => RENEWAL_KEYS.map((k) => ITEMS[k]);