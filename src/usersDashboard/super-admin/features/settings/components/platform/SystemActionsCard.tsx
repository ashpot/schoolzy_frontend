import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Activity, Database, RefreshCw, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import ConfirmModal from "@/usersDashboard/super-admin/features/payments/components/shared/ConfirmModal";
import { useSystemAction } from "../../hooks/usePlatformSettings";
import type { Notice, SystemAction } from "../../types";
import NoticeBanner from "../shared/NoticeBanner";

const ACTIONS: { id: SystemAction; label: string; icon: LucideIcon; color: string }[] = [
  { id: "cache", label: "Clear Cache", icon: RefreshCw, color: "text-sa-blue-text" },
  { id: "optimize", label: "Optimize Database", icon: Database, color: "text-sa-purple-text" },
  { id: "diagnostics", label: "Run Diagnostics", icon: Activity, color: "text-sa-green-text" },
];

export default function SystemActionsCard() {
  const mutation = useSystemAction();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [confirmOptimize, setConfirmOptimize] = useState(false);

  const run = (action: SystemAction, after?: () => void) => {
    setNotice(null);
    mutation.mutate(action, {
      onSuccess: (text) => { setNotice({ tone: "green", text }); after?.(); },
      onError: (e) => { setNotice({ tone: "red", text: e.message }); after?.(); },
    });
  };

  return (
    <SectionCard title="System Actions">
      <div className="space-y-4">
        <NoticeBanner notice={notice} onDismiss={() => setNotice(null)} />
        <div className="flex flex-wrap gap-3">
          {ACTIONS.map(({ id, label, icon: Icon, color }) => {
            const loading = mutation.isPending && mutation.variables === id;
            return (
              <button
                key={id}
                type="button"
                disabled={mutation.isPending}
                onClick={() => (id === "optimize" ? setConfirmOptimize(true) : run(id))}
                className={cn("inline-flex items-center gap-2 rounded-xl border border-border-line02 px-5 py-3 text-sm font-medium transition-colors hover:bg-sa-row-hover disabled:opacity-50", color)}
              >
                <Icon size={16} className={loading ? "animate-spin" : undefined} aria-hidden /> {loading ? "Working..." : label}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {confirmOptimize && (
          <ConfirmModal
            key="optimize"
            title="Optimize database?"
            body={<>This can briefly slow the platform while it runs. Best done outside school hours.</>}
            icon={Database}
            tone="amber"
            confirmLabel="Optimize"
            isPending={mutation.isPending}
            error={null}
            onConfirm={() => run("optimize", () => setConfirmOptimize(false))}
            onClose={() => setConfirmOptimize(false)}
          />
        )}
      </AnimatePresence>
    </SectionCard>
  );
}