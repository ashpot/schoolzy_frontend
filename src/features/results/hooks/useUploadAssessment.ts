import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UploadFilterValues } from "../schemas/uploadAssessment";
import type { Student, ScoresMap } from "../types";
import { mockStudents } from "../data/mockData";

export const useLoadStudents = () => {
  return useMutation({
    mutationFn: async (_filters: UploadFilterValues): Promise<Student[]> => {
      // TODO: Replace with actual API call
      // return api.get(`/students?class=${_filters.class}&group=${_filters.classGroup}&subject=${_filters.subject}&type=${_filters.assessmentType}`);
      await new Promise((r) => setTimeout(r, 800));
      return mockStudents;
    },
  });
};

export const useSaveScores = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { filters: UploadFilterValues; scores: ScoresMap }) => {
      // TODO: Replace with actual API call
      // return api.post("/results/upload-assessment", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploaded-scores"] });
    },
  });
};