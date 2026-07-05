import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Calendar, BarChart2, ShoppingCart } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { mockExpenses } from "../data/mockData";
import { formatNaira } from "../utils/feeUtils";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseTable from "../components/expenses/ExpenseTable";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import type { Expense } from "../types";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  const totalExpenditure = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const avgPerRecord     = useMemo(() => expenses.length > 0 ? Math.round(totalExpenditure / expenses.length) : 0, [expenses, totalExpenditure]);

  // This month's total
  const thisMonthTotal = useMemo(() => {
    const now = new Date();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((s, e) => s + e.amount, 0);
  }, [expenses]);

  const monthLabel = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Expenses</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Track and manage all school expenditure records
          </p>
        </div>
        <StatPill icon={ShoppingCart} value={`${expenses.length} expenses recorded`} variant="blue" />
      </div>

      {/* 3 stat cards — full width above split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <TrendingDown size={20} className="text-red-500" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Total Expenditure</p>
            <p className="text-2xl font-bold text-text-primary mt-0.5">{formatNaira(totalExpenditure)}</p>
            <p className="text-xs text-text-muted mt-0.5">across {expenses.length} records</p>
          </div>
          <div className="ml-auto">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <TrendingDown size={13} className="text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Calendar size={20} className="text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wide font-medium">This Month</p>
            <p className="text-2xl font-bold text-text-primary mt-0.5">{formatNaira(thisMonthTotal)}</p>
            <p className="text-xs text-text-muted mt-0.5">{monthLabel}</p>
          </div>
          <div className="ml-auto">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <Calendar size={13} className="text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl card-shadow p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <BarChart2 size={20} className="text-brand-primary" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Avg. Per Record</p>
            <p className="text-2xl font-bold text-text-primary mt-0.5">{formatNaira(avgPerRecord)}</p>
            <p className="text-xs text-text-muted mt-0.5">per expense entry</p>
          </div>
          <div className="ml-auto">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <BarChart2 size={13} className="text-brand-primary" />
            </div>
          </div>
        </div>
      </div>

      <SplitLayout
        left={
          <ExpenseForm
            onSuccess={(expense) => setExpenses((prev) => [expense, ...prev])}
          />
        }
        right={
          <ExpenseTable
            items={expenses}
            onDelete={(id) => setExpenses((prev) => prev.filter((e) => e.id !== id))}
          />
        }
      />
    </motion.div>
  );
}