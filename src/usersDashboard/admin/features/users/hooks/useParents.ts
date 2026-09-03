// import { useMutation, useQuery } from "@tanstack/react-query";
// import { createUserMutation } from "./useCreateUser";

// const PER_PAGE = 7;

// export const useParentsList = (page = 1, search = "") =>
//   useQuery({
//     queryKey: ["users", "parents", page, search],
//     queryFn: async () => ({
//       data: [],
//       total: 0,
//       page,
//       perPage: PER_PAGE,
//     }),
//   });

//   export const useDeleteParent = () => {
//   return useMutation({
//     mutationFn: async (_id: string) => {
//       // TODO: no confirmed DELETE /users/:id/ endpoint yet — wire once backend confirms
//       throw new Error("Delete is not available yet");
//     },
//   });
// };

// export const useAddParent = createUserMutation("Parent", "parents");


import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserMutation } from "./useCreateUser";
import { apiRequest } from "@/shared/lib/apiClient";
import type { UserResponse } from "../types";
import { USERS_ENDPOINTS } from "../api";
import { toParent } from "../utils/userMappers";

const PER_PAGE = 7;

export const useParentsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "parents", page, search],
    queryFn: async () => {
      const raw = await apiRequest<UserResponse[]>(USERS_ENDPOINTS.LIST_BY_ROLE("Parent"));
      let mapped = raw.map(toParent);

      if (search) {
        const q = search.toLowerCase();
        mapped = mapped.filter(
          (p) =>
            p.firstName.toLowerCase().includes(q) ||
            p.lastName.toLowerCase().includes(q) ||
            p.username.toLowerCase().includes(q)
        );
      }

      const total = mapped.length;
      const start = (page - 1) * PER_PAGE;
      return { data: mapped.slice(start, start + PER_PAGE), total, page, perPage: PER_PAGE };
    },
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