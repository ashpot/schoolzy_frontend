import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockTeachers } from "../data/mockData";
import type { Teacher } from "../types";

const PER_PAGE = 6;

export const useTeachersList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "teachers", page, search],
    queryFn: async () => {
      // TODO: replace with → api.get(`/teachers?page=${page}&search=${search}`)
      const filtered = mockTeachers.filter((t) =>
        `${t.firstName} ${t.lastName} ${t.empNo} ${t.username}`
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

export const useAddTeacher = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Teacher, "id">) => {
      // TODO: replace with → api.post("/teachers", payload)
      return { ...payload, id: Date.now().toString() } as Teacher;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "teachers"] }),
  });
};

export const useDeleteTeacher = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: replace with → api.delete(`/teachers/${id}`)
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "teachers"] }),
  });
};