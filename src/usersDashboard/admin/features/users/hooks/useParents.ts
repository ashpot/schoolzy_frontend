import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockParents } from "../data/mockData";
import type { Parent } from "../types";

const PER_PAGE = 7;

export const useParentsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "parents", page, search],
    queryFn: async () => {
      // TODO: replace with → api.get(`/parents?page=${page}&search=${search}`)
      const filtered = mockParents.filter((p) =>
        `${p.firstName} ${p.lastName} ${p.parentId} ${p.username}`
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

export const useAddParent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Parent, "id">) => {
      // TODO: replace with → api.post("/parents", payload)
      return { ...payload, id: Date.now().toString() } as Parent;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "parents"] }),
  });
};

export const useDeleteParent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: replace with → api.delete(`/parents/${id}`)
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "parents"] }),
  });
};