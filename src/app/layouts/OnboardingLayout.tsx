import { Link, Navigate, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";
import Logo from "@/assets/brand/schoolzy_logo.svg";
import { getToken, getUser } from "@/shared/auth/authStorage";
import { useSignout } from "@/auth/hooks/useSignout";

// Read once per render, never throws on corrupt storage
const readSchoolLogo = (): string | null => {
  try {
    return JSON.parse(localStorage.getItem("school_details") ?? "null")?.logo ?? null;
  } catch {
    return null;
  }
};

export default function OnboardingLayout() {
  const { mutate: signout, isPending: isSigningOut } = useSignout();
  const token = getToken();
  const user = getUser();

  if (!token) return <Navigate to="/auth/signin" replace />;
  // Superuser accounts come back with role "" so treat that as admin too
  if (user?.role && user.role !== "Admin") return <Navigate to="/" replace />;

  const logo = readSchoolLogo();

  return (
    <div className="min-h-screen bg-bg-input">
      <header className="sticky top-0 z-30 border-b border-border-line02 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <img src={logo || Logo} alt="Schoolzy" className="h-8" />
          <div className="flex items-center gap-4 text-sm">
            {user?.fullname && (
              <span className="hidden sm:block text-text-secondary">{user.fullname}</span>
            )}
            <Link to="/admin-dashboard" className="text-text-muted underline hover:text-text-secondary">
              Skip for now
            </Link>
            <button
              type="button"
              onClick={() => signout()}
              disabled={isSigningOut}
              aria-label="Log out"
              className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors disabled:opacity-40"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}