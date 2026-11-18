import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { mockDelay, mockFetchDetail, mockFetchPlans, mockFetchSubscriptions } from "../data/mockSubscriptions";
import type { PlanValues } from "../schemas";
import type { Plan, PlanAction, SubAction, Subscription } from "../types";
import { periodMonths } from "../utils/derive";
import { addMonthsIso, daysFromToday, todayIso } from "../utils/format";
import { valuesToPlan } from "../utils/mapPlan";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and SUBSCRIPTIONS_ENDPOINTS from "../api".

export const PLANS_KEY = ["sa-plans"] as const;
export const SUBS_KEY = ["sa-subscriptions"] as const;

export const usePlans = () =>
  useQuery({
    queryKey: PLANS_KEY,
    queryFn: (): Promise<Plan[]> => {
      // TODO: Replace with actual API call, then map the response to Plan[]
      // return mapPlans(await apiFetch(SUBSCRIPTIONS_ENDPOINTS.PLANS));
      return mockFetchPlans();
    },
    staleTime: 30_000,
  });

export const useSubscriptions = () =>
  useQuery({
    queryKey: SUBS_KEY,
    queryFn: (): Promise<Subscription[]> => {
      // TODO: Replace with actual API call, then map the response to Subscription[]
      // return mapSubscriptions(await apiFetch(SUBSCRIPTIONS_ENDPOINTS.LIST));
      return mockFetchSubscriptions();
    },
    staleTime: 30_000,
  });

// Usage + payment history load only while a drawer is open.
export const useSubscriptionDetail = (sub: Subscription | null) =>
  useQuery({
    queryKey: [...SUBS_KEY, sub?.id ?? "none", "detail"],
    queryFn: () => {
      // TODO: Replace with actual API call
      // return apiFetch(SUBSCRIPTIONS_ENDPOINTS.DETAIL(sub.id));
      return mockFetchDetail(sub as Subscription);
    },
    enabled: Boolean(sub),
    staleTime: 30_000,
  });

// Mock mutations edit the cached lists only (reset on the next refetch).
// When a real endpoint ships, replace the patch with invalidateQueries.
const patchPlans = (qc: QueryClient, fn: (plans: Plan[]) => Plan[]) =>
  qc.setQueryData<Plan[]>(PLANS_KEY, (old) => (old ? fn(old) : old));

const patchSubs = (qc: QueryClient, fn: (subs: Subscription[]) => Subscription[]) =>
  qc.setQueryData<Subscription[]>(SUBS_KEY, (old) => (old ? fn(old) : old));

export const useSavePlan = () => {
  const qc = useQueryClient();
  return useMutation<Plan, Error, { id?: string; values: PlanValues }>({
    mutationFn: async ({ id, values }) => {
      // TODO: Replace with actual API call
      // return apiFetch(id ? SUBSCRIPTIONS_ENDPOINTS.PLAN(id) : SUBSCRIPTIONS_ENDPOINTS.PLANS, { method: id ? "PATCH" : "POST", body: ... });
      await mockDelay(900);
      const existing = qc.getQueryData<Plan[]>(PLANS_KEY) ?? [];
      const name = values.name.trim().toLowerCase();
      if (existing.some((p) => p.id !== id && p.name.toLowerCase() === name)) {
        throw new Error("A plan with this name already exists.");
      }
      const prev = existing.find((p) => p.id === id);
      return { id: id ?? `plan-${Date.now()}`, ...valuesToPlan(values), schools: prev?.schools ?? 0 };
    },
    onSuccess: (plan, { id }) =>
      patchPlans(qc, (plans) => {
        const next = id ? plans.map((p) => (p.id === id ? plan : p)) : [...plans, plan];
        // Only one plan can be "Most Popular"
        return plan.recommended ? next.map((p) => (p.id === plan.id ? p : { ...p, recommended: false })) : next;
      }),
  });
};

export const usePlanAction = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; action: PlanAction }>({
    mutationFn: async ({ id, action }) => {
      // TODO: Replace with actual API call
      // delete: apiFetch(SUBSCRIPTIONS_ENDPOINTS.PLAN(id), { method: "DELETE" }); others: PATCH with the changed flag
      await mockDelay(700);
      if (action === "delete") {
        const plan = (qc.getQueryData<Plan[]>(PLANS_KEY) ?? []).find((p) => p.id === id);
        if (plan && plan.schools > 0) {
          throw new Error(`${plan.schools} schools are on this plan. Move them to another plan first.`);
        }
      }
    },
    onSuccess: (_d, { id, action }) =>
      patchPlans(qc, (plans) => {
        if (action === "delete") return plans.filter((p) => p.id !== id);
        return plans.map((p): Plan => {
          if (action === "recommend") return { ...p, recommended: p.id === id };
          if (p.id !== id) return p;
          if (action === "unrecommend") return { ...p, recommended: false };
          return { ...p, active: action === "activate" };
        });
      }),
  });
};

export const useSubscriptionAction = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; action: SubAction }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SUBSCRIPTIONS_ENDPOINTS.ACTION(id, action), { method: "POST" });
      // (reminder emails the school admin; invoice returns a downloadable invoice)
      await mockDelay(800);
    },
    onSuccess: (_d, { id, action }) => {
      if (action === "reminder") return;
      patchSubs(qc, (subs) =>
        subs.map((s): Subscription => {
          if (s.id !== id) return s;
          if (action === "suspend") return { ...s, status: "Suspended" };
          if (action === "invoice") return { ...s, invoiceGeneratedAt: todayIso() };
          // renew: extend from the current expiry, or from today if it already lapsed
          const base = daysFromToday(s.expires) >= 0 ? s.expires : todayIso();
          return { ...s, expires: addMonthsIso(base, periodMonths(s.billing)), status: "Active", invoiceGeneratedAt: null };
        })
      );
    },
  });
};

export const useChangePlan = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; plan: string }>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(SUBSCRIPTIONS_ENDPOINTS.ACTION(id, "change-plan"), { method: "POST", body: { plan } });
      await mockDelay(900);
    },
    onSuccess: (_d, { id, plan }) => {
      const target = (qc.getQueryData<Plan[]>(PLANS_KEY) ?? []).find((p) => p.name === plan);
      patchSubs(qc, (subs) =>
        subs.map((s): Subscription =>
          s.id !== id
            ? s
            : {
                ...s,
                plan,
                amount: target ? (s.billing === "Annual" ? target.yearlyPrice : target.monthlyPrice) : s.amount,
              }
        )
      );
    },
  });
};