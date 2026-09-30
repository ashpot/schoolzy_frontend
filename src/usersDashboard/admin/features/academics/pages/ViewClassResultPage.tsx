import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Loader2, AlertCircle } from "lucide-react";
import { useClassResult } from "../hooks/useAcademics";
import type { ClassResultFilters } from "../types/classResult";
import PageHeader from "@/shared/ui/PageHeader";
import Button from "@/shared/ui/Button";
import ClassResultFilter from "../components/view-class-result/ClassResultFilter";
import ClassResultStatCards from "../components/view-class-result/ClassResultStatCards";
import ClassResultTable from "../components/view-class-result/ClassResultTable";

const ViewClassResultPage: React.FC = () => {
  const [filters, setFilters] = useState<ClassResultFilters | null>(null);
  const { data, isFetching, isError, error } = useClassResult(filters);

  return (
    <div>
      <PageHeader
        title="View Class Result"
        subtitle="Select class and term to load the full result sheet for all students."
        showAdd={false}
      />

      <ClassResultFilter isLoading={isFetching} onSubmit={setFilters} />

      {isFetching && (
        <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Loading results…</span>
        </div>
      )}

      {isError && !isFetching && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-danger text-sm">
          <AlertCircle size={16} />
          {error instanceof Error ? error.message : "Failed to load class result."}
        </div>
      )}

      {!data && !isFetching && !isError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
            <Users className="w-9 h-9 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-nav mb-2">No class loaded yet</h3>
          <p className="text-sm text-text-muted max-w-md">
            Select a class, group, session and term above then click{" "}
            <span className="font-semibold text-text-nav">Load Students</span>
          </p>
        </motion.div>
      )}

      {data && !isFetching && (
        <div className="flex flex-col gap-6 mt-6">
          <ClassResultStatCards result={data} />
          <ClassResultTable result={data} />
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={() => {
                // TODO: Implement printable class result format (UI not provided yet)
                console.log("View printable format for", data.class.name);
              }}
            >
              View Printable Format
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewClassResultPage;