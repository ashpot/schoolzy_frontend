import { z } from "zod";

export const refundSchema = z.object({
  reason: z.string().trim().min(5, "Give a short reason (at least 5 characters)").max(300, "Keep it under 300 characters"),
});
export type RefundValues = z.infer<typeof refundSchema>;

export const invoiceSchema = z
  .object({
    school: z.string().min(1, "Select a school"),
    plan: z.string().min(1, "Select a plan"),
    amount: z
      .string()
      .trim()
      .regex(/^\d+$/, "Whole numbers only")
      .refine((v) => Number(v) > 0, "Must be above 0"),
    invoiceDate: z.string().min(1, "Invoice date is required"),
    dueDate: z.string().min(1, "Due date is required"),
  })
  .refine((v) => !v.invoiceDate || !v.dueDate || v.dueDate >= v.invoiceDate, {
    message: "Due date can't be before the invoice date",
    path: ["dueDate"],
  });
export type InvoiceValues = z.infer<typeof invoiceSchema>;