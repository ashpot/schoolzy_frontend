import { useMutation } from "@tanstack/react-query";
import { mockSubjectResults } from "../data/mockData";
import type { ViewSubjectResultFiltersValues } from "../schemas";

export const useLoadSubjectResults = () => {
  return useMutation({
    //@ts-ignore
    mutationFn: async (payload: ViewSubjectResultFiltersValues) => {
      // TODO: Replace with actual API call
      // return api.get("/results/by-subject", { params: payload });
      await new Promise((r) => setTimeout(r, 700));
      return mockSubjectResults;
    },
  });
};