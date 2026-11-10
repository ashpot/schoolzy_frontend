import React, { useState } from "react";
import { motion } from "framer-motion";
import type { PsychomotiveScore, ResultComments, StudentResult } from "../../types/studentResult";
import StudentResultHeader from "./StudentResultHeader";
import ResultStatCards from "./ResultStatCards";
import RemarkBanner from "./RemarkBanner";
import SubjectResultsTable from "./SubjectResultsTable";
import ResultActionsBar from "./ResultActionsBar";
import PsychomotiveModal from "./PsychomotiveModal";
import ResultCommentModal from "./ResultCommentModal";
import PrintableResultModal from "./PrintableResultModal";
import { DEFAULT_PSYCHOMOTIVE } from "../../utils/studentResultConstant";

type ModalKey = "psychomotive" | "comment" | "printable" | null;

// The page gives this component a key per student+term, so the local state below
// resets whenever a different result is loaded.
const ResultView: React.FC<{ result: StudentResult }> = ({ result }) => {
  const [modal, setModal] = useState<ModalKey>(null);
  const [psychomotive, setPsychomotive] = useState<PsychomotiveScore[]>(DEFAULT_PSYCHOMOTIVE);
  const [comments, setComments] = useState<ResultComments>({
    classTeacherComment: result.comments.formTeacher.comment,
    principalComment: result.comments.headTeacher.comment,
  });
  const close = () => setModal(null);
  const ids = { studentId: result.student.id, termId: result.term.id };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
      <StudentResultHeader result={result} onPrint={() => setModal("printable")} />
      <ResultStatCards result={result} />
      <RemarkBanner result={result} />
      <SubjectResultsTable result={result} />
      <ResultActionsBar
        onOpenComment={() => setModal("comment")}
        onOpenPsychomotive={() => setModal("psychomotive")}
        onOpenPrintable={() => setModal("printable")}
      />

      <PsychomotiveModal isOpen={modal === "psychomotive"} {...ids}
        initialValues={psychomotive} onClose={close} onSaved={setPsychomotive} />
      <ResultCommentModal isOpen={modal === "comment"} {...ids}
        initialValues={comments} onClose={close} onSaved={setComments} />
      <PrintableResultModal isOpen={modal === "printable"} result={result}
        psychomotive={psychomotive} comments={comments} onClose={close} />
    </motion.div>
  );
};

export default ResultView;