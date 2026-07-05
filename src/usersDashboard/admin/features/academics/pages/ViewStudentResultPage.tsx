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

const schema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  term: z.string().min(1, "Please select a term"),
  session: z.string().min(1, "Please select a session"),
});
type FormValues = z.infer<typeof schema>;

const ViewStudentResultPage: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const loadMutation = useLoadStudentResult();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { studentName: "", term: "", session: "" },
  });

  const onSubmit = (values: FormValues) => {
    loadMutation.mutate(values, {
      onSuccess: () => {
        setHasLoaded(true);
        // TODO: Display the loaded student result data
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
    <div>
      <PageHeader
        title="View Student Result"
        subtitle="Search for a student and load their academic result for any term."
        showAdd={false}
      />

      {/* Filter Card */}
      <motion.div
        variants={slideFromLeft}
        initial="hidden"
        animate="show"
        className="bg-white rounded-2xl card-shadow mb-6"
      >
        <FormHeader
            title="Search Student Result"
            icon={<Search className="w-4 h-4 text-brand-primary" />}

          />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <div>
              <FormInput
                label="Search Student"
                placeholder="Enter student name"
                isLoading={loadMutation.isPending}
                error={errors.studentName?.message}
                {...register("studentName")}
              />
            </div>

            <div>
              <FormSelect
                label="Term"
                placeholder="Select term"
                options={termOptions}
                isLoading={loadMutation.isPending}
                error={errors.term?.message}
                {...register("term")}
              />
            </div>

            <div>
              <FormSelect
                label="Session"
                placeholder="Select session"
                options={sessionOptions}
                isLoading={loadMutation.isPending}
                error={errors.session?.message}
                {...register("session")}
              />
            </div>
          </div>

          {/* Load Button */}
          <SubmitButton
            label="Load Search Results"
            isLoading={loadMutation.isPending}
            className="w-50"
          />
        </form>
      </motion.div>

      {/* Empty State */}
      {!hasLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
            <Search className="w-9 h-9 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-nav mb-2">
            No results loaded yet
          </h3>
          <p className="text-sm text-text-muted max-w-md">
            Select a student, term, and session above then click{" "}
            <span className="font-semibold text-text-nav">Load Search Results</span>
          </p>
        </motion.div>
      )}

      {/* TODO: Add result display section when hasLoaded is true */}
    </div>
  );
};

export default ViewStudentResultPage;