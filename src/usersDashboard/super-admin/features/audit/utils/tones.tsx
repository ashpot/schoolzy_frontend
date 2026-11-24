import {
  CreditCard, Download, LogIn, LogOut, Pencil, Plus, RotateCcw, Shield, Trash2, Ban, Check, type LucideIcon,
} from "lucide-react";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { AuditAction, AuditCategory, AuditStatus } from "../types";

export const categoryTone: Record<AuditCategory, Tone> = {
  Settings: "gray",
  Authentication: "blue",
  Schools: "green",
  Security: "red",
  Payments: "green",
  Subscriptions: "purple",
  Support: "amber",
  System: "gray",
  Users: "amber",
};

export const statusTone: Record<AuditStatus, Tone> = { Success: "green", Failed: "red", Critical: "purple" };

export const actionIcon: Record<AuditAction, LucideIcon> = {
  Login: LogIn,
  Logout: LogOut,
  Create: Plus,
  Update: Pencil,
  Delete: Trash2,
  Approve: Check,
  Suspend: Ban,
  "Permission Changed": Shield,
  "Payment Processed": CreditCard,
  "Renew Subscription": RotateCcw,
  Export: Download,
};