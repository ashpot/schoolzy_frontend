import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserMutation } from "./useCreateUser";
import { apiRequest } from "@/shared/lib/apiClient";
import type { ClassGroupListItem } from "../types";
import { USERS_ENDPOINTS } from "../api";

const PER_PAGE = 5;

export const useStudentsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "students", page, search],
    queryFn: async () => ({
      data: [],
      total: 0,
      page,
      perPage: PER_PAGE,
    }),
  });

  export const useDeleteStudent = () => {
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: no confirmed DELETE /users/:id/ endpoint yet — wire once backend confirms
      throw new Error("Delete is not available yet");
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