import { useQuery } from "@tanstack/react-query";
import { AUTH_ENDPOINTS } from "../api";
const COUNTRY = "Nigeria";

interface StatesResponse {
  error: boolean;
  msg: string;
  data: { name: string; states: { name: string; state_code: string }[] };
}
interface CitiesResponse {
  error: boolean;
  msg: string;
  data: string[];
}
export interface LocationOption { value: string; label: string }

// Third-party API: plain fetch on purpose (no auth/tenant headers must leak)
async function post<T extends { error: boolean; msg: string }>(path: string, body: object): Promise<T> {
  const res = await fetch(`${AUTH_ENDPOINTS.LOCATION_API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => null)) as T | null;
  if (!res.ok || !json || json.error) {
    throw new Error(json?.msg || "Couldn't load locations");
  }
  return json;
}

const toOptions = (names: string[]): LocationOption[] =>
  [...new Set(names)]
    .sort((a, b) => a.localeCompare(b))
    .map((n) => ({ value: n, label: n }));

// Pass the currently selected state; cities load only once a state is chosen.
export const useLocations = (state: string) => {
  const statesQuery = useQuery({
    queryKey: ["locations", "states", COUNTRY],
    queryFn: async () => {
      const res = await post<StatesResponse>("/states", { country: COUNTRY });
      return toOptions(res.data.states.map((s) => s.name));
    },
    staleTime: Infinity, // geo data doesn't change during a session
    gcTime: Infinity,
    retry: 2,
  });

  const citiesQuery = useQuery({
    queryKey: ["locations", "cities", COUNTRY, state],
    queryFn: async () => {
      const res = await post<CitiesResponse>("/state/cities", { country: COUNTRY, state });
      return toOptions(res.data);
    },
    enabled: !!state,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  });

  return {
    states: statesQuery.data ?? [],
    cities: state ? citiesQuery.data ?? [] : [],
    statesLoading: statesQuery.isLoading,
    citiesLoading: !!state && citiesQuery.isLoading,
    statesError: statesQuery.error?.message,
    citiesError: citiesQuery.error?.message,
    refetchStates: statesQuery.refetch,
    refetchCities: citiesQuery.refetch,
  };
};