import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { mockDelay, mockFetchUsers } from "../data/mockUsers";
import type { ConfirmUserAction, PlatformUser, UserKind } from "../types";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and USERS_ENDPOINTS from "../api".

export const usersKey = (kind: UserKind) => ["sa-users", kind] as const;

export const useUsers = (kind: UserKind) =>
  useQuery({
    queryKey: usersKey(kind),
    queryFn: (): Promise<PlatformUser[]> => {
      // TODO: Replace with actual API call, then map the response to PlatformUser[]
      // return mapUsers(kind, await apiFetch(USERS_ENDPOINTS.LIST(kind)));
      return mockFetchUsers(kind);
    },
    staleTime: 30_000,
  });

// Mock mutations edit the cached list only (reset on the next refetch).
// When a real endpoint ships, replace the patch with invalidateQueries({ queryKey: usersKey(kind) }).
function patch(qc: QueryClient, kind: UserKind, fn: (users: PlatformUser[]) => PlatformUser[]) {
  qc.setQueryData<PlatformUser[]>(usersKey(kind), (old) => (old ? fn(old) : old));
}

interface ActionVars {
  id: string;
  action: ConfirmUserAction;
}

export const useUserAction = (kind: UserKind) => {
  const qc = useQueryClient();
  return useMutation<void, Error, ActionVars>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // const path = { login: "login-as", reset: "reset-password", deactivate: "deactivate", activate: "activate" }[action];
      // await apiFetch(USERS_ENDPOINTS.ACTION(kind, id, path), { method: "POST" });
      // "login" must return a short-lived, audited token and open the school's site in a new tab.
      await mockDelay(700);
    },
    onSuccess: (_d, { id, action }) => {
      if (action === "deactivate" || action === "activate") {
        patch(qc, kind, (users) =>
          users.map((u) => (u.id === id ? { ...u, status: action === "activate" ? "Active" : "Inactive" } : u))
        );
      }
    },
  });
};

export const useSendUserEmail = () =>
  useMutation<void, Error, { id: string; subject: string; message: string }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(USERS_ENDPOINTS.SEND_EMAIL(id), { method: "POST", body: { subject, message } });
      await mockDelay(800);
    },
  });

interface InviteVars {
  fullName: string;
  email: string;
  schoolId: string;
  schoolName: string;
}

export const useInviteAdmin = () => {
  const qc = useQueryClient();
  return useMutation<PlatformUser, Error, InviteVars>({
    mutationFn: async (v) => {
      // TODO: Replace with actual API call
      // await apiFetch(USERS_ENDPOINTS.INVITE_ADMIN, { method: "POST", body: { full_name: v.fullName, email: v.email, school: v.schoolId } });
      await mockDelay(900);
      const existing = qc.getQueryData<PlatformUser[]>(usersKey("admin")) ?? [];
      if (existing.some((u) => u.email.toLowerCase() === v.email.toLowerCase())) {
        throw new Error("An administrator with this email already exists.");
      }
      return {
        id: `admin-invited-${Date.now()}`,
        kind: "admin",
        name: v.fullName,
        email: v.email,
        phone: null,
        school: v.schoolName,
        location: null,
        status: "Inactive", // stays inactive until they accept the invitation
        lastLogin: null,
        createdAt: new Date().toISOString(),
        plan: null,
      };
    },
    onSuccess: (admin) => patch(qc, "admin", (users) => [admin, ...users]),
  });
};