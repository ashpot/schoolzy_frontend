import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { fadeUp } from "../animations/variants";
import LessonNotesFilterBar from "../components/lesson-notes/LessonNotesFilterBar";
import LessonNotesTable from "../components/lesson-notes/LessonNotesTable";
import UploadLessonNoteModal from "../components/lesson-notes/UploadLessonNoteModal";

export default function LessonNotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">Lesson Notes</h1>
          <p className="text-body-small text-text-secondary mt-1">
            View and manage lesson notes uploaded by teachers across all classes
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-medium hover:bg-brand-hover transition-colors"
        >
          <Plus size={16} /> Upload Lesson Note
        </button>
      </div>

      <LessonNotesFilterBar onFilter={() => { /* client-side filter hook, wire up as needed */ }} />
      <LessonNotesTable />

      <UploadLessonNoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}