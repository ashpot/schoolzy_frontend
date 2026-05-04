import React, { useState } from "react";
import { motion } from "framer-motion";
import { pageFade } from "@/features/users/animations/variants"
import UserPageHeader from "@/features/users/components/shared/UserPageHeader";
import UserFormPanel  from "@/features/users/components/shared/UserFormPanel";
import UserListPanel  from "@/features/users/components/shared/UserListPanel";
import GenderBadge    from "@/features/users/components/shared/GenderBadge";
import AvatarInitials from "@/features/users/components/shared/AvatarInitials";
import ParentForm     from "@/features/users/components/parents/ParentForm";
import { useParentsList, useDeleteParent } from "@/features/users/hooks/useParents";
import type { Parent, ColumnDef } from "@/features/users/types";


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
        addLabel="Add Parent"
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