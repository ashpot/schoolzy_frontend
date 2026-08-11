import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserMutation } from "./useCreateUser";

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