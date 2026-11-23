import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { mockDelay, mockFetchSettings } from "../data/mockSettings";
import type { BrandingValues } from "../schemas";
import type { PlatformSettings, SystemAction } from "../types";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and SETTINGS_ENDPOINTS from "../api".

export const SETTINGS_KEY = ["sa-settings"] as const;

export const usePlatformSettings = () =>
  useQuery({
    queryKey: SETTINGS_KEY,
    queryFn: (): Promise<PlatformSettings> => {
      // TODO: Replace with actual API call, then map the response to PlatformSettings
      // return mapSettings(await apiFetch(SETTINGS_ENDPOINTS.PLATFORM));
      return mockFetchSettings();
    },
    staleTime: 30_000,
  });

// Mock mutations edit the cached data only (reset on the next refetch).
// When a real endpoint ships, replace the patch with invalidateQueries.
const patch = (qc: QueryClient, fn: (s: PlatformSettings) => PlatformSettings) =>
  qc.setQueryData<PlatformSettings>(SETTINGS_KEY, (old) => (old ? fn(old) : old));

type PlainSection = "general" | "security" | "localization";

function createSave<K extends PlainSection>(section: K) {
  return function useSaveSection() {
    const qc = useQueryClient();
    return useMutation<void, Error, PlatformSettings[K]>({
      mutationFn: async () => {
        // TODO: Replace with actual API call
        // await apiFetch(SETTINGS_ENDPOINTS.SECTION(section), { method: "PATCH", body: values });
        await mockDelay(800);
      },
      onSuccess: (_d, values) => patch(qc, (s) => ({ ...s, [section]: values }) as PlatformSettings),
    });
  };
}

export const useSaveGeneral = createSave("general");
export const useSaveSecurity = createSave("security");
export const useSaveLocalization = createSave("localization");

export const useSaveBranding = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, BrandingValues>({
    mutationFn: async () => {
      // TODO: Replace with actual API call (multipart because of the image uploads)
      // const fd = new FormData(); append colours + any new files
      // await apiFetch(SETTINGS_ENDPOINTS.SECTION("branding"), { method: "PATCH", body: fd });
      await mockDelay(900);
    },
    onSuccess: (_d, v) =>
      patch(qc, (s) => ({
        ...s,
        branding: {
          primaryColor: v.primaryColor,
          secondaryColor: v.secondaryColor,
          accentColor: v.accentColor,
          logoUrl: v.logo ? URL.createObjectURL(v.logo) : s.branding.logoUrl,
          faviconUrl: v.favicon ? URL.createObjectURL(v.favicon) : s.branding.faviconUrl,
          loginBgUrl: v.loginBg ? URL.createObjectURL(v.loginBg) : s.branding.loginBgUrl,
        },
      })),
  });
};

export const useSetMaintenance = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { enabled: boolean; message: string }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SETTINGS_ENDPOINTS.MAINTENANCE, { method: "POST", body: { enabled, message } });
      await mockDelay(800);
    },
    onSuccess: (_d, v) => patch(qc, (s) => ({ ...s, system: { ...s.system, maintenance: v } })),
  });
};

const ACTION_RESULT: Record<SystemAction, string> = {
  cache: "Cache cleared.",
  optimize: "Database optimized.",
  diagnostics: "Diagnostics finished: no problems found.",
};

export const useSystemAction = () =>
  useMutation<string, Error, SystemAction>({
    mutationFn: async (action) => {
      // TODO: Replace with actual API call
      // await apiFetch(SETTINGS_ENDPOINTS.SYSTEM_ACTION({ cache: "clear-cache", optimize: "optimize-database", diagnostics: "diagnostics" }[action]), { method: "POST" });
      await mockDelay(1200);
      return ACTION_RESULT[action];
    },
  });