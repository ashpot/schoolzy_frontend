import { useMutation } from "@tanstack/react-query";
import type { LoadHistoryValues, PayFeeValues } from "../schemas";
import { mockPaymentHistory } from "../data/mockData";

export const useLoadPaymentHistory = () => {
  return useMutation({
    mutationFn: async (values: LoadHistoryValues) => {
      // TODO: Replace with actual API call
      // return api.get(`/fees/history?childId=${values.childId}`);
      await new Promise((r) => setTimeout(r, 800));
      return mockPaymentHistory;
    },
  });
};

export const usePayFee = () => {
  return useMutation({
    mutationFn: async (values: PayFeeValues) => {
      // TODO: Replace with actual API call
      // return api.post("/fees/pay", values);
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, paymentUrl: "https://paystack.com/mock-checkout" };
    },
  });
};