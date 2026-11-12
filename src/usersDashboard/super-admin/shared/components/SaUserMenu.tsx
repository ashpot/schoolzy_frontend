import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { SA_ROUTES, tokenStorage, userStorage, useSuperAdminLogout } from "@/super-admin-auth";
import { SA_PATHS } from "../config/saPaths";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default function SaUserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useSuperAdminLogout();

  const user = userStorage.get();
  const fullName = `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || "Super Admin";
  const roleLabel = user?.role ? user.role.replace(/_/g, " ").toLowerCase() : "super admin";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // onSettled on purpose: the local session always ends, even if the API call fails.
  const handleLogout = () =>
    logout.mutate(undefined, {
      onSettled: () => {
        tokenStorage.clear();
        queryClient.clear();
        navigate(SA_ROUTES.login, { replace: true });
      },
    });

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 rounded-xl p-1 pr-2 transition-colors hover:bg-bg-input"
      >
        <span className="flex-center h-11 w-11 rounded-full bg-bg-dark text-sm font-semibold text-white">
          {getInitials(fullName)}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold text-text-primary capitalize">{fullName}</span>
          <span className="block text-xs text-text-muted capitalize">{roleLabel}</span>
        </span>
        <ChevronDown size={16} className="text-text-muted" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-40 mt-2 w-48 rounded-2xl border border-border-line02 bg-white p-2 shadow-xl"
          >
            <Link
              to={SA_PATHS.settings}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-nav hover:bg-bg-input"
            >
              <Settings size={16} aria-hidden /> Settings
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={logout.isPending}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-danger hover:bg-red-50 disabled:opacity-40"
            >
              <LogOut size={16} aria-hidden /> Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}