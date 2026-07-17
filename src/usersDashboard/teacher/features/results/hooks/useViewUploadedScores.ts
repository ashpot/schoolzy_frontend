import { useMutation } from "@tanstack/react-query";
import { mockUploadedScores } from "../data/mockData";
import type { ViewUploadedScoresFiltersValues } from "../schemas";

export const useLoadUploadedScores = () => {
  return useMutation({
    //@ts-ignore
    mutationFn: async (payload: ViewUploadedScoresFiltersValues) => {
      // TODO: Replace with actual API call
      // return api.get("/results/uploaded-scores", { params: payload });
      await new Promise((r) => setTimeout(r, 700));
      return mockUploadedScores;
    },
  });
};