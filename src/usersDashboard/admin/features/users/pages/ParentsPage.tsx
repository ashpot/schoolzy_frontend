import React, { useState } from "react";
import { motion } from "framer-motion";
import type { ColumnDef, Parent } from "../types";
import AvatarInitials from "../components/shared/AvatarInitials";
import GenderBadge from "../components/shared/GenderBadge";
import { useDeleteParent, useParentsList } from "../hooks/useParents";
import UserPageHeader from "../components/shared/UserPageHeader";
import UserFormPanel from "../components/shared/UserFormPanel";
import ParentForm from "../components/parents/ParentForm";
import UserListPanel from "../components/shared/UserListPanel";
import { pageFade } from "../animations/variants";



const COLUMNS: ColumnDef<Parent>[] = [
  {
    key: "parentId", header: "ID",
    render: (p) => <span className="text-text-muted text-xs">{p.parentId}</span>,
  },
  {
    key: "name", header: "Full Name",
    render: (p) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={`${p.firstName} ${p.lastName}`} />
        <span className="font-medium text-text-primary">{p.firstName} {p.lastName}</span>
      </div>
    ),
  },
  {
    key: "username", header: "Username",
    render: (p) => <span className="text-text-secondary">{p.username}</span>,
  },
  {
    key: "sex", header: "Gender",
    render: (p) => <GenderBadge gender={p.sex} />,
  },
];

const ParentsPage: React.FC = () => {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useParentsList(page, search);
  const { mutate: remove }  = useDeleteParent();

  const handleSearch = (q: string) => { setSearch(q); setPage(1); };

  return (
    <motion.div variants={pageFade} initial="hidden" animate="show" className="flex flex-col gap-6">
      <UserPageHeader
        title="Parents"
        subtitle="Manage all parent and guardian accounts"
      />
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-5 items-start">
        <UserFormPanel title="Add Parent">
          <ParentForm />
        </UserFormPanel>
        <UserListPanel<Parent>
          title="Parents List"
          count={data?.total ?? 0}
          searchPlaceholder="Search parents..."
          columns={COLUMNS}
          data={data?.data ?? []}
          total={data?.total ?? 0}
          page={page}
          perPage={data?.perPage ?? 7}
          isLoading={isLoading}
          onSearch={handleSearch}
          onPageChange={setPage}
          onDelete={(id) => remove(id)}
        />
      </div>
    </motion.div>
  );
};

export default ParentsPage;