import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserMutation } from "./useCreateUser";

const PER_PAGE = 7;

export const useParentsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "parents", page, search],
    queryFn: async () => ({
      data: [],
      total: 0,
      page,
      perPage: PER_PAGE,
    }),
  });

  export const useDeleteParent = () => {
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: no confirmed DELETE /users/:id/ endpoint yet — wire once backend confirms
      throw new Error("Delete is not available yet");
    },
  });
};

export const useAddParent = createUserMutation("Parent", "parents");