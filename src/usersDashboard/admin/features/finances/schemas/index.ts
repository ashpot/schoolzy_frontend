import { z } from "zod";

export const feeTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required").max(200, "Max 200 characters"),
});
export type FeeTypeValues = z.infer<typeof feeTypeSchema>;

export const feeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  feeTypeId: z.string().min(1, "Fee type is required"),
  term: z.string().min(1, "Term is required"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  dateDue: z.string().min(1, "Due date is required"),
});
export type FeeValues = z.infer<typeof feeSchema>;

export const assignFeeSchema = z.object({
  feeId: z.string().min(1, "Fee is required"),
  sectionId: z.string().min(1, "Section is required"),
});
export type AssignFeeValues = z.infer<typeof assignFeeSchema>;

export const paymentSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  feeId: z.string().min(1, "Fee is required"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
});
export type PaymentValues = z.infer<typeof paymentSchema>;

export const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
});
export type ExpenseValues = z.infer<typeof expenseSchema>;