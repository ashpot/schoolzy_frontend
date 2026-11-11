import type { LucideIcon } from "lucide-react";

export interface SaNavChild {
  label: string;
  to: string;
}

export interface SaNavItem {
  label: string;
  icon: LucideIcon;
  to: string;
  children?: SaNavChild[];
  chevron?: boolean; // shows a chevron for items whose sub-pages aren't designed yet
}

export interface SaPageMeta {
  title: string;
  subtitle: string;
}