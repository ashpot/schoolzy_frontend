import { Link } from "react-router-dom";
import logo_sa from "@/assets/brand/schoolzy_logo_sa.svg";
import { cn } from "@/shared/utils/cn";
import { SA_PATHS } from "../config/saPaths";
import { saNav, SA_APP_VERSION } from "../config/saNav";
import SaSidebarItem from "./SaSidebarItem";

export default function SaSidebar({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "flex flex-col h-screen w-64 lg:w-70 bg-bg-dark border-r border-sa-sidebar-border select-none",
        className
      )}
    >
      {/* Brand / Header */}
      <div className="px-5 py-5.5 border-b border-sa-sidebar-border flex items-center gap-2.5">
        <Link
          to={SA_PATHS.dashboard}
          onClick={onNavigate}
          aria-label="Schoolzy platform console"
          className="block w-full"
        >
          <span className="flex items-center gap-2">
            <img src={logo_sa} alt="schoolzy" className="h-7" />
          </span>
          <span className="mt-1 block text-[11px] font-semibold uppercase tracking-widest text-text-inverse-muted">
            Platform Console
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Primary"
        className="flex-1 px-2 py-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
      >
        <ul className="space-y-1">
          {saNav.map((item) => (
            <SaSidebarItem key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sa-sidebar-border p-3">
        <div className="rounded-xl bg-white/5 px-4 py-3">
          <p className="text-sm text-white">© {new Date().getFullYear()} Schoolzy</p>
          <p className="mt-1.5 text-sm text-text-inverse-muted">{SA_APP_VERSION}</p>
        </div>
      </div>
    </aside>
  );
}