import React, { useState } from "react";
import { ChevronsLeft, Search, ChevronDown, Calendar, BookOpen, User, LogOut } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import DropdownOverlay from "./DropdownOverlay";
import NotificationOverlay from "./NotificationOverlay";
import MessageOverlay from "./MessageOverlay";
import UserAvatar from "./UseAvatar";
import Button from "../ui/Button";
import { BellIcon, MessageIcon } from "../lib/SvgLib";

const SESSIONS = ["2025/2026", "2024/2025", "2023/2024"];
const TERMS = ["First Term", "Second Term", "Third Term"];

type OpenMenu = "session" | "term" | "user" | "bell" | "message" | null;

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userName?: string;
  userRole?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMenuClick,
  userName = "Ben Uche",
  userRole = "Admin",
}) => {
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [session, setSession] = useState("2025/2026");
  const [term, setTerm] = useState("Second Term");
  const [hasNotification, setHasNotification] = useState(true);
  const [hasMessage, setHasMessage] = useState(true);

  const toggle = (menu: OpenMenu) => setOpenMenu((prev) => (prev === menu ? null : menu));
  const close = () => setOpenMenu(null);

  const sessionRef = useOutsideClick(() => openMenu === "session" && close());
  const termRef    = useOutsideClick(() => openMenu === "term"    && close());
  const userRef    = useOutsideClick(() => openMenu === "user"    && close());
  const bellRef    = useOutsideClick(() => openMenu === "bell"    && close());
  const messageRef = useOutsideClick(() => openMenu === "message" && close());

  return (
    <header className="w-full border-b border-border-line02 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4.5  gap-4">

        {/* Left: Collapse + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <Button
            className="rounded-xl px-2 shrink-0"
            onClick={onMenuClick}
          >
            <ChevronsLeft className="w-6 h-6 text-white" />
          </Button>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students, teachers, classes..."
              className={cn(
                "w-full pl-9 pr-4 py-2 rounded-lg border border-border-line02 bg-bg-input",
                "text-sm text-text-primary placeholder:text-text-muted",
                "focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              )}
            />
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">

          {/* Session */}
          <div ref={sessionRef} className="relative hidden sm:block">
            <button
              onClick={() => toggle("session")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[13px] font-lato font-medium transition-colors",
                openMenu === "session"
                  ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                  : "border-border-line02 bg-white text-text-muted01 hover:bg-bg-soft"
              )}
            >
              <Calendar className="w-3.5 h-3.5 text-text-muted" />
              <span>Session {session}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 text-text-muted transition-transform duration-200", openMenu === "session" && "rotate-180")} />
            </button>
            <DropdownOverlay
              isOpen={openMenu === "session"}
              className="right-0"
              items={SESSIONS.map((s) => ({
                label: `Session ${s}`,
                icon: <Calendar className="w-4 h-4" />,
                active: session === s,
                onClick: () => { setSession(s); close(); },
              }))}
            />
          </div>

          {/* Term */}
          <div ref={termRef} className="relative hidden sm:block">
            <button
              onClick={() => toggle("term")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[13px] font-lato font-medium transition-colors",
                openMenu === "term"
                  ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                  : "border-border-line02 bg-white text-text-muted01 hover:bg-bg-soft"
              )}
            >
              <BookOpen className="w-3.5 h-3.5 text-text-muted" />
              <span>{term}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 text-text-muted transition-transform duration-200", openMenu === "term" && "rotate-180")} />
            </button>
            <DropdownOverlay
              isOpen={openMenu === "term"}
              className="right-0"
              items={TERMS.map((t) => ({
                label: t,
                icon: <BookOpen className="w-4 h-4" />,
                active: term === t,
                onClick: () => { setTerm(t); close(); },
              }))}
            />
          </div>

          {/* Messages */}
          <div ref={messageRef} className="relative">
            <button
              onClick={() => { toggle("message"); setHasMessage(false); }}
              className="relative p-2 rounded-lg hover:bg-bg-soft transition-colors border border-border-line02"
            >
              <MessageIcon className="text-text-secondary" />
              {hasMessage && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full" />}
            </button>
            <MessageOverlay isOpen={openMenu === "message"} onClose={close} />
          </div>

          {/* Bell */}
          <div ref={bellRef} className="relative">
            <button
              onClick={() => { toggle("bell"); setHasNotification(false); }}
              className="relative p-2 rounded-lg hover:bg-bg-soft transition-colors border border-border-line02"
            >
              <BellIcon className="text-text-secondary" />
              {hasNotification && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />}
            </button>
            <NotificationOverlay isOpen={openMenu === "bell"} onClose={close} />
          </div>

          {/* User */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => toggle("user")}
              className="flex items-center gap-2 md:gap-2.5 pl-2 md:pl-3 border-l border-border-line02 hover:bg-bg-soft rounded-lg px-2 py-1 transition-colors"
            >
              <UserAvatar />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-text-primary leading-tight">{userName}</p>
                <p className="text-xs text-text-muted">{userRole}</p>
              </div>
              <ChevronDown className={cn("hidden md:block w-4 h-4 text-text-muted transition-transform duration-200", openMenu === "user" && "rotate-180")} />
            </button>
            <DropdownOverlay
              isOpen={openMenu === "user"}
              className="right-0 min-w-[180px]"
              items={[
                { icon: <User className="w-4 h-4" />, label: "Profile", onClick: close },
                { icon: <LogOut className="w-4 h-4" />, label: "Logout", danger: true, onClick: close },
              ]}
            />
          </div>

        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;