import React, { useState } from "react";
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
  const { mutate: remove }  = useDeleteStudent();
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  // console.log(data)
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


// import React, { useState } from "react";
// import { API_BASE_URL } from "@/shared/config/api";
// import { getTenant } from "@/shared/utils/tenant";

// const DebugUsersByRole: React.FC = () => {
//   const [running, setRunning] = useState(false);

//   const run = async () => {
//     setRunning(true);
//     console.clear();

//     const url = `${API_BASE_URL}/users/?role=Student`;
//     const tenant = getTenant();
//     const token = localStorage.getItem("schoolzy_token");

//     console.log("🧪 TEST: GET", url);
//     console.log("🏫 Tenant:", tenant, "| 🔑 Token present:", !!token);

//     try {
//       const res = await fetch(url, {
//         headers: {
//           "Content-Type": "application/json",
//           ...(tenant ? { "X-Tenant-Domain": `${tenant}.schoolzy.com.ng` } : {}),
//           ...(token ? { Authorization: `Token ${token}` } : {}),
//         },
//       });

//       console.log(`📥 Status: ${res.status} ${res.statusText}`);
//       const text = await res.text();

//       let data: any;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         console.log("❌ Response was not JSON:", text.slice(0, 500));
//         return;
//       }

//       if (!Array.isArray(data)) {
//         console.log("⚠️ Response is not an array:", data);
//         return;
//       }

//       // 1. Summary: does the ?role= filter actually work?
//       const byRole: Record<string, number> = {};
//       data.forEach((u) => {
//         const r = u.role || "(empty)";
//         byRole[r] = (byRole[r] ?? 0) + 1;
//       });
//       console.log(`📊 Total returned: ${data.length}`);
//       console.log("📊 Count by role:", byRole);
//       console.log(
//         Object.keys(byRole).length === 1 && byRole["Student"]
//           ? "✅ Filter works: only Students returned"
//           : "⚠️ Filter NOT working: other roles are included"
//       );

//       // 2. Compact table
//       console.table(
//         data.map((u) => ({
//           id: u.id,
//           name: `${u.first_name} ${u.last_name}`,
//           username: u.username,
//           role: u.role,
//           admission_number: u.admission_number,
//           class_group: u.class_group,
//           photo: u.photo ? "yes" : "no",
//         }))
//       );

//       // 3. Full raw data
//       console.log("📦 FULL DATA:", data);
//       console.log("📦 First record in full:", JSON.stringify(data[0], null, 2));
//     } catch (err) {
//       console.error("💥 Network/CORS error:", err);
//     } finally {
//       setRunning(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 left-4 z-100 w-64 bg-white rounded-2xl card-shadow border border-border-line02 p-4 flex flex-col gap-2.5 text-sm">
//       <p className="font-semibold text-text-primary">🧪 Users by role</p>
//       <button
//         type="button"
//         onClick={run}
//         disabled={running}
//         className="px-3 py-2 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-hover disabled:opacity-50"
//       >
//         {running ? "Loading..." : "GET /users/?role=Student"}
//       </button>
//       <p className="text-xs text-text-muted">Results appear in the console.</p>
//     </div>
//   );
// };

// export default DebugUsersByRole;