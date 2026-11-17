import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import { staggerContainer } from "../animations/variants";
import { useSchools } from "../hooks/useSchools";
import { useSchoolFilters } from "../hooks/useSchoolFilters";
import { exportSchoolsCsv } from "../utils/exportCsv";
import type { ConfirmAction, School, SchoolAction } from "../types";
import SchoolStatCards from "../components/all-schools/SchoolStatCards";
import SchoolsToolbar from "../components/all-schools/SchoolsToolbar";
import SchoolsTable from "../components/all-schools/SchoolsTable";
import AddSchoolModal from "../components/all-schools/AddSchoolModal";
import SchoolCreatedModal from "../components/all-schools/SchoolCreatedModal";
import SchoolActionModal from "../components/all-schools/SchoolActionModal";

export default function SchoolsPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useSchools();
  const f = useSchoolFilters(data?.schools);

  const [addOpen, setAddOpen] = useState(false);
  const [createdName, setCreatedName] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ action: ConfirmAction; school: School } | null>(null);

  const handleAction = (action: SchoolAction, school: School) => {
    const detail = SA_PATHS.schoolDetail(school.id);
    if (action === "view" || action === "manage") return navigate(detail);
    if (action === "edit") return navigate(`${detail}?mode=edit`);
    setConfirm({ action, school });
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <SchoolStatCards summary={data?.summary} isLoading={isLoading} />
      <SchoolsToolbar
        search={f.search}
        onSearch={f.setSearch}
        status={f.status}
        onStatus={f.setStatus}
        plan={f.plan}
        onPlan={f.setPlan}
        onExport={() => exportSchoolsCsv(f.filtered)}
        exportDisabled={f.filtered.length === 0}
        onAdd={() => setAddOpen(true)}
      />
      <SchoolsTable
        schools={f.pageItems}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        onAction={handleAction}
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
        {addOpen && (
          <AddSchoolModal
            key="add-school"
            onClose={() => setAddOpen(false)}
            onCreated={(name) => {
              setAddOpen(false);
              setCreatedName(name);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {createdName && (
          <SchoolCreatedModal key="school-created" name={createdName} onClose={() => setCreatedName(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {confirm && (
          <SchoolActionModal
            key={`${confirm.action}-${confirm.school.id}`}
            action={confirm.action}
            school={confirm.school}
            onClose={() => setConfirm(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}