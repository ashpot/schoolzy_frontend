import { Link } from "react-router-dom";
import logo_sa from "@/assets/brand/schoolzy_logo_sa.svg";
import { SA_PATHS } from "../config/saPaths";
import { saNav, SA_APP_VERSION } from "../config/saNav";
import SaSidebarItem from "./SaSidebarItem";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const user = JSON.parse(localStorage.getItem("schoolzy_user") || "{}");

const UserAvatar = ({ initials }: { initials: string }) => (
  <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-semibold shrink-0">
    {initials}
  </div>
);

export default function SaSidebar({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const name = user.fullname?.trim() || "Super Admin";
  const role = user.role || "Platform Console";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen w-64 lg:w-70 bg-bg-dark border-r border-sa-sidebar-border select-none",
        className
      )}
    >
      {/* Brand / Header */}
      <div className="px-5 py-5.5 border-b border-sa-sidebar-border flex items-center gap-2.5">
        <Link to={SA_PATHS.dashboard} onClick={onNavigate} aria-label="Schoolzy platform console" className="block w-full">
          <span className="flex items-center gap-2">
            <img src={logo_sa} alt="schoolzy" className="h-7" />
          </span>
          <span className="mt-1 block text-[11px] font-semibold uppercase tracking-widest text-text-inverse-muted">
            Platform Console
          </span>
        </Link>
      </div>

     {/* Navigation */}
      <nav aria-label="Primary" className="flex-1 px-2 py-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ul className="space-y-1">
          {saNav.map((item) => (
            <SaSidebarItem key={item.label} item={item} onNavigate={onNavigate} />
            ))}
        </ul>
      </nav>

      {/* User Footer Profile */}
      <div className="border-t border-sa-sidebar-border p-3">
        <div className="flex items-center gap-3 px-2 py-1">
          <UserAvatar initials={initials} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate capitalize">
              {name}
            </p>
            <p className="text-xs text-text-inverse-muted">{role}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-inverse-muted shrink-0" />
        </div>
      </div>

      {/* Version info */}
      <div className="px-5 py-3 border-t border-sa-sidebar-border">
        <p className="text-xs text-text-inverse-muted">
          © {new Date().getFullYear()} Schoolzy <span className="ml-2">{SA_APP_VERSION}</span>
        </p>
      </div>
    </aside>
  );
}