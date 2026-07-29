import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveAssessmentScores = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { classId: string; subjectId: string; assessmentType: string; scores: Record<string, number> }) => {
      // TODO: Replace with actual API call
      // return api.post("/results/upload-by-type", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upload-results"] });
    },
  });
};