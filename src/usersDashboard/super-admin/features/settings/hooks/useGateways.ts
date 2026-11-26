import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { mockDelay, mockFetchGateways } from "../data/mockSettings";
import type { GatewayValues } from "../schemas";
import type { Gateway, GatewayStatus, GatewaysData } from "../types";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and SETTINGS_ENDPOINTS from "../api".

export const GATEWAYS_KEY = ["sa-gateways"] as const;

export const useGateways = () =>
  useQuery({
    queryKey: GATEWAYS_KEY,
    queryFn: (): Promise<GatewaysData> => {
      // TODO: Replace with actual API call, then map the response to GatewaysData
      // return mapGateways(await apiFetch(SETTINGS_ENDPOINTS.GATEWAYS));
      return mockFetchGateways();
    },
    staleTime: 30_000,
  });

// Mock mutations edit the cached data only (reset on the next refetch).
const patch = (qc: QueryClient, fn: (g: Gateway[]) => Gateway[]) =>
  qc.setQueryData<GatewaysData>(GATEWAYS_KEY, (old) => (old ? { ...old, gateways: fn(old.gateways) } : old));

const find = (qc: QueryClient, id: string) =>
  qc.getQueryData<GatewaysData>(GATEWAYS_KEY)?.gateways.find((g) => g.id === id);

export const useToggleGateway = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; enabled: boolean }>({
    mutationFn: async ({ id, enabled }) => {
      const all = qc.getQueryData<GatewaysData>(GATEWAYS_KEY)?.gateways ?? [];
      const g = find(qc, id);
      if (enabled && g?.status === "Disconnected") throw new Error("Configure this gateway before enabling it.");
      if (!enabled && all.filter((x) => x.enabled).length <= 1) throw new Error("At least one gateway must stay enabled.");
      // TODO: Replace with actual API call
      // await apiFetch(SETTINGS_ENDPOINTS.GATEWAY(id), { method: "PATCH", body: { enabled } });
      await mockDelay(600);
    },
    onSuccess: (_d, { id, enabled }) => patch(qc, (gs) => gs.map((g) => (g.id === id ? { ...g, enabled } : g))),
  });
};

export const useSaveGateway = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; values: GatewayValues }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call. The secret key is sent only when the field is not blank.
      // await apiFetch(SETTINGS_ENDPOINTS.GATEWAY(id), { method: "PATCH", body: { ... } });
      await mockDelay(900);
    },
    onSuccess: (_d, { id, values }) =>
      patch(qc, (gs) =>
        gs.map((g): Gateway => {
          if (g.id !== id) return g;
          const hasSecret = g.hasSecret || Boolean(values.secretKey); // the secret itself is never stored here
          const ready = !g.needsKeys || (Boolean(values.publicKey) && hasSecret);
          const status: GatewayStatus = !ready ? "Disconnected" : values.mode === "sandbox" && g.needsKeys ? "Sandbox" : "Connected";
          return { ...g, mode: values.mode, currency: values.currency, publicKey: values.publicKey, hasSecret, status };
        })
      ),
  });
};

export const useTestGateway = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      if (find(qc, id)?.status === "Disconnected") throw new Error("Configure this gateway before testing it.");
      // TODO: Replace with actual API call
      // await apiFetch(SETTINGS_ENDPOINTS.GATEWAY_TEST(id), { method: "POST" });
      await mockDelay(1000);
    },
    onSuccess: (_d, id) => patch(qc, (gs) => gs.map((g) => (g.id === id ? { ...g, lastTested: new Date().toISOString() } : g))),
  });
};