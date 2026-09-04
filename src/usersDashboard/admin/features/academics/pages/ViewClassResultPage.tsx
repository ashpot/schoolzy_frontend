import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slideFromLeft } from "../animations/variants";
import { useLoadClassResult } from "../hooks/useAcademics";
import PageHeader from "@/shared/ui/PageHeader";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../components/shared/FormHeader";

const schema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  term: z.string().min(1, "Please select a term"),
  session: z.string().min(1, "Please select a session"),
  class: z.string().min(1, "Please select a class"),
  class_group: z.string().min(1, "Please select a class group"),
});
type FormValues = z.infer<typeof schema>;

const ViewClassResultPage: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const loadMutation = useLoadClassResult();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { term: "", session: "" },
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
        title="View Class Result"
        subtitle="Select class and term to load the full result sheet for all students."
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
            title="Class Result Filter"
            icon={<Users className="w-4 h-4 text-brand-primary" />}
          />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
          <div className="grid md:grid-cols-4 gap-4 mb-5">
            <div>
              <FormSelect
                label="Class"
                placeholder="Select class"
                options={termOptions}
                isLoading={loadMutation.isPending}
                error={errors.class?.message}
                {...register("class")}
              />
            </div>

            <div>
              <FormSelect
                label="Class Group"
                placeholder="Select class group"
                options={sessionOptions}
                isLoading={loadMutation.isPending}
                error={errors.class_group?.message}
                {...register("class_group")}
              />
            </div>

             <div>
              <FormSelect
                label="Session"
                placeholder="Select session"
                options={termOptions}
                isLoading={loadMutation.isPending}
                error={errors.session?.message}
                {...register("session")}
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
          </div>

          {/* Load Button */}
          <SubmitButton
            label="Load Students"
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
            <Users className="w-9 h-9 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-nav mb-2">
            No class loaded yet
          </h3>
          <p className="text-sm text-text-muted max-w-md">
            Select a class, group, term and session above then click{" "}
            <span className="font-semibold text-text-nav">Load Students</span>
          </p>
        </motion.div>
      )}

      {/* TODO: Add result display section when hasLoaded is true */}
    </div>
  );
};

export default ViewClassResultPage;