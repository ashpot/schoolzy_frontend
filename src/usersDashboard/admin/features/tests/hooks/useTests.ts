import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QuestionFormValues, CreateTestValues, ScheduleTestValues } from "../schemas";

// ─── Questions ─────────────────────────────────────────────────────────────
export const useAddQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: QuestionFormValues) => {
      // TODO: Replace with actual API call
      // return api.post("/questions", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    //@ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call
      // return api.delete(`/questions/${id}`);
      await new Promise((r) => setTimeout(r, 600));
      return { success: true };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
  });
};

// ─── Tests ─────────────────────────────────────────────────────────────────
export const useCreateTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateTestValues) => {
      // TODO: Replace with actual API call
      // return api.post("/tests", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tests"] }),
  });
};

export const useDeleteTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    //@ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call
      // return api.delete(`/tests/${id}`);
      await new Promise((r) => setTimeout(r, 600));
      return { success: true };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tests"] }),
  });
};

// ─── Scheduled Tests ───────────────────────────────────────────────────────
export const useScheduleTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ScheduleTestValues) => {
      // TODO: Replace with actual API call
      // return api.post("/scheduled-tests", payload);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scheduled-tests"] }),
  });
};

export const useDeleteScheduledTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    //@ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call
      // return api.delete(`/scheduled-tests/${id}`);
      await new Promise((r) => setTimeout(r, 600));
      return { success: true };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scheduled-tests"] }),
  });
};

// ─── Results ───────────────────────────────────────────────────────────────
export const useDeleteResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    //@ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call
      // return api.delete(`/results/${id}`);
      await new Promise((r) => setTimeout(r, 600));
      return { success: true };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["results"] }),
  });
};