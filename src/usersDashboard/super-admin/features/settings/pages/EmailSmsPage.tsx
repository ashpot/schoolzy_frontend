import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useComms } from "../hooks/useComms";
import type { CommsTab } from "../types";
import EmailTab from "../components/email-sms/EmailTab";
import SmsTab from "../components/email-sms/SmsTab";
import TemplatesTab from "../components/email-sms/TemplatesTab";
import TabBar from "../components/shared/TabBar";

const TABS: { id: CommsTab; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
  { id: "templates", label: "Templates" },
];

const parse = (v: string | null): CommsTab => (TABS.some((t) => t.id === v) ? (v as CommsTab) : "email");

export default function EmailSmsPage() {
  const [params, setParams] = useSearchParams();
  const tab = parse(params.get("tab"));
  const { data, isLoading, isError, refetch } = useComms();

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <TabBar tabs={TABS} active={tab} onChange={(t) => setParams({ tab: t }, { replace: true })} layoutId="sa-comms-tab" label="Email and SMS sections" />

      <div role="tabpanel" id="sa-settings-panel" aria-labelledby={`sa-comms-tab-${tab}`}>
        {isError ? (
          <div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div>
        ) : isLoading || !data ? (
          <div className="h-80 animate-pulse rounded-3xl bg-sa-gray-soft" aria-busy="true" />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={tab} variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}>
              {tab === "email" && <EmailTab data={data.email} />}
              {tab === "sms" && <SmsTab data={data.sms} />}
              {tab === "templates" && <TemplatesTab templates={data.templates} />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}