import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { userStorage } from "@/super-admin-auth";
import { mockDelay, mockFetchRoles } from "../data/mockRoles";
import type { RoleValues } from "../schemas";
import type { PermissionMap, Role } from "../types";
import { emptyPermissions, normalize } from "../utils/derive";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and ROLES_ENDPOINTS from "../api".

export const ROLES_KEY = ["sa-roles"] as const;

export const useRoles = () =>
  useQuery({
    queryKey: ROLES_KEY,
    queryFn: (): Promise<Role[]> => {
      // TODO: Replace with actual API call; run each role's permissions through normalize()
      // return mapRoles(await apiFetch(ROLES_ENDPOINTS.LIST));
      return mockFetchRoles();
    },
    staleTime: 30_000,
  });

// Mock mutations edit the cached list only (reset on the next refetch).
const patch = (qc: QueryClient, fn: (roles: Role[]) => Role[]) =>
  qc.setQueryData<Role[]>(ROLES_KEY, (old) => (old ? fn(old) : old));

const find = (qc: QueryClient, id: string) => qc.getQueryData<Role[]>(ROLES_KEY)?.find((r) => r.id === id);

export const useSavePermissions = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; permissions: PermissionMap }>({
    mutationFn: async ({ id }) => {
      if (find(qc, id)?.system) throw new Error("System roles cannot be modified.");
      // TODO: Replace with actual API call (the server must enforce this too)
      // await apiFetch(ROLES_ENDPOINTS.PERMISSIONS(id), { method: "PUT", body: { permissions } });
      await mockDelay(800);
    },
    onSuccess: (_d, { id, permissions }) =>
      patch(qc, (roles) =>
        roles.map((r) => (r.id === id ? { ...r, permissions: normalize(permissions), updatedAt: new Date().toISOString() } : r))
      ),
  });
};

export const useSaveRole = () => {
  const qc = useQueryClient();
  return useMutation<Role, Error, { id?: string; values: RoleValues }>({
    mutationFn: async ({ id, values }) => {
      const roles = qc.getQueryData<Role[]>(ROLES_KEY) ?? [];
      const name = values.name.trim();
      if (roles.some((r) => r.id !== id && r.name.toLowerCase() === name.toLowerCase())) {
        throw new Error("A role with this name already exists.");
      }
      // TODO: Replace with actual API call
      // return mapRole(await apiFetch(id ? ROLES_ENDPOINTS.ROLE(id) : ROLES_ENDPOINTS.LIST, { method: id ? "PATCH" : "POST", body: values }));
      await mockDelay(800);
      const now = new Date().toISOString();
      if (id) {
        const existing = find(qc, id);
        if (!existing) throw new Error("Role not found.");
        if (existing.system) throw new Error("System roles cannot be modified.");
        return { ...existing, name, description: values.description.trim(), updatedAt: now };
      }
      const u = userStorage.get();
      return {
        id: `role-${Date.now()}`, name, description: values.description.trim(), system: false, active: true, users: 0,
        createdBy: `${u?.first_name ?? ""} ${u?.last_name ?? ""}`.trim() || "Super Admin",
        createdAt: now, updatedAt: now, permissions: emptyPermissions(),
      };
    },
    onSuccess: (role, { id }) => patch(qc, (roles) => (id ? roles.map((r) => (r.id === id ? role : r)) : [...roles, role])),
  });
};