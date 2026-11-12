import { Navigate, Outlet } from "react-router-dom";
import { resetFlow } from "../../utils/resetFlow";
import { tokenStorage } from "../../utils/tokenStorage";
import { SA_ROUTES } from "../../utils/constants";

// UX guards only. The backend must validate tokens itself.

export function RequireEmail() {
  return resetFlow.get().email ? <Outlet /> : <Navigate to={SA_ROUTES.forgotPassword} replace />;
}

export function RequireResetToken() {
  return resetFlow.get().resetToken ? (
    <Outlet />
  ) : (
    <Navigate to={SA_ROUTES.forgotPassword} replace />
  );
}

export function RedirectIfAuthenticated() {
  return tokenStorage.get() ? <Navigate to={SA_ROUTES.dashboard} replace /> : <Outlet />;
}

export function RequireSuperAdmin() {
  return tokenStorage.get() ? <Outlet /> : <Navigate to={SA_ROUTES.login} replace />;
}