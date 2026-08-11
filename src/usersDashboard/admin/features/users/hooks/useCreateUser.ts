// src/usersDashboard/admin/features/users/hooks/useCreateUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { USERS_ENDPOINTS } from "../api";

type UserRole = "Admin" | "Teacher" | "Student" | "Parent";

interface CreateUserPayload {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  class_group?: number; // Student only
}

export function createUserMutation(role: UserRole, queryKeyPrefix: string) {
  return function useAddUser() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (payload: CreateUserPayload) => {
        return apiRequest(USERS_ENDPOINTS.CREATE, {
          method: "POST",
          body: JSON.stringify({ ...payload, role }),
        });
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: ["users", queryKeyPrefix] }),
    });
  };
}