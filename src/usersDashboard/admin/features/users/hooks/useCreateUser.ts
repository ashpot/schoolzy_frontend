import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { USERS_ENDPOINTS } from "../api";
import { buildUserFormData, type CreateUserPayload } from "../utils/buildUserFormData";

type UserRole = "Admin" | "Teacher" | "Student" | "Parent";

export function createUserMutation(role: UserRole, queryKeyPrefix: string) {
  return function useAddUser() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (payload: CreateUserPayload) => {
        // FormData so photo uploads work. apiRequest skips the JSON Content-Type for FormData.
        return apiRequest(USERS_ENDPOINTS.CREATE, {
          method: "POST",
          body: buildUserFormData({ ...payload, role }),
        });
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: ["users", queryKeyPrefix] }),
    });
  };
}