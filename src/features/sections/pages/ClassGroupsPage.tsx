// const ClassGroupsPage = () => {
//   return (
//     <div>
//       <h1 className="page-title">Class Groups</h1>
//       <p className="text-body mt-2">Manage class groups.</p>
//     </div>
//   );
// };

// export default ClassGroupsPage;

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { ClassGroup } from "../types";
import { mockClassGroups } from "../data/mockData";
import SplitLayout      from "../components/shared/SplitLayout";
import StatPill         from "../components/shared/StatPill";
import ClassGroupForm   from "../components/class-groups/ClassGroupForm";
import ClassGroupsTable from "../components/class-groups/ClassGroupsTable";

export default function ClassGroupsPage() {
  const [groups, setGroups] = useState<ClassGroup[]>(mockClassGroups);

  const handleAdd    = (g: ClassGroup) => setGroups((p) => [g, ...p]);
  const handleDelete = (id: string)   => setGroups((p) => p.filter((g) => g.id !== id));

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
        left={<ClassGroupForm onSuccess={handleAdd} />}
        right={<ClassGroupsTable groups={groups} onDelete={handleDelete} />}
      />
    </motion.div>
  );
}