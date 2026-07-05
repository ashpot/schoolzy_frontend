import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { WeeklySetupValues } from "../schemas/uploadWeekly";
import type { Student, ScoresMap } from "../types";
import { mockStudents } from "../data/mockData";

export const useLoadWeeklyStudents = () => {
  return useMutation({
    mutationFn: async (_values: WeeklySetupValues): Promise<Student[]> => {
      // TODO: Replace with actual API call
      // return api.get(`/students?class=${_values.class}&group=${_values.classGroup}&subject=${_values.subject}`);
      await new Promise((r) => setTimeout(r, 800));
      return mockStudents;
    },
  });
};

export const useSaveWeeklyScores = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { setup: WeeklySetupValues; week: number; scores: ScoresMap }) => {
      // TODO: Replace with actual API call
      // return api.post("/results/weekly-scores", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weekly-scores"] });
    },
  });
};