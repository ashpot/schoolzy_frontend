import { useMutation } from "@tanstack/react-query";
import type { CheckResultValues } from "../schemas";
import { mockResultSheet } from "../data/mockData";

export const useLoadResult = () => {
  return useMutation({
    mutationFn: async (values: CheckResultValues) => {
      // TODO: Replace with actual API call
      // return api.get(`/results?childId=${values.childId}&session=${values.session}&term=${values.term}`);
      await new Promise((r) => setTimeout(r, 800));
      return { ...mockResultSheet, session: values.session, term: values.term };
    },
  });
};