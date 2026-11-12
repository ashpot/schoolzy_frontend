import { Link, useLocation } from "react-router-dom";
import logo_sa_auth from "@/assets/brand/schoolzy_logo_sa_auth.svg";
import { SA_ROUTES } from "../../utils/constants";
import { resetFlow } from "../../utils/resetFlow";

export default function AuthHeader() {
  const { pathname } = useLocation();
  const isLogin = pathname === SA_ROUTES.login;

  return (
    <header className="flex items-start justify-between">
      <Link
        to={SA_ROUTES.login}
        aria-label="Schoolzy platform console"
        className="flex flex-col gap-1"
      >
        <span className="flex items-center gap-2">
          <img src={logo_sa_auth} alt="schoolzy" className="h-7" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
          Platform Console
        </span>
      </Link>

      <Link
        to={isLogin ? "/" : SA_ROUTES.login}
        onClick={isLogin ? undefined : resetFlow.clear}
        className="rounded-full border border-border-line03 px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-brand-primary hover:text-brand-primary"
      >
        {isLogin ? "Back to Home" : "Back to Login"}
      </Link>
    </header>
  );
}