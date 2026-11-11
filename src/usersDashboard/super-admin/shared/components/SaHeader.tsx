import { useLocation } from "react-router-dom";
import { Bell, Menu, MessageSquare, Search } from "lucide-react";
import { getSaPageMeta } from "../config/saNav";
import SaUserMenu from "./SaUserMenu";

const iconBtn =
  "flex-center h-11 w-11 shrink-0 rounded-xl border border-border-line02 text-text-nav transition-colors hover:bg-bg-input";

export default function SaHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { pathname } = useLocation();
  const { title, subtitle } = getSaPageMeta(pathname);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Replace with actual global search call
  };

  return (
    <header className="sticky top-0 z-30 flex h-[89px] items-center gap-4 border-b border-border-line02 bg-white px-5 lg:px-8">
      <button type="button" aria-label="Open menu" onClick={onMenuClick} className={`${iconBtn} lg:hidden`}>
        <Menu size={20} />
      </button>

      <div className="min-w-0 lg:w-56">
        <h1 className="truncate font-jakarta text-xl font-semibold text-text-primary">{title}</h1>
        <p className="truncate text-sm text-text-muted">{subtitle}</p>
      </div>

      <form role="search" onSubmit={handleSearch} className="relative mx-auto hidden max-w-md flex-1 md:block">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden />
        <input
          type="search"
          aria-label="Search schools, students, invoices"
          placeholder="Search schools, students, invoices..."
          autoComplete="off"
          className="w-full rounded-xl border border-border-line02 bg-bg-input py-3 pl-11 pr-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        />
      </form>

      <div className="ml-auto flex items-center gap-3">
        <button type="button" aria-label="Messages" className={iconBtn}>
          <MessageSquare size={20} />
        </button>
        <button type="button" aria-label="Notifications" className={iconBtn}>
          <Bell size={20} />
        </button>
        <span className="mx-1 hidden h-10 w-px bg-border-line02 sm:block" aria-hidden />
        <SaUserMenu />
      </div>
    </header>
  );
}