import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { staggerContainer } from "../../animations/variants";
import { useUserFilters } from "../../hooks/useUserFilters";
import { useUsers } from "../../hooks/useUsers";
import { exportUsersCsv } from "../../utils/exportUsers";
import type { ConfirmUserAction, PlatformUser, UserAction, UsersPageConfig } from "../../types";
import InviteAdminModal from "../school-admins/InviteAdminModal";
import SendEmailModal from "./SendEmailModal";
import UserActionModal from "./UserActionModal";
import UserProfileModal from "./UserProfileModal";
import UserStatCard from "./UserStatCard";
import UsersTable from "./UsersTable";
import UsersToolbar from "./UsersToolbar";

const NONE: PlatformUser[] = [];

export default function UsersListPage({ config }: { config: UsersPageConfig }) {
  const { data, isLoading, isError, refetch } = useUsers(config.kind);
  const users = data ?? NONE;
  const f = useUserFilters(users, config.filters, config.pageSize);
  const stats = useMemo(() => config.stats(users), [config, users]);

  const [target, setTarget] = useState<{ action: UserAction; user: PlatformUser } | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const close = () => setTarget(null);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[130px] animate-pulse rounded-3xl bg-sa-gray-soft" />
          ))}
        </div>
      ) : (
        <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <UserStatCard key={s.key} stat={s} />
          ))}
        </motion.div>
      )}

      <UsersToolbar
        searchPlaceholder={config.searchPlaceholder}
        search={f.search}
        onSearch={f.setSearch}
        filters={config.filters}
        values={f.values}
        options={f.options}
        onFilter={f.setFilter}
        onExport={() => exportUsersCsv(config.kind, f.filtered)}
        exportDisabled={f.filtered.length === 0}
        onInvite={config.canInvite ? () => setInviteOpen(true) : undefined}
      />

      <UsersTable
        columns={config.columns}
        rows={f.pageItems}
        minWidth={config.minTableWidth}
        noun={config.noun}
        canEmail={config.canEmail}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        onAction={(action, user) => setTarget({ action, user })}
        hasFilters={f.hasFilters}
        pageKey={f.pageKey}
        page={f.page}
        totalPages={f.totalPages}
        total={f.filtered.length}
        from={f.from}
        to={f.to}
        onPage={f.setPage}
      />

      <AnimatePresence>
        {target?.action === "view" && <UserProfileModal key={`v-${target.user.id}`} user={target.user} onClose={close} />}
      </AnimatePresence>
      <AnimatePresence>
        {target?.action === "email" && <SendEmailModal key={`e-${target.user.id}`} user={target.user} onClose={close} />}
      </AnimatePresence>
      <AnimatePresence>
        {target && target.action !== "view" && target.action !== "email" && (
          <UserActionModal
            key={`${target.action}-${target.user.id}`}
            action={target.action as ConfirmUserAction}
            user={target.user}
            onClose={close}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {inviteOpen && <InviteAdminModal key="invite" onClose={() => setInviteOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}