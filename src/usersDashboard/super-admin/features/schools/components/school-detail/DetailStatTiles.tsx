import { motion } from "framer-motion";
import { BookOpen, FileText, HardDrive, Layers, User, Users } from "lucide-react";
import { staggerContainer } from "../../animations/variants";
import type { SchoolDetail } from "../../types/detail";
import StatTile from "./StatTile";

export default function DetailStatTiles({ school }: { school: SchoolDetail }) {
  return (
    <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      <StatTile icon={Users} tone="blue" label="Students" value={school.students} />
      <StatTile icon={BookOpen} tone="purple" label="Teachers" value={school.teachers} />
      <StatTile icon={User} tone="green" label="Parents" value={school.parents ?? "—"} />
      <StatTile icon={Layers} tone="amber" label="Classes" value={school.classes ?? "—"} />
      <StatTile icon={FileText} tone="blue" label="Subjects" value={school.subjects ?? "—"} />
      <StatTile
        icon={HardDrive}
        tone="red"
        label="Storage Used"
        value={school.storageUsedGb == null ? "—" : `${school.storageUsedGb} GB`}
      />
    </motion.div>
  );
}