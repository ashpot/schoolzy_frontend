import { useMutation } from "@tanstack/react-query";
import type { CheckResultValues } from "../schemas";
import type { ResultSheet } from "../types";
import { mockResultSheet } from "../data/mockData";

export const useCheckResult = () => {
  return useMutation({
    mutationFn: async (filters: CheckResultValues): Promise<ResultSheet> => {
      // TODO: Replace with actual API call
      // return api.get(`/students/me/results?term=${filters.term}&session=${filters.session}`);
      await new Promise((r) => setTimeout(r, 800));
      return { ...mockResultSheet, term: filters.term, session: filters.session };
    },
  });
};