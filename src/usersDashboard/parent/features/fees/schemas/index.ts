import { z } from "zod";

export const loadHistorySchema = z.object({
  childId: z.string().min(1, "Select a child"),
});
export type LoadHistoryValues = z.infer<typeof loadHistorySchema>;

export const payFeeSchema = z.object({
  childId: z.string().min(1, "Select a child"),
  feeId: z.string().min(1, "Select a fee"),
  amount: z.coerce.number().min(1, "Amount is required"),
});
export type PayFeeValues = z.infer<typeof payFeeSchema>;