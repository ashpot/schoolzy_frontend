import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockStudents } from "../data/mockData";
import type { ResultSetupValues } from "../schemas";
import type { ScoreEntry } from "../types";

export const useLoadStudents = () => {
  return useMutation({
    //@ts-ignore
    mutationFn: async (payload: ResultSetupValues) => {
      // TODO: Replace with actual API call
      // return api.get("/results/students", { params: payload });
      await new Promise((r) => setTimeout(r, 600));
      return mockStudents;
    },
  });
};

export const useSaveScores = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ResultSetupValues & { scores: ScoreEntry[] }) => {
      // TODO: Replace with actual API call
      // return api.post("/results/enter-scores", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enter-scores"] });
    },
  });
};