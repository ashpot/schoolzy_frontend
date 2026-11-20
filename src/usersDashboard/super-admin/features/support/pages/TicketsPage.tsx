import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import ActionMenu from "@/usersDashboard/super-admin/features/subscriptions/components/shared/ActionMenu";
import SubTable from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubTable";
import SubToolbar from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubToolbar";
import { useListFilters } from "@/usersDashboard/super-admin/features/subscriptions/hooks/useListFilters";
import { exportCsv } from "@/usersDashboard/super-admin/features/subscriptions/utils/exportCsv";
import { formatDate } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { FilterOption } from "@/usersDashboard/super-admin/features/subscriptions/types";
import { staggerContainer } from "../animations/variants";
import { useTickets } from "../hooks/useSupport";
import type { Ticket, TicketMenuKey } from "../types";
import { CATEGORIES, PAGE_SIZE, PRIORITIES, STATUSES } from "../utils/constants";
import { ticketStats } from "../utils/derive";
import { ticketMenu } from "../utils/menus";
import TicketDialogs, { type TicketTarget } from "../components/tickets/TicketDialogs";
import { ticketColumns } from "../components/tickets/ticketColumns";

const NONE: Ticket[] = [];

const FILTER_CONFIG = {
  pageSize: PAGE_SIZE,
  text: (t: Ticket) => [t.code, t.subject, t.school, t.submittedBy],
  predicates: {
    priority: (t: Ticket, v: string) => t.priority === v,
    status: (t: Ticket, v: string) => t.status === v,
    category: (t: Ticket, v: string) => t.category === v,
    agent: (t: Ticket, v: string) => (v === "Unassigned" ? t.agent === null : t.agent === v),
  },
};

export default function TicketsPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useTickets();
  const tickets = data ?? NONE;
  const f = useListFilters(tickets, FILTER_CONFIG);
  const [dialog, setDialog] = useState<TicketTarget | null>(null);

  const filters = useMemo<FilterOption[]>(
    () => [
      { key: "priority", label: "Priority", options: PRIORITIES },
      { key: "status", label: "Status", options: STATUSES },
      { key: "category", label: "Category", options: CATEGORIES },
      { key: "agent", label: "Agent", options: [...Array.from(new Set(tickets.map((t) => t.agent).filter((a): a is string => Boolean(a)))).sort(), "Unassigned"] },
    ],
    [tickets]
  );
  const stats = useMemo(() => ticketStats(tickets), [tickets]);

  const run = (key: TicketMenuKey, ticket: Ticket) => {
    if (key === "view" || key === "reply") return navigate(SA_PATHS.ticketDetail(ticket.id));
    setDialog({ key, ticket });
  };

  const handleExport = () =>
    exportCsv(
      "tickets",
      ["Ticket ID", "Subject", "School", "Submitted By", "Category", "Priority", "Assigned To", "Created", "Status"],
      f.filtered.map((t) => [t.code, t.subject, t.school, t.submittedBy, t.category, t.priority, t.agent ?? "Unassigned", formatDate(t.createdAt), t.status])
    );

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <MetricGrid items={stats} isLoading={isLoading} />

      <SubToolbar
        searchPlaceholder="Search tickets..."
        search={f.search}
        onSearch={f.setSearch}
        filters={filters}
        values={f.values}
        onFilter={f.setFilter}
        onExport={handleExport}
        exportDisabled={f.filtered.length === 0}
      />

      <SubTable
        columns={ticketColumns}
        rows={f.pageItems}
        minWidth="min-w-[1200px]"
        noun="tickets"
        onRowClick={(t) => navigate(SA_PATHS.ticketDetail(t.id))}
        renderActions={(t) => <ActionMenu variant="bordered" label={`Actions for ${t.code}`} items={ticketMenu(t)} onSelect={(k) => run(k, t)} />}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        hasFilters={f.hasFilters}
        pageKey={f.pageKey}
        page={f.page}
        totalPages={f.totalPages}
        total={f.filtered.length}
        from={f.from}
        to={f.to}
        onPage={f.setPage}
      />

      <TicketDialogs target={dialog} onClose={() => setDialog(null)} />
    </motion.div>
  );
}