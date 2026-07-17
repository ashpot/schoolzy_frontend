import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveOmittedScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { studentId: string; score: number }) => {
      // TODO: Replace with actual API call
      // return api.post(`/results/omitted/${payload.studentId}`, payload);
      await new Promise((r) => setTimeout(r, 600));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["omitted-students"] });
    },
  });
};

export const useUploadAllOmitted = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { studentId: string; score: number }[]) => {
      // TODO: Replace with actual API call
      // return api.post("/results/omitted/bulk", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["omitted-students"] });
    },
  });
};