import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/shared/lib/apiClient";
import { AUTH_ENDPOINTS } from "../api";
import type { LoginPayload, LoginResponse, UserRole } from "../types";

const ROLE_ROUTE_MAP: Record<UserRole, string> = {
  Admin: "/admin-dashboard",
  Teacher: "/teacher-dashboard",
  Student: "/student-dashboard",
  Parent: "/parent-dashboard",
};

const DEFAULT_ROUTE = "/admin-dashboard";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      return apiRequest<LoginResponse>(AUTH_ENDPOINTS.SIGNIN, {
        method: "POST",
        body: JSON.stringify(payload),
        skipAuth: true,
      });
    },
    onSuccess: (data) => {
      localStorage.setItem("schoolzy_token", data.token);
      localStorage.setItem("schoolzy_user", JSON.stringify(data.user));

      const role = data.user.role;
      const destination = role && ROLE_ROUTE_MAP[role] ? ROLE_ROUTE_MAP[role] : DEFAULT_ROUTE;
      navigate(destination, { replace: true });
    },
  });
};