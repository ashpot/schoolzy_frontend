import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slideFromLeft } from "../animations/variants";
import { useAttendanceSummary } from "../hooks/useAcademics";
import PageHeader from "@/shared/ui/PageHeader";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../components/shared/FormHeader";

const schema = z.object({
  term: z.string().min(1, "Please select a term"),
  session: z.string().min(1, "Please select a session"),
  class: z.string().min(1, "Please select a class"),
  class_group: z.string().min(1, "Please select a class group"),
});
type FormValues = z.infer<typeof schema>;

const AttendanceSummariesPage: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const loadMutation = useAttendanceSummary();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { term: "", session: "", class: "", class_group: "" },
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
        title="Attendance Summaries"
        subtitle="View class level attendance analytics, trends and per student breakdown."
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
            title="Attendance Filters"
            icon={<BarChart3 className="w-4 h-4 text-brand-primary" />}
          />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
          <div className="grid md:grid-cols-4 gap-4 mb-5">
            <div>
              <FormSelect
                label="Select Class"
                placeholder="Select class"
                options={termOptions}
                isLoading={loadMutation.isPending}
                error={errors.class?.message}
                {...register("class")}
              />
            </div>

            <div>
              <FormSelect
                label="Select Class Group"
                placeholder="Select class group"
                options={sessionOptions}
                isLoading={loadMutation.isPending}
                error={errors.class_group?.message}
                {...register("class_group")}
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
                label="SelectSession"
                placeholder="Select session"
                options={termOptions}
                isLoading={loadMutation.isPending}
                error={errors.session?.message}
                {...register("session")}
              />
            </div>
          </div>

          {/* Load Button */}
          <SubmitButton
            label="Load Summaries"
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
            <BarChart3 className="w-9 h-9 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-nav mb-2">
            No data loaded yet
          </h3>
          <p className="text-sm text-text-muted max-w-md">
            Select a class, group, term and session above then click{" "}
            <span className="font-semibold text-text-nav">Load Summary</span>
          </p>
        </motion.div>
      )}

      {/* TODO: Add result display section when hasLoaded is true */}
    </div>
  );
};

export default AttendanceSummariesPage;