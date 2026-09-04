// import { useMutation, useQuery } from "@tanstack/react-query";
// import { createUserMutation } from "./useCreateUser";

// const PER_PAGE = 7;

// export const useTeachersList = (page = 1, search = "") =>
//   useQuery({
//     queryKey: ["users", "teachers", page, search],
//     queryFn: async () => ({
//       data: [],
//       total: 0,
//       page,
//       perPage: PER_PAGE,
//     }),
//   });

//   export const useDeleteTeacher = () => {
//   return useMutation({
//     mutationFn: async (_id: string) => {
//       // TODO: no confirmed DELETE /users/:id/ endpoint yet — wire once backend confirms
//       throw new Error("Delete is not available yet");
//     },
//   });
// };

// export const useAddTeacher = createUserMutation("Teacher", "teachers");

import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserMutation } from "./useCreateUser";
import { apiRequest } from "@/shared/lib/apiClient";
import type { UserResponse } from "../types";
import { USERS_ENDPOINTS } from "../api";
import { toTeacher } from "../utils/userMappers";

const PER_PAGE = 7;

export const useTeachersList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "teachers", page, search],
    queryFn: async () => {
      const raw = await apiRequest<UserResponse[]>(USERS_ENDPOINTS.LIST_BY_ROLE("Teacher"));
      let mapped = raw.map(toTeacher);

      if (search) {
        const q = search.toLowerCase();
        mapped = mapped.filter(
          (t) =>
            t.firstName.toLowerCase().includes(q) ||
            t.lastName.toLowerCase().includes(q) ||
            t.username.toLowerCase().includes(q) ||
            t.empNo.toLowerCase().includes(q)
        );
      }

      const total = mapped.length;
      const start = (page - 1) * PER_PAGE;
      return { data: mapped.slice(start, start + PER_PAGE), total, page, perPage: PER_PAGE };
    },
  });

export const useDeleteTeacher = () => {
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: no confirmed DELETE /users/:id/ endpoint yet — wire once backend confirms
      throw new Error("Delete is not available yet");
    },
  });
};

export const useAddTeacher = createUserMutation("Teacher", "teachers");