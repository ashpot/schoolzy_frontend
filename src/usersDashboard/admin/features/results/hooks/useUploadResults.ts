import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResultSetupValues } from "../schemas/uploadResults";
import type { Student, ResultScoresMap } from "../types";
import { mockStudents } from "../data/mockData";

export const useLoadResultStudents = () => {
  return useMutation({
    mutationFn: async (_values: ResultSetupValues): Promise<Student[]> => {
      // TODO: Replace with actual API call
      // return api.get(`/students?class=${_values.class}&group=${_values.classGroup}&subject=${_values.subject}`);
      await new Promise((r) => setTimeout(r, 800));
      return mockStudents;
    },
  });
};

export const useSaveResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { setup: ResultSetupValues; scores: ResultScoresMap }) => {
      // TODO: Replace with actual API call
      // return api.post("/results/upload", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploaded-scores"] });
    },
  });
};