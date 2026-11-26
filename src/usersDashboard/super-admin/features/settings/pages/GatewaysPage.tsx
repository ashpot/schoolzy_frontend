import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, CreditCard, Wifi, Zap } from "lucide-react";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { staggerContainer } from "../animations/variants";
import { useGateways, useTestGateway, useToggleGateway } from "../hooks/useGateways";
import type { Gateway, Notice } from "../types";
import GatewayCard from "../components/gateways/GatewayCard";
import GatewayConfigModal from "../components/gateways/GatewayConfigModal";
import NoticeBanner from "../components/shared/NoticeBanner";

export default function GatewaysPage() {
  const { data, isLoading, isError, refetch } = useGateways();
  const toggle = useToggleGateway();
  const test = useTestGateway();
  const [editing, setEditing] = useState<Gateway | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const gateways = data?.gateways;

  const stats = useMemo<MetricItem[]>(() => {
    if (!data) return [];
    const list = data.gateways;
    // TODO: the delta pills need backend history
    return [
      { key: "connected", icon: Wifi, tone: "green", value: list.filter((g) => g.status === "Connected").length, label: "Connected Gateways", delta: { text: "active", good: true } },
      { key: "enabled", icon: Zap, tone: "blue", value: list.filter((g) => g.enabled).length, label: "Active Gateways", delta: { text: "enabled", good: true } },
      { key: "tx", icon: CreditCard, tone: "purple", value: list.reduce((sum, g) => sum + (g.txToday ?? 0), 0), label: "Transactions Today", delta: { text: data.txDelta, good: true } },
      { key: "health", icon: Activity, tone: "amber", value: data.health.value, label: "Gateway Health", delta: { text: data.health.text, good: true } },
    ];
  }, [data]);

  const onToggle = (g: Gateway, enabled: boolean) => {
    setNotice(null);
    toggle.mutate({ id: g.id, enabled }, { onError: (e) => setNotice({ tone: "red", text: e.message }) });
  };

  const onTest = (g: Gateway) => {
    setNotice(null);
    test.mutate(g.id, {
      onSuccess: () => setNotice({ tone: "green", text: `${g.name} responded successfully.` }),
      onError: (e) => setNotice({ tone: "red", text: e.message }),
    });
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <MetricGrid items={stats} isLoading={isLoading} />
      <NoticeBanner notice={notice} onDismiss={() => setNotice(null)} />

      {isError ? (
        <div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div>
      ) : isLoading || !gateways ? (
        <div className="grid gap-6 lg:grid-cols-2" aria-busy="true">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-[300px] animate-pulse rounded-3xl bg-sa-gray-soft" />)}
        </div>
      ) : (
        <motion.div variants={staggerContainer} className="grid gap-6 lg:grid-cols-2">
          {gateways.map((g) => (
            <GatewayCard
              key={g.id}
              gateway={g}
              busy={toggle.isPending && toggle.variables?.id === g.id}
              testing={test.isPending && test.variables === g.id}
              onToggle={(on) => onToggle(g, on)}
              onConfigure={() => setEditing(g)}
              onTest={() => onTest(g)}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {editing && <GatewayConfigModal key={editing.id} gateway={editing} onClose={() => setEditing(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}