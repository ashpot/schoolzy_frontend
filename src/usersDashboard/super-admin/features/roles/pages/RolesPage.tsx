import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Lock, Shield, User, Users } from "lucide-react";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import ConfirmModal from "@/usersDashboard/super-admin/features/payments/components/shared/ConfirmModal";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { staggerContainer } from "../animations/variants";
import { useRoles } from "../hooks/useRoles";
import type { Role } from "../types";
import RoleFormModal from "../components/RoleFormModal";
import RolePanel from "../components/RolePanel";
import RolesList from "../components/RolesList";

const NONE: Role[] = [];

export default function RolesPage() {
  const { data, isLoading, isError, refetch } = useRoles();
  const roles = data ?? NONE;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [pending, setPending] = useState<(() => void) | null>(null); // action waiting on "discard changes?"
  const [form, setForm] = useState<{ role: Role | null } | null>(null);

  const current = roles.find((r) => r.id === activeId) ?? roles[0] ?? null;

  const guard = (action: () => void) => (dirty ? setPending(() => action) : action());

  const stats = useMemo<MetricItem[]>(
    () => [
      { key: "total", icon: Shield, tone: "blue", value: roles.length, label: "Total Roles", delta: { text: "defined", good: true } },
      { key: "system", icon: Lock, tone: "red", value: roles.filter((r) => r.system).length, label: "Platform Administrators", delta: { text: "system roles", good: true } },
      { key: "custom", icon: User, tone: "green", value: roles.filter((r) => !r.system).length, label: "Custom Roles", delta: { text: "team-created", good: true } },
      { key: "users", icon: Users, tone: "purple", value: roles.filter((r) => r.active).reduce((sum, r) => sum + r.users, 0), label: "Active Users", delta: { text: "staff members", good: true } },
    ],
    [roles]
  );

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <MetricGrid items={stats} isLoading={isLoading} />

      {isError ? (
        <div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div>
      ) : isLoading || !current ? (
        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]" aria-busy="true">
          <div className="h-96 animate-pulse rounded-3xl bg-sa-gray-soft" />
          <div className="h-96 animate-pulse rounded-3xl bg-sa-gray-soft" />
        </div>
      ) : (
        <div className="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <RolesList roles={roles} activeId={current.id} onSelect={(id) => id !== current.id && guard(() => setActiveId(id))} onCreate={() => guard(() => setForm({ role: null }))} />
          <RolePanel key={current.id} role={current} onDirty={setDirty} onEdit={() => setForm({ role: current })} />
        </div>
      )}

      <AnimatePresence>
        {form && (
          <RoleFormModal
            key={form.role?.id ?? "new"}
            role={form.role}
            onClose={() => setForm(null)}
            onSaved={(saved) => { setForm(null); setActiveId(saved.id); }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {pending && (
          <ConfirmModal
            key="discard"
            title="Discard changes?"
            body={<>You have unsaved permission changes. They will be lost.</>}
            icon={AlertTriangle}
            tone="amber"
            confirmLabel="Discard"
            isPending={false}
            error={null}
            onConfirm={() => { pending(); setPending(null); }}
            onClose={() => setPending(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}