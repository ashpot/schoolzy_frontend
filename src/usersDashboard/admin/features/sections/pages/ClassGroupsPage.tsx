import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { ClassGroupListItem } from "../types";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import ClassGroupForm from "../components/class-groups/ClassGroupForm";
import ClassGroupsTable from "../components/class-groups/ClassGroupsTable";
import { useClassGroupsList } from "../hooks/useSections";
import ClassCreatedModal from "../components/shared/ClassCreateModal";

export default function ClassGroupsPage() {
  const { data: groups = [] } = useClassGroupsList();
  const [createdGroup, setCreatedGroup] = useState<ClassGroupListItem | null>(null);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Class Groups</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Manage sub-groups within a class (streams, arms, sets)
          </p>
        </div>
        <StatPill icon={FolderOpen} label={`${groups.length} groups`} />
      </div>
      <SplitLayout
        left={<ClassGroupForm onSuccess={setCreatedGroup} />}
        right={<ClassGroupsTable groups={groups} />}
      />

      <ClassCreatedModal
        isOpen={!!createdGroup}
        onClose={() => setCreatedGroup(null)}
        title="Class Group Created"
        name={createdGroup?.name ?? ""}
        id={createdGroup?.id ?? ""}
      />
    </motion.div>
  );
}