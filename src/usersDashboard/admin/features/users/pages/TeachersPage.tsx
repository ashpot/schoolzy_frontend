import React, { useState } from "react";
import { motion } from "framer-motion";
import type { ColumnDef, Teacher } from "../types";
import AvatarInitials from "../components/shared/AvatarInitials";
import GenderBadge from "../components/shared/GenderBadge";
import { useDeleteTeacher, useTeachersList } from "../hooks/useTeachers";
import UserPageHeader from "../components/shared/UserPageHeader";
import { pageFade } from "../animations/variants";
import UserFormPanel from "../components/shared/UserFormPanel";
import TeacherForm from "../components/teachers/TeacherForm";
import UserListPanel from "../components/shared/UserListPanel";


const COLUMNS: ColumnDef<Teacher>[] = [
  {
    key: "empNo", header: "Emp. No.",
    render: (t) => <span className="text-text-muted text-xs">{t.empNo}</span>,
  },
  {
    key: "name", header: "Full Name",
    render: (t) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={`${t.firstName} ${t.lastName}`} />
        <span className="font-medium text-text-primary">{t.firstName} {t.lastName}</span>
      </div>
    ),
  },
  {
    key: "username", header: "Username",
    render: (t) => <span className="text-text-secondary">{t.username}</span>,
  },
  {
    key: "sex", header: "Gender",
    render: (t) => <GenderBadge gender={t.sex} />,
  },
  {
    key: "class", header: "Class",
    render: (t) => <span className="text-text-secondary font-medium">{t.classLabel}</span>,
  },
];

const TeachersPage: React.FC = () => {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useTeachersList(page, search);
  const { mutate: remove }  = useDeleteTeacher();

  const handleSearch = (q: string) => { setSearch(q); setPage(1); };

  return (
    <motion.div variants={pageFade} initial="hidden" animate="show" className="flex flex-col gap-6">
      <UserPageHeader
        title="Teachers"
        subtitle="Manage all teaching staff in the school"
        addLabel="Add Teacher"
        showBulkUpload
      />
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-5 items-start">
        <UserFormPanel title="Add Teacher">
          <TeacherForm />
        </UserFormPanel>
        <UserListPanel<Teacher>
          title="Teachers List"
          count={data?.total ?? 0}
          searchPlaceholder="Search teachers..."
          columns={COLUMNS}
          data={data?.data ?? []}
          total={data?.total ?? 0}
          page={page}
          perPage={data?.perPage ?? 6}
          isLoading={isLoading}
          onSearch={handleSearch}
          onPageChange={setPage}
          onDelete={(id) => remove(id)}
        />
      </div>
    </motion.div>
  );
};

export default TeachersPage;