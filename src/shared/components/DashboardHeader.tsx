import { useState } from "react";
import { ChevronsLeft, Search, ChevronDown, User, LogOut } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import DropdownOverlay from "./DropdownOverlay";
import NotificationOverlay from "./NotificationOverlay";
import UserAvatar from "./UseAvatar";
import HeaderPlanChip from "./HeaderPlanChip";
import HeaderTermChip from "./HeaderTermChip";
import Button from "../ui/Button";
import { BellIcon } from "../lib/SvgLib";
import { getUser } from "@/shared/auth/authStorage";
import { useSignout } from "@/auth/hooks/useSignout";

type OpenMenu = "user" | "bell" | null;

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userName?: string;
  roleLabel?: string;
  showSearch?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMenuClick,
  userName = "Ben Uche",
  roleLabel = "Admin",
  showSearch = true,
}) => {
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [hasNotification, setHasNotification] = useState(true);
  const user = getUser();
  const { mutate: signout, isPending: isSigningOut } = useSignout();

  const toggle = (menu: OpenMenu) => setOpenMenu((prev) => (prev === menu ? null : menu));
  const close = () => setOpenMenu(null);
  const handleLogout = () => {
    close();
    signout(); // clears session + query cache, then redirects to /auth/signin
  };

  const userRef = useOutsideClick(() => openMenu === "user" && close());
  const bellRef = useOutsideClick(() => openMenu === "bell" && close());

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

          {showSearch && (
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
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <HeaderTermChip />
          <HeaderPlanChip />

          {/* notification */}
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
              <UserAvatar name={user?.fullname || userName} />
              <div className="hidden md:block text-left">
                <p className="capitalize text-sm font-semibold text-text-primary leading-tight">{user?.fullname || userName}</p>
                <p className="capitalize text-xs text-text-muted">{user?.role || roleLabel}</p>
              </div>
              <ChevronDown className={cn("hidden md:block w-4 h-4 text-text-muted transition-transform duration-200", openMenu === "user" && "rotate-180")} />
            </button>
            <DropdownOverlay
              isOpen={openMenu === "user"}
              className="right-0 min-w-45"
              items={[
                { icon: <User className="w-4 h-4" />, label: "Profile", onClick: close },
                {
                  icon: <LogOut className="w-4 h-4" />,
                  label: isSigningOut ? "Signing out..." : "Logout",
                  danger: true,
                  onClick: handleLogout,
                },
              ]}
            />
          </div>

        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;