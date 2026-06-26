import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FeeTypeValues, FeeValues, AssignFeeValues, PaymentValues, ExpenseValues } from "../schemas";

function createDelete(queryKey: string) {
  return function () {
    const qc = useQueryClient();
    return useMutation({
      // @ts-ignore
      mutationFn: async (id: string) => {
        // TODO: Replace with actual API call e.g. api.delete(`/${queryKey}/${id}`)
        await new Promise((r) => setTimeout(r, 500));
        return { success: true };
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
    });
  };
}

export const useCreateFeeType = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FeeTypeValues) => {
      // TODO: Replace with actual API call e.g. api.post("/fee-types", payload)
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fee-types"] }),
  });
};

export const useDeleteFeeType = createDelete("fee-types");

export const useCreateFee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FeeValues) => {
      // TODO: Replace with actual API call e.g. api.post("/fees", payload)
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fees"] }),
  });
};

export const useDeleteFee = createDelete("fees");

export const useAssignFee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AssignFeeValues) => {
      // TODO: Replace with actual API call e.g. api.post("/assigned-fees", payload)
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assigned-fees"] }),
  });
};

export const useDeleteAssignedFee = createDelete("assigned-fees");

export const useCreatePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PaymentValues) => {
      // TODO: Replace with actual API call e.g. api.post("/payments", payload)
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["payments"] }),
  });
};

export const useDeletePayment = createDelete("payments");

export const useCreateExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ExpenseValues) => {
      // TODO: Replace with actual API call e.g. api.post("/expenses", payload)
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, data: payload };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["expenses"] }),
  });
};

export const useDeleteExpense = createDelete("expenses");