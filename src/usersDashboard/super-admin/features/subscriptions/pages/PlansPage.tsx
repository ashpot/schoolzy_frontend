import { useDeferredValue, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, CreditCard, Plus, TrendingUp } from "lucide-react";
import Button from "@/shared/ui/Button";
import { fadeUp, staggerContainer } from "../animations/variants";
import { usePlanAction, usePlans, useSubscriptions } from "../hooks/useSubscriptions";
import type { Plan, PlanMenuKey, SubStat } from "../types";
import { periodMonths } from "../utils/derive";
import { exportCsv } from "../utils/exportCsv";
import { formatCompactNaira } from "../utils/format";
import PlanCard from "../components/plans/PlanCard";
import PlanConfirmModal from "../components/plans/PlanConfirmModal";
import PlanFormModal from "../components/plans/PlanFormModal";
import StatGrid from "../components/shared/StatGrid";
import SubToolbar from "../components/shared/SubToolbar";
import { UsersEmpty, UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";

const NONE: Plan[] = [];

export default function PlansPage() {
  const plansQuery = usePlans();
  const subsQuery = useSubscriptions();
  const planAction = usePlanAction();
  const [params, setParams] = useSearchParams();

  const plans = plansQuery.data ?? NONE;
  const [search, setSearch] = useState("");
  const deferred = useDeferredValue(search);
  // The dashboard's "Create Subscription Plan" shortcut opens the modal via ?create=1
  const [editor, setEditor] = useState<{ plan: Plan | null } | null>(params.get("create") === "1" ? { plan: null } : null);
  const [confirm, setConfirm] = useState<{ action: "deactivate" | "delete"; plan: Plan } | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const closeEditor = () => {
    setEditor(null);
    if (params.has("create")) {
      const next = new URLSearchParams(params);
      next.delete("create");
      setParams(next, { replace: true });
    }
  };

  const visible = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return plans.filter((p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }, [plans, deferred]);

  const stats = useMemo<SubStat[]>(() => {
    const subs = subsQuery.data ?? [];
    const mrr = subs
      .filter((s) => s.status === "Active" || s.status === "Trial")
      .reduce((sum, s) => sum + s.amount / periodMonths(s.billing), 0);
    return [
      { key: "total", icon: CreditCard, tone: "blue", label: "Total Plans", value: plans.length },
      { key: "active", icon: Check, tone: "green", label: "Active Plans", value: plans.filter((p) => p.active).length, hint: "Currently available" },
      { key: "trial", icon: Clock, tone: "amber", label: "Schools on Trial", value: subs.filter((s) => s.status === "Trial").length, hint: "Trial period" },
      { key: "mrr", icon: TrendingUp, tone: "purple", label: "Monthly Recurring Revenue", value: formatCompactNaira(Math.round(mrr)), hint: "From active subscriptions" },
    ];
  }, [plans, subsQuery.data]);

  const handleMenu = (plan: Plan, key: PlanMenuKey) => {
    if (key === "edit") return setEditor({ plan });
    if (key === "deactivate" || key === "delete") return setConfirm({ action: key, plan });
    setActionError(null);
    planAction.mutate({ id: plan.id, action: key }, { onError: (e) => setActionError(e.message) });
  };

  const handleExport = () =>
    exportCsv(
      "plans",
      ["Plan", "Monthly (NGN)", "Yearly (NGN)", "Students", "Teachers", "Storage (GB)", "Support", "Schools", "Status"],
      visible.map((p) => [p.name, p.monthlyPrice, p.yearlyPrice, p.maxStudents, p.maxTeachers, p.storageGb, p.support, p.schools, p.active ? "Active" : "Inactive"])
    );

  const isLoading = plansQuery.isLoading;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <StatGrid stats={stats} isLoading={isLoading} />

      <SubToolbar
        searchPlaceholder="Search plans..."
        search={search}
        onSearch={setSearch}
        onExport={handleExport}
        exportDisabled={visible.length === 0}
        action={
          <Button type="button" variant="primary" leftIcon={<Plus size={16} />} onClick={() => setEditor({ plan: null })}>
            Create Plan
          </Button>
        }
      />

      {actionError && (
        <p role="alert" className="rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{actionError}</p>
      )}

      {plansQuery.isError ? (
        <div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => plansQuery.refetch()} /></div>
      ) : isLoading ? (
        <div className="grid gap-6 lg:grid-cols-3" aria-busy="true">
          {[0, 1, 2].map((i) => <div key={i} className="h-[560px] animate-pulse rounded-3xl bg-sa-gray-soft" />)}
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-3xl border border-border-line02 bg-white"><UsersEmpty noun="plans" filtered={Boolean(deferred.trim())} /></div>
      ) : (
        <motion.div variants={fadeUp} className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {visible.map((p) => (
              <PlanCard key={p.id} plan={p} onMenu={(k) => handleMenu(p, k)} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {editor && <PlanFormModal key={editor.plan?.id ?? "new"} plan={editor.plan} onClose={closeEditor} />}
      </AnimatePresence>
      <AnimatePresence>
        {confirm && (
          <PlanConfirmModal key={`${confirm.action}-${confirm.plan.id}`} action={confirm.action} plan={confirm.plan} onClose={() => setConfirm(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}