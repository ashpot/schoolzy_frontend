import { useState } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { Section } from "../types";
import { mockSections } from "../data/mockData";
import SplitLayout   from "../components/shared/SplitLayout";
import StatPill      from "../components/shared/StatPill";
import SectionForm   from "../components/sections/SectionForm";
import SectionsTable from "../components/sections/SectionsTable";
import ClassCreatedModal from "../components/shared/ClassCreateModal";

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>(mockSections);
  const [createdSection, setCreatedSection] = useState<Section | null>(null);

  const handleAdd = (s: Section) => {
    setSections((p) => [s, ...p]);
    setCreatedSection(s);
  };
  const handleDelete = (id: string) => setSections((p) => p.filter((s) => s.id !== id));

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Sections</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Manage academic sections and their result display settings
          </p>
        </div>
        <StatPill icon={Layers} label={`${sections.length} sections`} />
      </div>
      <SplitLayout
        left={<SectionForm onSuccess={handleAdd} />}
        right={<SectionsTable sections={sections} onDelete={handleDelete} />}
      />

      <ClassCreatedModal
        isOpen={!!createdSection}
        onClose={() => setCreatedSection(null)}
        title="Section Created"
        name={createdSection?.title ?? ""}
        id={createdSection?.id ?? ""}
      />
    </motion.div>
  );
}