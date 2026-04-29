import { type FC } from "react";

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon: FC<{ className?: string }>;
  children?: NavItem[];
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
}