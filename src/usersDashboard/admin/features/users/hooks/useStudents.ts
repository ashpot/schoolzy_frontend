import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUserMutation } from "./useCreateUser";
import { apiRequest } from "@/shared/lib/apiClient";
import type { ClassGroupListItem, UserResponse } from "../types";
import { USERS_ENDPOINTS } from "../api";
import { toStudent } from "../utils/userMappers";

const PER_PAGE = 5;

export const useStudentsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "students", page, search],
    queryFn: async () => {
      // class_group now arrives embedded in each user, so no second request is needed
      const raw = await apiRequest<UserResponse[]>(USERS_ENDPOINTS.LIST_BY_ROLE("Student"));
      let mapped = raw.map((u) => toStudent(u));
      if (search) {
        const q = search.toLowerCase();
        mapped = mapped.filter(
          (s) =>
            s.firstName.toLowerCase().includes(q) ||
            s.lastName.toLowerCase().includes(q) ||
            s.username.toLowerCase().includes(q) ||
            s.admission_number.toLowerCase().includes(q)
        );
      }

      const total = mapped.length;
      const start = (page - 1) * PER_PAGE;
      return { data: mapped.slice(start, start + PER_PAGE), total, page, perPage: PER_PAGE };
    },
  });

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        // Confirmed working: DELETE /users/<pk>/ (students are users)
        return await apiRequest<unknown>(`${USERS_ENDPOINTS.DELETE_USER(id)}`, { method: "DELETE" });
      } catch (err) {
        // A successful DELETE returns an empty body; if apiRequest tries to JSON-parse
        // it, that SyntaxError is a success, not a failure.
        if (err instanceof SyntaxError) return null;
        throw err;
      }
    },
    onSuccess: () => {
      // All role lists share /users/, so refresh them plus class-group student counts
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["class-groups"] });
    },
  });
};

export const useAddStudent = createUserMutation("Student", "students");

export const useClassGroupsList = () => {
  return useQuery({
    queryKey: ["class-groups", "list"],
    queryFn: async () => {
      return apiRequest<ClassGroupListItem[]>(USERS_ENDPOINTS.LIST_CLASS_GROUPS);
    },
  });
};

export const useStudentOptionsList = () => {
  return useQuery({
    queryKey: ["users", "students", "options"],
    queryFn: async () => {
      const raw = await apiRequest<UserResponse[]>(USERS_ENDPOINTS.LIST_ALL);
      return raw
        .filter((u) => u.role === "Student")
        .map((u) => ({
          id: String(u.id),
          name: `${u.first_name} ${u.last_name}`,
          admissionNo: u.admission_number ?? "—",
        }));
    },
  });
};