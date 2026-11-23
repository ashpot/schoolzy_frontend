import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { mockDelay, mockFetchConversations, mockFetchTickets } from "../data/mockSupport";
import type { CreateTicketValues } from "../schemas";
import type { Conversation, Ticket, TicketAction } from "../types";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and SUPPORT_ENDPOINTS from "../api".

export const TICKETS_KEY = ["sa-tickets"] as const;
export const CONV_KEY = ["sa-conversations"] as const;

export const useTickets = () =>
  useQuery({
    queryKey: TICKETS_KEY,
    queryFn: (): Promise<Ticket[]> => {
      // TODO: Replace with actual API call, then map the response to Ticket[]
      // return mapTickets(await apiFetch(SUPPORT_ENDPOINTS.TICKETS));
      return mockFetchTickets();
    },
    staleTime: 30_000,
  });

export const useConversations = () =>
  useQuery({
    queryKey: CONV_KEY,
    queryFn: (): Promise<Conversation[]> => {
      // TODO: Replace with actual API call, then map the response to Conversation[]
      // return mapConversations(await apiFetch(SUPPORT_ENDPOINTS.CONVERSATIONS));
      return mockFetchConversations();
    },
    staleTime: 30_000,
  });

// Mock mutations edit the cached data only (reset on the next refetch).
// When a real endpoint ships, replace the patch with invalidateQueries.
const patchTickets = (qc: QueryClient, fn: (t: Ticket[]) => Ticket[]) =>
  qc.setQueryData<Ticket[]>(TICKETS_KEY, (old) => (old ? fn(old) : old));

const patchConvs = (qc: QueryClient, fn: (c: Conversation[]) => Conversation[]) =>
  qc.setQueryData<Conversation[]>(CONV_KEY, (old) => (old ? fn(old) : old));

export const useAssignAgent = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; agent: string | null }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SUPPORT_ENDPOINTS.ASSIGN(id), { method: "POST", body: { agent } });
      await mockDelay(600);
    },
    onSuccess: (_d, { id, agent }) =>
      patchTickets(qc, (ts) =>
        ts.map((t): Ticket => (t.id !== id ? t : { ...t, agent, status: agent && t.status === "Open" ? "In Progress" : t.status }))
      ),
  });
};

export const useTicketAction = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; action: TicketAction }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // delete: apiFetch(SUPPORT_ENDPOINTS.TICKET(id), { method: "DELETE" }); others: PATCH { status }
      await mockDelay(700);
    },
    onSuccess: (_d, { id, action }) =>
      patchTickets(qc, (ts) => {
        if (action === "delete") return ts.filter((t) => t.id !== id);
        const now = new Date().toISOString();
        return ts.map((t): Ticket =>
          t.id !== id ? t : { ...t, status: action === "resolve" ? "Resolved" : "Closed", resolvedAt: t.resolvedAt ?? now }
        );
      }),
  });
};

export const useReply = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; text: string; kind: "reply" | "note" }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SUPPORT_ENDPOINTS.REPLY(id), { method: "POST", body: { text, internal: kind === "note" } });
      await mockDelay(600);
    },
    onSuccess: (_d, { id, text, kind }) =>
      patchTickets(qc, (ts) =>
        ts.map((t): Ticket => {
          if (t.id !== id) return t;
          const now = new Date().toISOString();
          const note = kind === "note";
          return {
            ...t,
            messages: [...t.messages, { id: `m-${Date.now()}`, author: note ? "note" : "agent", name: note ? "You" : "Support Team", text, at: now }],
            // A reply puts the ball in the school's court; notes never change status
            status: !note && (t.status === "Open" || t.status === "In Progress") ? "Waiting" : t.status,
            firstResponseAt: !note ? t.firstResponseAt ?? now : t.firstResponseAt,
          };
        })
      ),
  });
};

interface CreateVars extends CreateTicketValues {
  conversationId: string;
  school: string;
  location: string;
  submittedBy: string;
}

export const useCreateTicket = () => {
  const qc = useQueryClient();
  return useMutation<Ticket, Error, CreateVars>({
    mutationFn: async (v) => {
      // TODO: Replace with actual API call
      // return mapTicket(await apiFetch(SUPPORT_ENDPOINTS.TICKETS, { method: "POST", body: { ... } }));
      await mockDelay(800);
      const count = qc.getQueryData<Ticket[]>(TICKETS_KEY)?.length ?? 0;
      const now = new Date().toISOString();
      return {
        id: `tkt-${Date.now()}`, code: `TKT-${2900 + count}`, subject: v.subject, school: v.school, location: v.location,
        submittedBy: v.submittedBy, category: v.category, priority: v.priority, status: "Open", agent: null,
        platform: "Web", browser: "—", os: "—", createdAt: now, firstResponseAt: null, resolvedAt: null, messages: [],
      };
    },
    onSuccess: (ticket, v) => {
      patchTickets(qc, (ts) => [ticket, ...ts]);
      patchConvs(qc, (cs) => cs.map((c) => (c.id === v.conversationId ? { ...c, openTickets: c.openTickets + 1 } : c)));
    },
  });
};

export const useSendMessage = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; text: string }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SUPPORT_ENDPOINTS.MESSAGES(id), { method: "POST", body: { text } });
      await mockDelay(400);
    },
    onSuccess: (_d, { id, text }) =>
      patchConvs(qc, (cs) =>
        cs.map((c): Conversation =>
          c.id !== id ? c : { ...c, messages: [...c.messages, { id: `cm-${Date.now()}`, from: "admin", text, at: new Date().toISOString(), read: false }] }
        )
      ),
  });
};

// TODO: replace with a real "mark read" call
export const useMarkRead = () => {
  const qc = useQueryClient();
  return useCallback(
    (id: string) =>
      patchConvs(qc, (cs) =>
        cs.map((c): Conversation => (c.id !== id ? c : { ...c, unread: 0, messages: c.messages.map((x) => ({ ...x, read: true })) }))
      ),
    [qc]
  );
};