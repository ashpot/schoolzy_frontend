import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ColumnDef, Student } from "../types";
import AvatarInitials from "../components/shared/AvatarInitials";
import GenderBadge from "../components/shared/GenderBadge";
import { useDeleteStudent, useStudentsList } from "../hooks/useStudents";
import { pageFade } from "../animations/variants";
import UserPageHeader from "../components/shared/UserPageHeader";
import UserFormPanel from "../components/shared/UserFormPanel";
import StudentForm from "../components/students/StudentForm";
import UserListPanel from "../components/shared/UserListPanel";
import BulkUploadModal from "../components/shared/bulk-upload/BulkUploadModal";
import { studentBulkUploadConfig } from "../data/mockData";

const COLUMNS: ColumnDef<Student>[] = [
  {
    key: "name", header: "Student Name",
    render: (s) => (
      <div className="flex items-center gap-2.5">
        {s.raw?.photo ? (
          <img src={s.raw.photo} alt={s.firstName} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <AvatarInitials name={`${s.firstName} ${s.lastName}`} />
        )}
        <span className="font-medium text-text-primary">{s.firstName} {s.lastName}</span>
      </div>
    ),
  },
  {
    key: "admNo", header: "Adm. No.",
    render: (s) => <span className="text-text-muted">{s.raw?.admission_number ?? "—"}</span>,
  },
  {
    key: "username", header: "Username",
    render: (s) => <span className="text-text-secondary">{s.raw?.username}</span>,
  },
  {
    key: "sex", header: "Gender",
    // Real value only: no more "Male" fallback for null
    render: (s) =>
      s.raw?.sex ? <GenderBadge gender={s.raw.sex} /> : <span className="text-text-muted">—</span>,
  },
  {
    key: "section", header: "Section",
    // Real section name from the backend, shown as a plain pill
    render: (s) => {
      const cg = typeof s.raw?.class_group === "object" ? s.raw.class_group : null;
      return cg?.section_name ? (
        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
          {cg.section_name}
        </span>
      ) : (
        <span className="text-text-muted">—</span>
      );
    },
  },
  {
    key: "class", header: "Class",
    render: (s) => <span className="text-text-secondary font-medium">{s.classLabel}</span>,
  },
];

const StudentsPage: React.FC = () => {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useStudentsList(page, search);
  const { mutateAsync: remove, isPending: isDeleting } = useDeleteStudent();
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

  const handleSearch = (q: string) => { setSearch(q); setPage(1); };

  // If the last row on the last page was deleted, step back so we don't show an empty page
  useEffect(() => {
    if (data && data.data.length === 0 && page > 1) setPage(page - 1);
  }, [data, page]);

  return (
    <motion.div variants={pageFade} initial="hidden" animate="show" className="flex flex-col gap-6">
      <UserPageHeader
        title="Students"
        subtitle="Manage all students enrolled in the school"
        showBulkUpload
        onBulkUpload={() => setIsBulkUploadOpen(true)}
      />
      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        config={studentBulkUploadConfig}
        queryKey="students"
      />
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-5 items-start">
        <UserFormPanel title="Add Student">
          <StudentForm />
        </UserFormPanel>
        <UserListPanel<Student>
          title="Students List"
          count={data?.total ?? 0}
          searchPlaceholder="Search students..."
          columns={COLUMNS}
          data={data?.data ?? []}
          total={data?.total ?? 0}
          page={page}
          perPage={data?.perPage ?? 5}
          isLoading={isLoading}
          isDeleting={isDeleting}
          onSearch={handleSearch}
          onPageChange={setPage}
          onDelete={(id) => remove(id)}
          getRowLabel={(s) => `${s.firstName} ${s.lastName}`}
          editTitle="Student"
          editFields={[
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "username", label: "Username" },
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
            { key: "classLabel", label: "Class" },
          ]}
          onEdit={(updated) => {
            // TODO: Replace with actual API call e.g. api.patch(`/users/${updated.id}/`, updated)
            console.log("Saving edited student:", updated);
          }}
        />
      </div>
    </motion.div>
  );
};

export default StudentsPage;