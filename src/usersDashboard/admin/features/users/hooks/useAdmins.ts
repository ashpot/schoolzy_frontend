import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserMutation } from "./useCreateUser";

const PER_PAGE = 6;

export const useAdminsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "admins", page, search],
    queryFn: async () => ({
      data: [],
      total: 0,
      page,
      perPage: PER_PAGE,
    }),
  });

  export const useDeleteAdmin = () => {
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: no confirmed DELETE /users/:id/ endpoint yet — wire once backend confirms
      throw new Error("Delete is not available yet");
    },
  });
};

export const useAddAdmin = createUserMutation("Admin", "admins");