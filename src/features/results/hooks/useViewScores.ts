import { useMutation } from "@tanstack/react-query";
import type { ViewScoresFilterValues } from "../schemas/viewScores";
import type { ViewScore } from "../types";
import { mockViewScores } from "../data/mockData";

export const useLoadViewScores = () => {
  return useMutation({
    mutationFn: async (_filters: ViewScoresFilterValues): Promise<ViewScore[]> => {
      // TODO: Replace with actual API call
      // return api.get(`/results/view?class=${_filters.class}&group=${_filters.classGroup}&subject=${_filters.subject}&term=${_filters.term}`);
      await new Promise((r) => setTimeout(r, 800));
      return mockViewScores;
    },
  });
};