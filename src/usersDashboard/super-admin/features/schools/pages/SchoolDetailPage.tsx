import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useSchoolDetail } from "../hooks/useSchoolDetail";
import { DETAIL_TABS, LIVE_TABS, parseTab } from "../utils/detailConstants";
import type { DetailDialog, DetailTab } from "../types/detail";
import SchoolDetailHeader from "../components/school-detail/SchoolDetailHeader";
import DetailStatTiles from "../components/school-detail/DetailStatTiles";
import DetailTabs from "../components/school-detail/DetailTabs";
import { DetailError, DetailSkeleton } from "../components/school-detail/DetailStates";
import { TabUnavailable } from "../components/school-detail/TabStates";
import OverviewTab from "../components/school-detail/OverviewTab";
import UsersTab from "../components/school-detail/UsersTab";
import AcademicsTab from "../components/school-detail/AcademicsTab";
import FinanceTab from "../components/school-detail/FinanceTab";
import SubscriptionTab from "../components/school-detail/SubscriptionTab";
import ActivityTab from "../components/school-detail/ActivityTab";
import RenewSubscriptionModal from "../components/school-detail/RenewSubscriptionModal";
import SchoolActionModal from "../components/all-schools/SchoolActionModal";

export default function SchoolDetailPage() {
  const { schoolId = "" } = useParams();
  const [params, setParams] = useSearchParams();
  const { data: school, isLoading, isError, error, refetch } = useSchoolDetail(schoolId);
  const [dialog, setDialog] = useState<DetailDialog | null>(null);
  const tab = parseTab(params.get("tab"));

  const changeTab = (t: DetailTab) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("tab", t);
        return next;
      },
      { replace: true }
    );

  if (isLoading) return <DetailSkeleton />;
  if (isError) return <DetailError message={error?.message} onRetry={() => refetch()} />;
  if (!school) return <DetailError message="School not found." onRetry={() => refetch()} />;

  const tabLabel = DETAIL_TABS.find((t) => t.id === tab)?.label ?? "This section";

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <motion.div variants={fadeUp}>
        <Link
          to={SA_PATHS.schools}
          className="group inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden />
          Back to Schools
        </Link>
      </motion.div>

      <SchoolDetailHeader school={school} onAction={setDialog} />
      <DetailStatTiles school={school} />
      <DetailTabs active={tab} onChange={changeTab} />

      <div role="tabpanel" id="school-tabpanel" aria-labelledby={`tab-${tab}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {!LIVE_TABS.has(tab) && <TabUnavailable label={tabLabel} />}
            {LIVE_TABS.has(tab) && tab === "overview" && <OverviewTab school={school} />}
            {LIVE_TABS.has(tab) && tab === "users" && <UsersTab schoolId={school.id} />}
            {LIVE_TABS.has(tab) && tab === "academics" && <AcademicsTab schoolId={school.id} />}
            {LIVE_TABS.has(tab) && tab === "finance" && <FinanceTab schoolId={school.id} />}
            {LIVE_TABS.has(tab) && tab === "subscription" && (
              <SubscriptionTab schoolId={school.id} onRenew={() => setDialog("renew")} />
            )}
            {LIVE_TABS.has(tab) && tab === "activity" && <ActivityTab schoolId={school.id} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {dialog === "renew" && (
          <RenewSubscriptionModal key="renew" school={school} onClose={() => setDialog(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {dialog && dialog !== "renew" && (
          <SchoolActionModal key={dialog} action={dialog} school={school} onClose={() => setDialog(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}