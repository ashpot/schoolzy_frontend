import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SessionValues, TermValues } from "../schemas";
import type { SessionPayload, SessionResponse, SessionListItem, TermPayload, TermResponse } from "../types";
import type { SessionPatch } from "../utils/buildSessionPatch";
import { apiRequest } from "@/shared/lib/apiClient";
import { SESSIONS_ENDPOINTS } from "../api";

// ── Sessions ────────────────────────────────────────────────

export const useCreateSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: SessionValues) => {
      const payload: SessionPayload = {
        name: values.name,
        start_date: values.startDate,
        end_date: values.endDate,
        is_active: values.isActive,
      };
      // NOTE: backend does not accept is_active on create — always returns false.
      // Activate afterwards with useUpdateSession({ id, changes: { is_active: true } }).
      return apiRequest<SessionResponse>(SESSIONS_ENDPOINTS.CREATE_SESSION, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] }),
  });
};

export const useSessionsList = () => {
  return useQuery({
    queryKey: ["sessions", "list"],
    queryFn: async () => {
      return apiRequest<SessionListItem[]>(SESSIONS_ENDPOINTS.LIST_SESSIONS);
    },
  });
};

export const useUpdateSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, changes }: { id: string; changes: SessionPatch }) => {
      // PATCH sends only the changed fields. Detail URL needs the id.
      // TODO: move to SESSIONS_ENDPOINTS.UPDATE_SESSION(id) when you next touch api.ts
      return apiRequest<SessionResponse>(SESSIONS_ENDPOINTS.EDIT_SESSION(id), {
        method: "PATCH",
        body: JSON.stringify(changes),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      // Terms show the session name, so refresh them too
      qc.invalidateQueries({ queryKey: ["terms"] });
    },
  });
};

export const useDeleteSession = () => {
  const qc = useQueryClient();
  return useMutation({
    // @ts-ignore
    mutationFn: async (id: string) => {
      // TODO: no delete endpoint confirmed for sessions yet
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
    mutationFn: async (values: TermValues) => {
      const payload: TermPayload = {
        name: values.name,
        is_active: values.isActive,
        result_published: values.resultPublished,
        tag: values.tag,
        start_date: values.startDate,
        end_date: values.endDate,
        session: Number(values.sessionId),
      };
      return apiRequest<TermResponse>(SESSIONS_ENDPOINTS.CREATE_TERM, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["terms"] }),
  });
};

export const useTermsList = () => {
  return useQuery({
    queryKey: ["terms", "list"],
    queryFn: async () => {
      return apiRequest<TermResponse[]>(SESSIONS_ENDPOINTS.LIST_TERMS);
    },
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