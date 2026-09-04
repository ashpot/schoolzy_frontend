import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slideFromLeft } from "../animations/variants";
import { useLoadStudentResult } from "../hooks/useAcademics";
import PageHeader from "@/shared/ui/PageHeader";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../components/shared/FormHeader";
import { mockStudentResult } from "../data/mockData";
import type { StudentResultData } from "../types/studentResult";
import StudentResultHeader from "../components/shared/view-student-result/StudentResultHeader";
import ResultStatCards from "../components/shared/view-student-result/ResultStatCards";
import RemarkBanner from "../components/shared/view-student-result/RemarkBanner";
import ResultActionsBar from "../components/shared/view-student-result/ResultActionsBar";
import AttendanceSummaryModal from "../components/shared/view-student-result/AttendanceSummaryModal";
import PsychomotiveModal from "../components/shared/view-student-result/PsychomotiveModal";
import ResultCommentModal from "../components/shared/view-student-result/ResultCommentModal";
import PrintableResultModal from "../components/shared/view-student-result/PrintableResultModal";
import SubjectResultsTable from "../components/shared/view-student-result/SubjectResultsTable";


const schema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  term: z.string().min(1, "Please select a term"),
  session: z.string().min(1, "Please select a session"),
});
type FormValues = z.infer<typeof schema>;

const ViewStudentResultPage: React.FC = () => {
  const [result, setResult] = useState<StudentResultData | null>(null);
  const [activeModal, setActiveModal] = useState<"attendance" | "psychomotive" | "comment" | "printable" | null>(null);
  const loadMutation = useLoadStudentResult();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { studentName: "", term: "", session: "" },
  });

  const onSubmit = (values: FormValues) => {
    loadMutation.mutate(values, {
      onSuccess: () => {
        // TODO: Replace mock result with the actual loaded result from the API response
        setResult(mockStudentResult);
      },
    });
  };

  const termOptions = [
    { value: "First Term", label: "First Term" },
    { value: "Second Term", label: "Second Term" },
    { value: "Third Term", label: "Third Term" },
  ];

  const sessionOptions = [
    { value: "2025/2026", label: "2025/2026" },
    { value: "2024/2025", label: "2024/2025" },
    { value: "2023/2024", label: "2023/2024" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="View Student Result"
        subtitle="Search for a student and load their academic result for any term."
        showAdd={false}
      />

      <motion.div variants={slideFromLeft} initial="hidden" animate="show" className="bg-white rounded-2xl card-shadow">
        <FormHeader title="Search Student Result" icon={<Search className="w-4 h-4 text-brand-primary" />} />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <FormInput label="Search Student" placeholder="Enter student name"
              isLoading={loadMutation.isPending} error={errors.studentName?.message} {...register("studentName")} />
            <FormSelect label="Session" placeholder="Select session" options={sessionOptions}
              isLoading={loadMutation.isPending} error={errors.session?.message} {...register("session")} />
            <FormSelect label="Term" placeholder="Select term" options={termOptions}
              isLoading={loadMutation.isPending} error={errors.term?.message} {...register("term")} />
          </div>
          <SubmitButton label="Load Search Results" isLoading={loadMutation.isPending} className="w-50" />
        </form>
      </motion.div>

      {!result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
            <Search className="w-9 h-9 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-nav mb-2">No results loaded yet</h3>
          <p className="text-sm text-text-muted max-w-md">
            Select a student, term, and session above then click{" "}
            <span className="font-semibold text-text-nav">Load Search Results</span>
          </p>
        </motion.div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
          <StudentResultHeader result={result} onPrint={() => window.print()} />
          <ResultStatCards result={result} />
          <RemarkBanner result={result} />
          <SubjectResultsTable result={result} />
          <ResultActionsBar
            onOpenAttendance={() => setActiveModal("attendance")}
            onOpenComment={() => setActiveModal("comment")}
            onOpenPsychomotive={() => setActiveModal("psychomotive")}
            onOpenPrintable={() => setActiveModal("printable")}
          />
        </motion.div>
      )}

      {result && (
        <>
          <AttendanceSummaryModal
            isOpen={activeModal === "attendance"}
            initialValues={result.attendance}
            onClose={() => setActiveModal(null)}
            onSaved={(attendance) => setResult({ ...result, attendance })}
          />
          <PsychomotiveModal
            isOpen={activeModal === "psychomotive"}
            initialValues={result.psychomotive}
            onClose={() => setActiveModal(null)}
            onSaved={(psychomotive) => setResult({ ...result, psychomotive })}
          />
          <ResultCommentModal
            isOpen={activeModal === "comment"}
            initialValues={result.comments}
            onClose={() => setActiveModal(null)}
            onSaved={(comments) => setResult({ ...result, comments })}
          />
          <PrintableResultModal
            isOpen={activeModal === "printable"}
            result={result}
            onClose={() => setActiveModal(null)}
          />
        </>
      )}
    </div>
  );
};

export default ViewStudentResultPage;