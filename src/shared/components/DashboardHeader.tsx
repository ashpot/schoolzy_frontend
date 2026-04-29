import React, { useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// Replace image import with inline SVG
const UserAvatar = () => (
  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-semibold">
    BU
  </div>
);

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const [query, setQuery] = useState("");
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <header className="w-full border-b border-border-line02 bg-white">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-4">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 rounded-lg hover:bg-bg-soft transition-colors"
          >
            <Menu className="w-5 h-5 text-text-secondary" />
          </button>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students, teachers, classes..."
              className={cn(
                "w-full pl-9 pr-4 py-2 rounded-lg border border-border-line02 bg-bg-input text-sm text-text-primary",
                "placeholder:text-text-muted placeholder:text-xs md:placeholder:text-sm",
                "focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              )}
            />
          </div>
        </div>

        {/* Right: Session + User */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-text-secondary bg-bg-soft px-3 py-1.5 rounded-lg">
            <span className="font-medium">Session 2025/2026</span>
            <span className="text-border-line01">|</span>
            <span>Second Term</span>
          </div>

          <button
            onClick={() => setHasNotification(false)}
            className="relative p-2 rounded-lg border border-border-line02 hover:bg-bg-soft transition-colors"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5 text-text-secondary" />
            {hasNotification && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
            )}
          </button>

          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3 border-l border-border-line02">
            <UserAvatar />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-text-primary leading-tight">
                Ben Uche
              </p>
              <p className="text-xs text-text-muted">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;