import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockStudents } from "../data/mockData";
import type { Student } from "../types";

const PER_PAGE = 5;

export const useStudentsList = (page = 1, search = "") =>
  useQuery({
    queryKey: ["users", "students", page, search],
    queryFn: async () => {
      // TODO: replace with → api.get(`/students?page=${page}&search=${search}`)
      const filtered = mockStudents.filter((s) =>
        `${s.firstName} ${s.lastName} ${s.admNo} ${s.username}`
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

export const useAddStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Student, "id">) => {
      // TODO: replace with → api.post("/students", payload)
      return { ...payload, id: Date.now().toString() } as Student;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "students"] }),
  });
};

export const useDeleteStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: replace with → api.delete(`/students/${id}`)
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "students"] }),
  });
};