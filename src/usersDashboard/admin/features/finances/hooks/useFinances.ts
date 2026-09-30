import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FeeTypeValues, FeeValues } from "../schemas";
import type {
  FeeType, FeeTypePayload, FeeTypeResponse,
  Fee, FeePayload, FeeResponse,
  AssignFeePayload, AssignFeeResponse,
  PaymentPayload, PaymentResponse,
  ExpensePayload, ExpenseResponse, ExpenseReportResponse,
} from "../types";
import { apiRequest } from "@/shared/lib/apiClient";
import { FINANCES_ENDPOINTS } from "../api";
import { useTermsList } from "@/usersDashboard/admin/features/sessions/hooks/useSessions";
import { useSectionsList } from "@/usersDashboard/admin/features/sections/hooks/useSections";
import { useStudentOptionsList } from "@/usersDashboard/admin/features/users/hooks/useStudents";
import { useUsersLookup } from "@/usersDashboard/admin/features/users/hooks/useUsersLookup";

function createDelete(queryKey: string) {
  return function () {
    const qc = useQueryClient();
    return useMutation({
      // @ts-ignore
      mutationFn: async (id: string) => {
        // TODO: Replace with actual API call e.g. api.delete(`/${queryKey}/${id}`) — no delete endpoint yet
        await new Promise((r) => setTimeout(r, 500));
        return { success: true };
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
    });
  };
}

// ── Re-exports (DRY — reuse hooks already built in other features) ──
export { useTermsList, useSectionsList, useStudentOptionsList, useUsersLookup };

// ── Fee Types ────────────────────────────────────────────────
export const useFeeTypesList = () => {
  return useQuery({
    queryKey: ["fee-types", "list"],
    queryFn: async () => {
      const raw = await apiRequest<FeeTypeResponse[]>(FINANCES_ENDPOINTS.LIST_FEE_TYPES);
      return raw.map((f) => ({ id: String(f.id), name: f.name, description: f.description })) as FeeType[];
    },
  });
};

export const useCreateFeeType = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: FeeTypeValues) => {
      const payload: FeeTypePayload = { name: values.name, description: values.description };
      return apiRequest<FeeTypeResponse>(FINANCES_ENDPOINTS.CREATE_FEE_TYPE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fee-types"] }),
  });
};

export const useDeleteFeeType = createDelete("fee-types");

// ── Fees ─────────────────────────────────────────────────────
export const useFeesList = () => {
  return useQuery({
    queryKey: ["fees", "list"],
    queryFn: async () => {
      const raw = await apiRequest<FeeResponse[]>(FINANCES_ENDPOINTS.LIST_FEES);
      const mapped: Fee[] = raw.map((f) => ({
        id: String(f.id),
        name: f.name,
        feeTypeId: String(f.fee_type),
        feeTypeName: f.fee_type_name,
        termId: String(f.term),
        termName: f.term_name,
        amount: Number(f.amount),
        dateDue: f.date_due,
        dateCreated: f.date_created,
      }));
      return mapped;
    },
  });
};

export const useCreateFee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: FeeValues) => {
      const payload: FeePayload = {
        name: values.name,
        fee_type: Number(values.feeTypeId),
        term: Number(values.term),
        amount: values.amount,
        date_due: values.dateDue,
      };
      return apiRequest<FeeResponse>(FINANCES_ENDPOINTS.CREATE_FEE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fees"] }),
  });
};

export const useDeleteFee = createDelete("fees");

// ── Assigned Fees ────────────────────────────────────────────
export const useAssignFee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AssignFeePayload) => {
      return apiRequest<AssignFeeResponse>(FINANCES_ENDPOINTS.ASSIGN_FEE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assigned-fees"] }),
  });
};

export const useDeleteAssignedFee = createDelete("assigned-fees");

// ── Payments ─────────────────────────────────────────────────
export const useCreatePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PaymentPayload) => {
      return apiRequest<PaymentResponse>(FINANCES_ENDPOINTS.CREATE_PAYMENT, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["payments"] }),
  });
};

export const useDeletePayment = createDelete("payments");

// ── Expenses ─────────────────────────────────────────────────
export const useExpenseReport = () => {
  return useQuery({
    queryKey: ["finances", "expense-report"],
    queryFn: async () => apiRequest<ExpenseReportResponse>(FINANCES_ENDPOINTS.EXPENSE_REPORT),
  });
};

export const useCreateExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ExpensePayload) => {
      return apiRequest<ExpenseResponse>(FINANCES_ENDPOINTS.CREATE_EXPENSE, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["finances", "expense-report"] }),
  });
};

export const useDeleteExpense = createDelete("expenses");