import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { fadeUp } from "../animations/variants";
import OmittedFiltersForm from "../components/upload-omitted/OmittedFiltersForm";
import OmittedStudentsTable from "../components/upload-omitted/OmittedStudentsTable";
import { mockOmittedStudents } from "../data/mockData";
import { useSaveOmittedScore, useUploadAllOmitted } from "../hooks/useUploadOmitted";
import type { UploadOmittedFiltersValues } from "../schemas";
import type { OmittedStudent } from "../types";

export default function UploadOmittedPage() {
  const [loaded, setLoaded] = useState(false);
  const [students, setStudents] = useState<OmittedStudent[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  const saveOne = useSaveOmittedScore();
  const uploadAll = useUploadAllOmitted();

  const handleLoad = (_values: UploadOmittedFiltersValues) => {
    setStudents(mockOmittedStudents);
    setLoaded(true);
  };

  const handleScoreChange = (id: string, score: number | null) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, score } : s)));
  };

  const handleSaveOne = (student: OmittedStudent) => {
    if (student.score === null) return;
    setSavingId(student.id);
    saveOne.mutate({ studentId: student.id, score: student.score }, { onSettled: () => setSavingId(null) });
  };

  const handleUploadAll = () => {
    const payload = students.filter((s) => s.score !== null).map((s) => ({ studentId: s.id, score: s.score! }));
    uploadAll.mutate(payload);
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Upload Omitted Students</h1>
        <p className="text-body-small text-text-secondary mt-1">Enter scores for students who were not included in the original upload.</p>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6">
        <OmittedFiltersForm isLoading={false} onLoad={handleLoad} />
      </div>

      {loaded && students.length > 0 ? (
        <OmittedStudentsTable
          students={students}
          onScoreChange={handleScoreChange}
          onSaveOne={handleSaveOne}
          onUploadAll={handleUploadAll}
          savingId={savingId}
          isUploadingAll={uploadAll.isPending}
        />
      ) : (
        <div className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex-center mb-4">
            <ClipboardList size={28} className="text-brand-primary" />
          </div>
          <h3 className="font-semibold text-text-primary">{loaded ? "No omitted students found" : "No student record loaded"}</h3>
          <p className="text-body-small text-text-secondary mt-1">
            {loaded ? (
              "All students were included in the original upload."
            ) : (
              <>Select a class, subject, term and assessment type above, then click <span className="font-medium">Load Omitted Students</span></>
            )}
          </p>
        </div>
      )}
    </motion.div>
  );
}