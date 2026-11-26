import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { fadeUp, staggerContainer } from "../animations/variants";
import { usePlatformSettings } from "../hooks/usePlatformSettings";
import type { SettingsTab } from "../types";
import TabBar from "../components/shared/TabBar";
import BrandingTab from "../components/platform/BrandingTab";
import GeneralTab from "../components/platform/GeneralTab";
import LocalizationTab from "../components/platform/LocalizationTab";
import SecurityTab from "../components/platform/SecurityTab";
import SystemTab from "../components/platform/SystemTab";

const TABS: { id: SettingsTab; label: string }[] = [
  { id: "general", label: "General" },
  { id: "branding", label: "Branding" },
  { id: "security", label: "Security" },
  { id: "localization", label: "Localization" },
  { id: "system", label: "System" },
];

const parse = (v: string | null): SettingsTab => (TABS.some((t) => t.id === v) ? (v as SettingsTab) : "general");

export default function PlatformSettingsPage() {
  const [params, setParams] = useSearchParams();
  const tab = parse(params.get("tab"));
  const { data, isLoading, isError, refetch } = usePlatformSettings();

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <TabBar tabs={TABS} active={tab} onChange={(t) => setParams({ tab: t }, { replace: true })} layoutId="sa-platform-tab" label="Platform settings sections" />

      <div role="tabpanel" id="sa-settings-panel" aria-labelledby={`sa-platform-tab-${tab}`}>
        {isError ? (
          <div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div>
        ) : isLoading || !data ? (
          <div className="space-y-6" aria-busy="true">
            <div className="h-72 animate-pulse rounded-3xl bg-sa-gray-soft" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={tab} variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}>
              {tab === "general" && <GeneralTab data={data.general} />}
              {tab === "branding" && <BrandingTab data={data.branding} />}
              {tab === "security" && <SecurityTab data={data.security} />}
              {tab === "localization" && <LocalizationTab data={data.localization} />}
              {tab === "system" && <SystemTab data={data.system} />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}