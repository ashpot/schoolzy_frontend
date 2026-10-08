import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { ACADEMICS_ENDPOINTS } from "../api";
import type { PsychomotivePayload, PsychomotiveResponse } from "../types/psychomotive";
import type { PsychomotiveMetricFormValues } from "../schemas";

export function useAddPsychomotiveMetric() {
  return useMutation({
    mutationFn: async (values: PsychomotiveMetricFormValues) => {
      const payload: PsychomotivePayload = {
        title: values.title,
        section: Number(values.section),
      };
      return apiRequest<PsychomotiveResponse>(ACADEMICS_ENDPOINTS.CREATE_PSYCHOMOTIVE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    // No invalidation: GET /academics/psychomotive-evaluation/ returns 500,
    // so the page appends the 201 response to its own session list instead.
  });
}

export function useDeletePsychomotiveMetric() {
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: no delete endpoint confirmed. Replace with api.delete(`/academics/psychomotive-evaluation/${id}/`)
      await new Promise((r) => setTimeout(r, 300));
      return { success: true };
    },
  });
}

export function useEditPsychomotiveMetric() {
  return useMutation({
    mutationFn: async (payload: { id: string; title: string }) => {
      // TODO: no update endpoint confirmed. Replace with api.patch(`/academics/psychomotive-evaluation/${id}/`)
      await new Promise((r) => setTimeout(r, 300));
      return { success: true, data: payload };
    },
  });
}