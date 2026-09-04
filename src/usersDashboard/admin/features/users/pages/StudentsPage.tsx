import React, { useState } from "react";
import { motion } from "framer-motion";
import type { ColumnDef, Student } from "../types";
import AvatarInitials from "../components/shared/AvatarInitials";
import GenderBadge from "../components/shared/GenderBadge";
import SectionBadge from "../components/shared/SectionBadge";
import { useDeleteStudent, useStudentsList } from "../hooks/useStudents";
import { pageFade } from "../animations/variants";
import UserPageHeader from "../components/shared/UserPageHeader";
import UserFormPanel from "../components/shared/UserFormPanel";
import StudentForm from "../components/students/StudentsForm";
import UserListPanel from "../components/shared/UserListPanel";
import BulkUploadModal from "../components/shared/bulk-upload/BulkUploadModal";
import { studentBulkUploadConfig } from "../data/mockData";

const COLUMNS: ColumnDef<Student>[] = [
  {
    key: "name", header: "Student Name",
    render: (s) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={`${s.firstName} ${s.lastName}`} />
        <span className="font-medium text-text-primary">{s.firstName} {s.lastName}</span>
      </div>
    ),
  },
  {
    key: "admNo", header: "Adm. No.",
    render: (s) => <span className="text-text-muted">{s.admNo}</span>,
  },
  {
    key: "username", header: "Username",
    render: (s) => <span className="text-text-secondary">{s.username}</span>,
  },
  {
    key: "sex", header: "Gender",
    render: (s) => <GenderBadge gender={s.sex} />,
  },
  {
    key: "section", header: "Section",
    render: (s) => <SectionBadge section={s.section} />,
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
  const { mutate: remove }  = useDeleteStudent();
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

  const handleSearch = (q: string) => { setSearch(q); setPage(1); };

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
          onSearch={handleSearch}
          onPageChange={setPage}
          onDelete={(id) => remove(id)}
        />
      </div>
    </motion.div>
  );
};

export default StudentsPage;