import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser, isAuthenticated, normalizeRole, type Role } from "./authStorage";
import { homeForUser } from "./roleHome";

interface Props { allowedRoles?: Role[] }

export default function ProtectedRoute({ allowedRoles }: Props): React.ReactElement {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/auth/signin"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  const user = getUser();
  const role = normalizeRole(user?.role);
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    // Signed in, but not allowed here: send them to their own dashboard
    return <Navigate to={homeForUser(user)} replace />;
  }

  return <Outlet />;
}