import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { mockDelay, mockFetchComms } from "../data/mockSettings";
import type { EmailValues, SmsValues, TemplateValues } from "../schemas";
import type { CommsData, Template } from "../types";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and SETTINGS_ENDPOINTS from "../api".

export const COMMS_KEY = ["sa-comms"] as const;

export const useComms = () =>
  useQuery({
    queryKey: COMMS_KEY,
    queryFn: (): Promise<CommsData> => {
      // TODO: Replace with actual API call, then map the response to CommsData
      // return mapComms(await apiFetch(SETTINGS_ENDPOINTS.COMMS));
      return mockFetchComms();
    },
    staleTime: 30_000,
  });

// Mock mutations edit the cached data only (reset on the next refetch).
const patch = (qc: QueryClient, fn: (c: CommsData) => CommsData) =>
  qc.setQueryData<CommsData>(COMMS_KEY, (old) => (old ? fn(old) : old));

export const useSaveEmail = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, EmailValues>({
    mutationFn: async () => {
      // TODO: Replace with actual API call. Send the password only when the field is not blank.
      // await apiFetch(SETTINGS_ENDPOINTS.EMAIL, { method: "PATCH", body: ... });
      await mockDelay(800);
    },
    onSuccess: (_d, { password, ...rest }) =>
      patch(qc, (c) => ({ ...c, email: { ...rest, hasPassword: c.email.hasPassword || Boolean(password) } })),
  });
};

export const useSaveSms = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, SmsValues>({
    mutationFn: async () => {
      // TODO: Replace with actual API call. Send the API key only when the field is not blank.
      // await apiFetch(SETTINGS_ENDPOINTS.SMS, { method: "PATCH", body: ... });
      await mockDelay(800);
    },
    onSuccess: (_d, { apiKey, ...rest }) =>
      patch(qc, (c) => ({ ...c, sms: { ...rest, hasApiKey: c.sms.hasApiKey || Boolean(apiKey) } })),
  });
};

export const useTestSend = () =>
  useMutation<void, Error, { kind: "email" | "sms"; to: string }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SETTINGS_ENDPOINTS.TEST_SEND(kind), { method: "POST", body: { to } });
      await mockDelay(1000);
    },
  });

export const useSaveTemplate = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id?: string; values: TemplateValues }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(id ? SETTINGS_ENDPOINTS.TEMPLATE(id) : SETTINGS_ENDPOINTS.TEMPLATES, { method: id ? "PATCH" : "POST", body: values });
      await mockDelay(800);
    },
    onSuccess: (_d, { id, values }) =>
      patch(qc, (c) => {
        const now = new Date().toISOString();
        const next: Template = { id: id ?? `t-${Date.now()}`, ...values, updatedAt: now };
        return { ...c, templates: id ? c.templates.map((t) => (t.id === id ? next : t)) : [next, ...c.templates] };
      }),
  });
};

export const useDuplicateTemplate = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SETTINGS_ENDPOINTS.TEMPLATES, { method: "POST", body: { duplicate_of: id } });
      await mockDelay(600);
    },
    onSuccess: (_d, id) =>
      patch(qc, (c) => {
        const src = c.templates.find((t) => t.id === id);
        if (!src) return c;
        const copy: Template = { ...src, id: `t-${Date.now()}`, name: `${src.name} (Copy)`, status: "Draft", updatedAt: new Date().toISOString() };
        return { ...c, templates: [copy, ...c.templates] };
      }),
  });
};