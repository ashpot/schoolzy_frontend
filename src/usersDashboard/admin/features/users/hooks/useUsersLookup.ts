import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import type { UserResponse } from "../types";
import { USERS_ENDPOINTS } from "../api";

export const useUsersLookup = () => {
  return useQuery({
    queryKey: ["users", "lookup"],
    queryFn: async () => {
      const raw = await apiRequest<UserResponse[]>(USERS_ENDPOINTS.LIST_ALL);
      const map = new Map<number, string>();
      raw.forEach((u) => map.set(u.id, `${u.first_name} ${u.last_name}`));
      return map;
    },
  });
};