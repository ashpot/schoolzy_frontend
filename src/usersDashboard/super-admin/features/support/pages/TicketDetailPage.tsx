import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useAssignAgent, useTicketAction, useTickets } from "../hooks/useSupport";
import ActivityTimeline from "../components/ticket-detail/ActivityTimeline";
import Conversation from "../components/ticket-detail/Conversation";
import ReplyBox from "../components/ticket-detail/ReplyBox";
import TicketHeader from "../components/ticket-detail/TicketHeader";
import TicketInfoCard from "../components/ticket-detail/TicketInfoCard";
import TicketDialogs, { type TicketTarget } from "../components/tickets/TicketDialogs";

export default function TicketDetailPage() {
  const { ticketId = "" } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useTickets();
  const resolve = useTicketAction();
  const assign = useAssignAgent();
  const [dialog, setDialog] = useState<TicketTarget | null>(null);
  const ticket = data?.find((t) => t.id === ticketId);

  if (isLoading) {
    return (
      <div className="dashboard-p space-y-6" aria-busy="true">
        <div className="h-24 animate-pulse rounded-3xl bg-sa-gray-soft" />
        <div className="h-96 animate-pulse rounded-3xl bg-sa-gray-soft" />
      </div>
    );
  }
  if (isError) return <div className="dashboard-p"><div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div></div>;
  if (!ticket) {
    return (
      <div className="dashboard-p">
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-border-line02 bg-white px-6 py-16 text-center">
          <p className="text-sm font-medium text-text-primary">Ticket not found</p>
          <p className="text-xs text-text-muted">It may have been deleted or the link is wrong.</p>
          <Link to={SA_PATHS.support} className="rounded-xl border border-border-line03 px-4 py-2 text-sm font-medium text-text-primary hover:border-brand-primary hover:text-brand-primary">Back to Tickets</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <motion.div variants={fadeUp}><TicketHeader ticket={ticket} /></motion.div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <motion.div variants={fadeUp} className="space-y-6">
          <Conversation messages={ticket.messages} />
          <ReplyBox
            ticket={ticket}
            isResolving={resolve.isPending}
            onResolve={() => resolve.mutate({ id: ticket.id, action: "resolve" })}
            onClose={() => setDialog({ key: "close", ticket })}
          />
        </motion.div>
        <motion.div variants={fadeUp} className="space-y-6">
          <TicketInfoCard ticket={ticket} assigning={assign.isPending} onAssign={(agent) => assign.mutate({ id: ticket.id, agent })} />
          <ActivityTimeline ticket={ticket} />
        </motion.div>
      </div>

      <TicketDialogs target={dialog} onClose={() => setDialog(null)} onDeleted={() => navigate(SA_PATHS.support)} />
    </motion.div>
  );
}