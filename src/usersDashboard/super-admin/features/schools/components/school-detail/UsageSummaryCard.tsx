import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import type { SchoolDetail } from "../../types/detail";
import UsageBar from "./UsageBar";

export default function UsageSummaryCard({ school }: { school: SchoolDetail }) {
  const { studentLimit, teacherLimit, storageUsedGb, storageLimitGb } = school;
  const hasStorage = storageUsedGb != null && storageLimitGb != null;
  const hasAny = studentLimit != null || teacherLimit != null || hasStorage;

  return (
    <SectionCard title="Usage Summary" subtitle="Resource consumption vs plan limits">
      {hasAny ? (
        <div className="space-y-6">
          {studentLimit != null && (
            <UsageBar label="Students" used={school.students} limit={studentLimit} suffix=" students" />
          )}
          {teacherLimit != null && (
            <UsageBar label="Teachers" used={school.teachers} limit={teacherLimit} suffix=" teachers" />
          )}
          {hasStorage && <UsageBar label="Storage" used={storageUsedGb} limit={storageLimitGb} suffix=" GB" />}
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-text-muted">
          Plan limits will appear here once subscription data is available.
        </p>
      )}
    </SectionCard>
  );
}