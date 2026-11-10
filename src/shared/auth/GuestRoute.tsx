import { Navigate, Outlet } from "react-router-dom";
import { getUser, isAuthenticated } from "./authStorage";
import { homeForUser } from "./roleHome";

// For pages only logged-out users should see (sign in, sign up, forgot password)
export default function GuestRoute(): React.ReactElement {
  if (isAuthenticated()) return <Navigate to={homeForUser(getUser())} replace />;
  return <Outlet />;
}