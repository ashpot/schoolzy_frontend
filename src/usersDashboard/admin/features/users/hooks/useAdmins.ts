// import { useMutation, useQuery } from "@tanstack/react-query";
// import { createUserMutation } from "./useCreateUser";

// const PER_PAGE = 6;

// export const useAdminsList = (page = 1, search = "") =>
//   useQuery({
//     queryKey: ["users", "admins", page, search],
//     queryFn: async () => ({
//       data: [],
//       total: 0,
//       page,
//       perPage: PER_PAGE,
//     }),
//   });

//   export const useDeleteAdmin = () => {
//   return useMutation({
//     mutationFn: async (_id: string) => {
//       // TODO: no confirmed DELETE /users/:id/ endpoint yet — wire once backend confirms
//       throw new Error("Delete is not available yet");
//     },
//   });
// };

// export const useAddAdmin = createUserMutation("Admin", "admins");

import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserMutation } from "./useCreateUser";
import { apiRequest } from "@/shared/lib/apiClient";
import type { UserResponse } from "../types";
import { USERS_ENDPOINTS } from "../api";
import { toAdmin } from "../utils/userMappers";

const PER_PAGE = 6;

export const useAdminsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "admins", page, search],
    queryFn: async () => {
      // NOTE: sample data shows the school-owner admin has role: "" (empty),
      // not role: "Admin" — ?role=Admin may miss that user. Verify against
      // real API response before trusting this list is complete.
      const raw = await apiRequest<UserResponse[]>(USERS_ENDPOINTS.LIST_BY_ROLE("Admin"));
      let mapped = raw.map(toAdmin);

      if (search) {
        const q = search.toLowerCase();
        mapped = mapped.filter(
          (a) =>
            a.firstName.toLowerCase().includes(q) ||
            a.lastName.toLowerCase().includes(q) ||
            a.username.toLowerCase().includes(q)
        );
      }

      const total = mapped.length;
      const start = (page - 1) * PER_PAGE;
      return { data: mapped.slice(start, start + PER_PAGE), total, page, perPage: PER_PAGE };
    },
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