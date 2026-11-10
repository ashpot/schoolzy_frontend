import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/shared/lib/apiClient";
import { clearSession } from "@/shared/auth/authStorage";
import { AUTH_ENDPOINTS } from "../api"; // add SIGNOUT: `${API_BASE_URL}/auth/signout/` to your auth api.ts

export const useSignout = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // Best effort: even if the server call fails, we still log out locally
      try { await apiRequest(AUTH_ENDPOINTS.SIGNOUT, { method: "POST" }); } catch { /* ignore */ }
    },
    onSettled: () => {
      clearSession();
      qc.clear(); // drop every cached query so the next user can't see this user's data
      navigate("/auth/signin", { replace: true });
    },
  });
};