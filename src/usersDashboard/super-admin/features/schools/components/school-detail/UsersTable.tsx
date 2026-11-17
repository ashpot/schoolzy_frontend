import { motion } from "framer-motion";
import { Ban, Eye, RefreshCw, Search, Users } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { ROLE_FILTERS, USER_STATUS_FILTERS } from "../../utils/detailConstants";
import { roleTone, userStatusTone } from "../../utils/detailTones";
import { avatarClass, getInitial } from "../../utils/schoolTones";
import type { SchoolUser, UserRole, UserStatus } from "../../types/detail";
import FilterSelect from "./FilterSelect";

const th = "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted first:px-6";
const ROW_ACTIONS = [
  { icon: Eye, label: "View" },
  { icon: Ban, label: "Deactivate" },
  { icon: RefreshCw, label: "Reset password for" },
];

interface UsersTableProps {
  users: SchoolUser[];
  role: "All" | UserRole;
  onRole: (v: "All" | UserRole) => void;
  status: "All" | UserStatus;
  onStatus: (v: "All" | UserStatus) => void;
  search: string;
  onSearch: (v: string) => void;
}

export default function UsersTable({ users, role, onRole, status, onStatus, search, onSearch }: UsersTableProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border-line02 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="section-title">All Users</h2>
          <p className="mt-1 text-sm text-text-secondary">Platform users registered under this school</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <FilterSelect label="Role" value={role} options={ROLE_FILTERS} onChange={onRole} />
          <FilterSelect label="Status" value={status} options={USER_STATUS_FILTERS} onChange={onStatus} />
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search users..."
              aria-label="Search users"
              autoComplete="off"
              className="w-52 rounded-xl border border-border-line02 bg-bg-input py-2.5 pl-10 pr-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
          <span className="flex-center h-12 w-12 rounded-full bg-sa-blue-soft text-sa-blue-icon"><Users size={22} aria-hidden /></span>
          <p className="text-sm font-medium text-text-primary">No users match your filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-y border-border-line02">
                <th className={th}>User</th><th className={th}>Role</th><th className={th}>Email</th>
                <th className={th}>Phone</th><th className={th}>Status</th><th className={th}>Last Login</th>
                <th className={th}><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <motion.tbody key={`${role}|${status}|${search}`} variants={staggerContainer} initial="hidden" animate="show">
              {users.map((u) => (
                <motion.tr key={u.id} variants={rowVariant} className="border-t border-border-line02 transition-colors hover:bg-sa-row-hover">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className={cn("flex-center h-9 w-9 shrink-0 rounded-full text-sm font-semibold text-white", avatarClass(u.name))}>
                        {getInitial(u.name)}
                      </span>
                      <span className="text-sm font-medium text-text-primary">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge label={u.role} tone={roleTone[u.role]} /></td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{u.email}</td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{u.phone}</td>
                  <td className="px-4 py-3.5"><StatusBadge label={u.status} tone={userStatusTone[u.status]} /></td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{u.lastLogin}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      {ROW_ACTIONS.map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          type="button"
                          aria-label={`${label} ${u.name}`}
                          onClick={() => {
                            // TODO: wire to the user-management endpoints
                          }}
                          className="rounded-lg p-2 text-text-muted transition-colors hover:bg-sa-gray-soft hover:text-text-primary"
                        >
                          <Icon size={15} />
                        </button>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </section>
  );
}