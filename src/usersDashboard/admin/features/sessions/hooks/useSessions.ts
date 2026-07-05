import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SessionValues, TermValues } from "../schemas";

// ── Sessions ────────────────────────────────────────────────

export const useCreateSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SessionValues) => {
      // TODO: Replace with actual API call e.g. api.post("/sessions", payload)
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] }),
  });
};

export const useDeleteSession = () => {
  const qc = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call e.g. api.delete(`/sessions/${id}`)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] }),
  });
};

// ── Terms ────────────────────────────────────────────────────

export const useCreateTerm = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TermValues) => {
      // TODO: Replace with actual API call e.g. api.post("/terms", payload)
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["terms"] }),
  });
};

export const useDeleteTerm = () => {
  const qc = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call e.g. api.delete(`/terms/${id}`)
      await new Promise((r) => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["terms"] }),
  });
};