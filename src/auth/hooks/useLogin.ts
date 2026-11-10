import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "@/shared/lib/apiClient";
import { AUTH_ENDPOINTS } from "../api";
import type { LoginPayload, LoginResponse, UserRole } from "../types";
import { fetchOnboardingHealth } from "@/usersDashboard/admin/features/onboarding";
import { setSession } from "@/shared/auth/authStorage";
import { safeRedirect } from "@/shared/auth/roleHome";

const ROLE_ROUTE_MAP: Record<UserRole, string> = {
  Admin: "/admin-dashboard",
  Teacher: "/teacher-dashboard",
  Student: "/student-dashboard",
  Parent: "/parent-dashboard",
};

const DEFAULT_ROUTE = "/admin-dashboard";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      return apiRequest<LoginResponse>(AUTH_ENDPOINTS.SIGNIN, {
        method: "POST",
        body: JSON.stringify(payload),
        skipAuth: true,
      });
    },
    onSuccess: async (data) => {
      // Replaces the two raw localStorage.setItem calls (same keys, so nothing else breaks)
      setSession(data.token, data.user);

      const role = data.user.role;
      const destination = role && ROLE_ROUTE_MAP[role] ? ROLE_ROUTE_MAP[role] : DEFAULT_ROUTE;

      // Admins with unfinished setup land on onboarding first
      if (destination === ROLE_ROUTE_MAP.Admin) {
        try {
          const health = await fetchOnboardingHealth();
          if (!health.onboarding.completed) {
            navigate("/onboarding", { replace: true });
            return;
          }
        } catch {
          /* health check failed, don't block login */
        }
      }

      // If a guard sent them here from a page they wanted, return them to it.
      // Only if it's allowed for their role (e.g. a teacher shouldn't be sent to /admin-...).
      const from = (location.state as { from?: string } | null)?.from;
      const back = safeRedirect(from, destination);
      const prefix = destination.split("-")[0]; // "/admin", "/teacher", ...
      navigate(back.startsWith(prefix) ? back : destination, { replace: true });
    },
  });
};