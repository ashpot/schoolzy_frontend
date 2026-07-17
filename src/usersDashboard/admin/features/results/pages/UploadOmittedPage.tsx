import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { LoadedRecord } from "../types";
import LocateStudentForm from "../components/uploadomitted/LocateStudentForm";
import OmittedResultEntry from "../components/uploadomitted/OmittedResultEntry";
import EmptyOmittedState from "../components/uploadomitted/EmptyOmittedState";


export default function UploadOmittedPage() {
  const [loadedRecord, setLoadedRecord] = useState<LoadedRecord | null>(null);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6 pb-24">
      <div>
        <h1 className="page-title">Upload Omitted Results</h1>
        <p className="text-body-small text-text-secondary mt-1">
          Locate a student's missing result record and upload the corrected score
        </p>
      </div>

      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
        <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-800 leading-relaxed">
          Use this page to upload scores for students whose results were previously omitted or skipped
          during the main upload. Select the student, choose the correct assessment type, enter the score and save.
        </p>
      </div>

      <LocateStudentForm
        isLoaded={!!loadedRecord}
        onLoad={setLoadedRecord}
        onClear={() => setLoadedRecord(null)}
      />

      {loadedRecord ? (
        <OmittedResultEntry record={loadedRecord} />
      ) : (
        <EmptyOmittedState />
      )}
    </motion.div>
  );
}