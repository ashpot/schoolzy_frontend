import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Admin, ColumnDef } from "../types";
import AvatarInitials from "../components/shared/AvatarInitials";
import { useAdminsList, useDeleteAdmin } from "../hooks/useAdmins";
import { pageFade } from "../animations/variants";
import UserPageHeader from "../components/shared/UserPageHeader";
import UserFormPanel from "../components/shared/UserFormPanel";
import AdminForm from "../components/admins/AdminForm";
import UserListPanel from "../components/shared/UserListPanel";

const COLUMNS: ColumnDef<Admin>[] = [
  {
    key: "adminId", header: "ID",
    render: (a) => <span className="text-text-muted text-xs">{a.adminId}</span>,
  },
  {
    key: "name", header: "Full Name",
    render: (a) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={`${a.firstName} ${a.lastName}`} />
        <span className="font-medium text-text-primary">{a.firstName} {a.lastName}</span>
      </div>
    ),
  },
  {
    key: "username", header: "Username",
    render: (a) => <span className="text-text-secondary">{a.username}</span>,
  },
];

const AdminsPage: React.FC = () => {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useAdminsList(page, search);
  const { mutate: remove }  = useDeleteAdmin();

  const handleSearch = (q: string) => { setSearch(q); setPage(1); };

  return (
    <motion.div variants={pageFade} initial="hidden" animate="show" className="flex flex-col gap-6">
      <UserPageHeader
        title="Admins"
        subtitle="Manage all administrative staff accounts"
      />
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-5 items-start">
        <UserFormPanel title="Add Admin">
          <AdminForm />
        </UserFormPanel>
        <UserListPanel<Admin>
          title="Admins List"
          count={data?.total ?? 0}
          searchPlaceholder="Search admins..."
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

export default AdminsPage;