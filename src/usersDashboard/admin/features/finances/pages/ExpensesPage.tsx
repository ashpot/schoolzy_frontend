import { motion } from "framer-motion";
import { TrendingDown, Calendar, BarChart2, ShoppingCart } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { formatNaira } from "../utils/feeUtils";
import { useExpenseReport, useUsersLookup } from "../hooks/useFinances";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseTable from "../components/expenses/ExpenseTable";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import type { Expense } from "../types";

export default function ExpensesPage() {
  const { data, isLoading, isError, error } = useExpenseReport();
  const { data: usersLookup } = useUsersLookup();

  const expenses: Expense[] = (data?.expenses ?? []).map((e) => ({
    id: String(e.id),
    description: e.description,
    amount: Number(e.amount),
    date: e.date_created,
    recordedByLabel: usersLookup?.get(e.user) ?? "—",
  }));

  const monthLabel = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Expenses</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Track and manage all school expenditure records
          </p>
        </div>
        <StatPill icon={ShoppingCart} value={`${expenses.length} expenses recorded`} variant="blue" />
      </div>

      {isLoading ? (
        <p className="text-text-muted text-sm py-8 text-center">Loading expense report…</p>
      ) : isError ? (
        <p className="text-danger text-sm py-8 text-center">
          {error instanceof Error ? error.message : "Failed to load expense report."}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <TrendingDown size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Total Expenditure</p>
                <p className="text-2xl font-bold text-text-primary mt-0.5">{formatNaira(data!.total_expenses)}</p>
                <p className="text-xs text-text-muted mt-0.5">across {expenses.length} records</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Calendar size={20} className="text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide font-medium">This Month</p>
                <p className="text-2xl font-bold text-text-primary mt-0.5">{formatNaira(data!.current_month_expenses)}</p>
                <p className="text-xs text-text-muted mt-0.5">{monthLabel}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <BarChart2 size={20} className="text-brand-primary" />
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Avg. Per Record</p>
                <p className="text-2xl font-bold text-text-primary mt-0.5">{formatNaira(data!.average_expense)}</p>
                <p className="text-xs text-text-muted mt-0.5">per expense entry</p>
              </div>
            </div>
          </div>

          <SplitLayout
            left={<ExpenseForm onSuccess={() => {}} />}
            right={<ExpenseTable items={expenses} onDelete={() => {}} />}
          />
        </>
      )}
    </motion.div>
  );
}