import { useLocation } from "react-router-dom";
import { getRoleConfigFromPath } from "@/shared/navigation";

export const useRoleConfig = () => {
  const { pathname } = useLocation();
  const config = getRoleConfigFromPath(pathname);

  if (!config) {
    // TODO: Replace with proper error boundary / redirect to 404 once auth is wired up
    throw new Error(`No role config found for path: ${pathname}`);
  }

  return config;
};