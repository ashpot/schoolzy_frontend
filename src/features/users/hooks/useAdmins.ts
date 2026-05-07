import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockAdmins } from "../data/mockData";
import type { Admin } from "../types";

const PER_PAGE = 6;

export const useAdminsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "admins", page, search],
    queryFn: async () => {
      // TODO: replace with → api.get(`/admins?page=${page}&search=${search}`)
      const filtered = mockAdmins.filter((a) =>
        `${a.firstName} ${a.lastName} ${a.adminId} ${a.username}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      return {
        data: filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
        total: filtered.length,
        page,
        perPage: PER_PAGE,
      };
    },
  });

export const useAddAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Admin, "id">) => {
      // TODO: replace with → api.post("/admins", payload)
      return { ...payload, id: Date.now().toString() } as Admin;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "admins"] }),
  });
};

export const useDeleteAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: replace with → api.delete(`/admins/${id}`)
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "admins"] }),
  });
};