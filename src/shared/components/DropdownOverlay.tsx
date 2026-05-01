import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface OverlayItem {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
  active?: boolean;
}

interface DropdownOverlayProps {
  items: OverlayItem[];
  isOpen: boolean;
  className?: string;
}

const DropdownOverlay: React.FC<DropdownOverlayProps> = ({ items, isOpen, className }) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 bg-white rounded-2xl py-2 min-w-40",
        "shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-border-line02/60",
        "animate-in fade-in-0 zoom-in-95 duration-150",
        className
      )}
    >
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className={cn(
            "w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors text-left",
            item.danger
              ? "text-danger hover:bg-danger/5"
              : item.active
              ? "text-brand-primary font-medium"
              : "text-text-muted hover:bg-bg-soft hover:text-text-primary"
          )}
        >
          {item.icon && (
            <span className={cn("w-4 h-4 shrink-0", item.active && "text-brand-primary")}>
              {item.icon}
            </span>
          )}
          <span className="flex-1">{item.label}</span>
          {item.active && <Check className="w-3.5 h-3.5 text-brand-primary" />}
        </button>
      ))}
    </div>
  );
};

export default DropdownOverlay;