import React, { useState } from "react";
import PageHeader from "@/shared/ui/PageHeader";
import ResultView from "../components/view-student-result/ResultView";
import { useStudentResult } from "../hooks/useStudentResult";
import type { SearchParams } from "../types/studentResult";
import StudentSearchForm from "../components/view-student-result/StudentSearchForm";
import ResultPlaceholder from "../components/view-student-result/ResultPlaceholder";

const ViewStudentResultPage: React.FC = () => {
  const [params, setParams] = useState<SearchParams | null>(null);
  const { data, isFetching, isError, error } = useStudentResult(params);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="View Student Result"
        subtitle="Search for a student and load their academic result for any term."
        showAdd={false}
      />

      <StudentSearchForm isLoading={isFetching} onSearch={setParams} />

      {data ? (
        <ResultView key={`${data.student.id}-${data.term.id}`} result={data} />
      ) : (
        <ResultPlaceholder
          state={isFetching ? "loading" : isError ? "error" : "idle"}
          message={isError && error instanceof Error ? error.message : undefined}
        />
      )}
    </div>
  );
};

export default ViewStudentResultPage;