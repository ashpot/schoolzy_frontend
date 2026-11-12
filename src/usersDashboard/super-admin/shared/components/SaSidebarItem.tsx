import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { SA_PATHS } from "../config/saPaths";
import type { SaNavItem } from "../types/navigation";

const base = "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[15px] transition-colors";
const idle = "text-text-inverse-muted hover:bg-sa-sidebar-active/60 hover:text-white";
const active = "bg-sa-sidebar-active text-white";

interface SaSidebarItemProps {
  item: SaNavItem;
  onNavigate?: () => void;
}

export default function SaSidebarItem({ item, onNavigate }: SaSidebarItemProps) {
  const { pathname } = useLocation();
  const Icon = item.icon;
  const children = item.children ?? [];
  const childActive = children.some((c) => pathname.startsWith(c.to));
  const [open, setOpen] = useState(childActive);

  if (!children.length) {
    return (
      <NavLink
        to={item.to}
        end={item.to === SA_PATHS.dashboard}
        onClick={onNavigate}
        className={({ isActive }) => cn(base, isActive ? active : idle)}
      >
        <Icon size={20} aria-hidden />
        <span className="flex-1 truncate text-left">{item.label}</span>
        {item.chevron && <ChevronRight size={16} aria-hidden />}
      </NavLink>
    );
  }

  const Chevron = open ? ChevronDown : ChevronRight;

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(base, open || childActive ? active : idle)}
      >
        <Icon size={20} aria-hidden />
        <span className="flex-1 truncate text-left">{item.label}</span>
        <Chevron size={16} aria-hidden />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="ml-12 mt-1 space-y-1 overflow-hidden"
          >
            {children.map((child) => (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  end
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn("block rounded-2xl px-4 py-2.5 text-sm transition-colors", isActive ? active : idle)
                  }
                >
                  {child.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}