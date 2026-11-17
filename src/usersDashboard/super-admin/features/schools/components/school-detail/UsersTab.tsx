import { useDeferredValue, useMemo, useState } from "react";
import { useSchoolUsers } from "../../hooks/useSchoolDetail";
import type { UserRole, UserStatus } from "../../types/detail";
import { TabError, TabSkeleton } from "./TabStates";
import UserCountCards from "./UserCountCards";
import UsersTable from "./UsersTable";

export default function UsersTab({ schoolId }: { schoolId: string }) {
  const { data, isLoading, isError, refetch } = useSchoolUsers(schoolId);
  const [role, setRole] = useState<"All" | UserRole>("All");
  const [status, setStatus] = useState<"All" | UserStatus>("All");
  const [search, setSearch] = useState("");
  const deferred = useDeferredValue(search);

  const rows = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return (data?.users ?? []).filter(
      (u) =>
        (role === "All" || u.role === role) &&
        (status === "All" || u.status === status) &&
        (!q || [u.name, u.email, u.phone].some((v) => v.toLowerCase().includes(q)))
    );
  }, [data, role, status, deferred]);

  if (isLoading) return <TabSkeleton />;
  if (isError || !data) return <TabError onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <UserCountCards counts={data.counts} />
      <UsersTable
        users={rows}
        role={role}
        onRole={setRole}
        status={status}
        onStatus={setStatus}
        search={search}
        onSearch={setSearch}
      />
    </div>
  );
}