import React from "react";
import { cn } from "@/shared/utils/cn";

const COLORS = [
  "bg-brand-primary", "bg-success", "bg-warning",
  "bg-purple-500", "bg-pink-500", "bg-teal-500",
];

const AvatarInitials: React.FC<{ name: string; size?: "sm" | "md" }> = ({ name, size = "md" }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const color = COLORS[name.charCodeAt(0) % COLORS.length];
  return (
    <div className={cn(
      "rounded-full flex items-center justify-center text-white font-semibold shrink-0",
      color,
      size === "md" ? "w-9 h-9 text-sm" : "w-7 h-7 text-xs"
    )}>
      {initials}
    </div>
  );
};

export default AvatarInitials;