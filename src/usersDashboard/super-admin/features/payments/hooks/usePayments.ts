import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { mockDelay, mockFetchInvoices, mockFetchTransactions } from "../data/mockPayments";
import type { InvoiceValues } from "../schemas";
import type { Invoice, InvoicesData, TransactionsData, Transaction } from "../types";

// Real calls (commented below) use: apiFetch from "@/super-admin-auth/apiClient"
// and PAYMENTS_ENDPOINTS from "../api".

export const TXN_KEY = ["sa-transactions"] as const;
export const INV_KEY = ["sa-invoices"] as const;

export const useTransactions = () =>
  useQuery({
    queryKey: TXN_KEY,
    queryFn: (): Promise<TransactionsData> => {
      // TODO: Replace with actual API call, then map the response to TransactionsData
      // return mapTransactions(await apiFetch(PAYMENTS_ENDPOINTS.TRANSACTIONS));
      return mockFetchTransactions();
    },
    staleTime: 30_000,
  });

export const useInvoices = () =>
  useQuery({
    queryKey: INV_KEY,
    queryFn: (): Promise<InvoicesData> => {
      // TODO: Replace with actual API call, then map the response to InvoicesData
      // return mapInvoices(await apiFetch(PAYMENTS_ENDPOINTS.INVOICES));
      return mockFetchInvoices();
    },
    staleTime: 30_000,
  });

// Mock mutations edit the cached data only (reset on the next refetch).
// When a real endpoint ships, replace the patch with invalidateQueries.
const patchTxns = (qc: QueryClient, fn: (t: Transaction[]) => Transaction[]) =>
  qc.setQueryData<TransactionsData>(TXN_KEY, (old) => (old ? { ...old, transactions: fn(old.transactions) } : old));

const patchInvoices = (qc: QueryClient, fn: (i: Invoice[]) => Invoice[]) =>
  qc.setQueryData<InvoicesData>(INV_KEY, (old) => (old ? { ...old, invoices: fn(old.invoices) } : old));

interface TxnVars {
  id: string;
  action: "paid" | "invoice" | "refund";
  reason?: string;
}

export const useTransactionAction = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, TxnVars>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(PAYMENTS_ENDPOINTS.TRANSACTION_ACTION(id, { paid: "mark-paid", refund: "refund", invoice: "invoice" }[action]), { method: "POST", body: { reason } });
      await mockDelay(800);
    },
    onSuccess: (_d, { id, action, reason }) => {
      if (action === "invoice") return;
      patchTxns(qc, (ts) =>
        ts.map((t): Transaction =>
          t.id !== id
            ? t
            : action === "paid"
              ? { ...t, status: "Successful" }
              : { ...t, status: "Refunded", refundReason: reason }
        )
      );
    },
  });
};

interface InvoiceVars {
  id: string;
  action: "paid" | "cancel" | "email";
}

export const useInvoiceAction = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, InvoiceVars>({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // await apiFetch(PAYMENTS_ENDPOINTS.INVOICE_ACTION(id, { paid: "mark-paid", cancel: "cancel", email: "email" }[action]), { method: "POST" });
      await mockDelay(800);
    },
    onSuccess: (_d, { id, action }) => {
      if (action === "email") return;
      patchInvoices(qc, (list) =>
        list.map((i): Invoice => (i.id === id ? { ...i, status: action === "paid" ? "Paid" : "Cancelled" } : i))
      );
    },
  });
};

export const useCreateInvoice = () => {
  const qc = useQueryClient();
  return useMutation<Invoice, Error, InvoiceValues>({
    mutationFn: async (v) => {
      // TODO: Replace with actual API call
      // return mapInvoice(await apiFetch(PAYMENTS_ENDPOINTS.INVOICES, { method: "POST", body: { school: v.school, plan: v.plan, amount: Number(v.amount), invoice_date: v.invoiceDate, due_date: v.dueDate } }));
      await mockDelay(900);
      const count = qc.getQueryData<InvoicesData>(INV_KEY)?.invoices.length ?? 0;
      return {
        id: `inv-${Date.now()}`,
        invoiceNo: `INV-26-${String(892 + count).padStart(4, "0")}`,
        school: v.school,
        location: "",
        plan: v.plan,
        invoiceDate: v.invoiceDate,
        dueDate: v.dueDate,
        amount: Number(v.amount),
        status: "Pending",
      };
    },
    onSuccess: (invoice) => patchInvoices(qc, (list) => [invoice, ...list]),
  });
};