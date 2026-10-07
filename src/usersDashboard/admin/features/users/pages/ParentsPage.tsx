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
        {p.raw?.photo ? (
          <img src={p.raw.photo} alt={p.firstName} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <AvatarInitials name={`${p.firstName} ${p.lastName}`} />
        )}
        <span className="font-medium text-text-primary">{p.firstName} {p.lastName}</span>
      </div>
    ),
  },
  {
    key: "username", header: "Username",
    render: (p) => <span className="text-text-secondary">{p.raw?.username}</span>,
  },
  {
    key: "sex", header: "Gender",
    render: (p) =>
      p.raw?.sex ? <GenderBadge gender={p.raw.sex} /> : <span className="text-text-muted">—</span>,
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
          getRowLabel={(p) => `${p.firstName} ${p.lastName}`}
          editTitle="Parent"
          editFields={[
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "username", label: "Username" },
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
          ]}
          onEdit={(updated) => {
            // TODO: Replace with actual API call e.g. api.patch(`/users/${updated.id}/`, updated)
            console.log("Saving edited parent:", updated);
          }}
        />
      </div>
    </motion.div>
  );
};

export default ParentsPage;


// import React, { useEffect, useState } from "react";
// import { API_BASE_URL } from "@/shared/config/api";

// const TENANT_DOMAIN = "etihad.schoolzy.com.ng"; // same one you used last run

// type Role = "Student" | "Teacher" | "Parent" | "Admin";

// const TOKEN_KEY = "schoolzy_token";

// // Reads the login token from the key your app actually uses
// function findToken(): { key: string; token: string } | null {
//   const raw = localStorage.getItem(TOKEN_KEY);
//   if (!raw) return null;
//   // Handles both a plain string and a JSON-quoted string ("abc...")
//   const token = raw.replace(/^"|"$/g, "");
//   return { key: TOKEN_KEY, token };
// }

// async function call(url: string, init: RequestInit) {
//   const res = await fetch(url, init);
//   const text = await res.text();
//   let body: any = text;
//   try { body = JSON.parse(text); } catch { /* plain text */ }
//   return { ok: res.ok, status: res.status, body };
// }

// const DebugUserFormData: React.FC = () => {
//   const [role, setRole] = useState<Role>("Parent");
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [running, setRunning] = useState(false);
//   const [ready, setReady] = useState<string>("Loading students & class groups...");
//   const [studentIds, setStudentIds] = useState<number[]>([]);
//   const [classGroupId, setClassGroupId] = useState<number | null>(null);

//   const headers = (token: string) => ({
//     "X-Tenant-Domain": TENANT_DOMAIN,
//     Authorization: `Token ${token}`,
//   });

//   // Step 0: on mount, load the IDs we need
//   useEffect(() => {
//     (async () => {
//       const found = findToken();
//       if (!found) { setReady("❌ No login token found. Log in again, then refresh."); return; }
//       const [users, groups] = await Promise.all([
//         call(`${API_BASE_URL}/users/`, { headers: headers(found.token) }),
//         call(`${API_BASE_URL}/sections/class-groups/`, { headers: headers(found.token) }),
//       ]);
//       if (!users.ok || !groups.ok) {
//         setReady(`❌ Could not load data (users ${users.status}, groups ${groups.status})`);
//         console.log("Users response:", users.body, "Groups response:", groups.body);
//         return;
//       }
//       const students = (users.body as any[]).filter((u) => u.role === "Student");
//       setStudentIds(students.slice(0, 2).map((s) => s.id));
//       setClassGroupId(groups.body[0]?.id ?? null);
//       setReady(`✅ Ready — ${students.length} students, ${groups.body.length} class groups found`);
//     })();
//   }, []);

//   const run = async () => {
//     const found = findToken();
//     if (!found) { console.log("❌ STOP: no login token in localStorage. Log in again."); return; }
//     setRunning(true);

//     const stamp = Date.now().toString().slice(-6);
//     const username = `dbg${role.toLowerCase()}${stamp}`;
//     const password = "Password123!";

//     console.clear();
//     console.log(`🧪 TEST: creating a ${role} "${username}" ${photo ? "WITH photo" : "WITHOUT photo"}`);
//     console.log(`🔑 Token found in localStorage key: "${found.key}"`);

//     const fd = new FormData();
//     const add = (k: string, v: string | number) => fd.append(k, String(v));
//     add("first_name", "Debug"); add("last_name", `${role}${stamp}`);
//     add("middle_name", "Test"); add("username", username);
//     add("password", password); add("email", `${username}@example.com`);
//     add("role", role); add("sex", "Male"); add("phone", "08012345678");
//     add("address", "1 Debug Street"); add("city", "Aba");
//     add("state", "Abia"); add("country", "Nigeria"); add("date_of_birth", "1990-05-20");

//     if (role === "Student") {
//       if (!classGroupId) { console.log("❌ STOP: no class group exists to attach the student to."); setRunning(false); return; }
//       add("class_group", classGroupId); add("admission_number", `ADM/DBG/${stamp}`);
//       console.log(`   → using class group id ${classGroupId} (picked automatically)`);
//     }
//     if (role === "Teacher") {
//       add("employment_number", `EMP/DBG/${stamp}`); add("date_of_employment", "2024-01-15");
//     }
//     if (role === "Parent") {
//       studentIds.forEach((id) => fd.append("children", String(id)));
//       console.log(`   → linking children (student ids picked automatically): ${studentIds.join(", ") || "none found"}`);
//     }
//         if (photo) fd.append("photo", photo);

//     // Print the exact payload being sent
//     const payloadPreview: Record<string, unknown> = {};
//     fd.forEach((value, key) => {
//       const shown =
//         value instanceof File
//           ? `📎 File(${value.name}, ${value.type}, ${(value.size / 1024).toFixed(1)} KB)`
//           : value;
//       // Repeated keys (like children) become an array so you can see them all
//       if (key in payloadPreview) {
//         payloadPreview[key] = [].concat(payloadPreview[key] as never, shown as never);
//       } else {
//         payloadPreview[key] = shown;
//       }
//     });
//     console.log("📤 PAYLOAD being sent (password hidden):", {
//       ...payloadPreview,
//       password: "••••••••",
//     });
//     console.log("   Format: multipart/form-data (FormData)");

//     // Step 1: create
//     const created = await call(`${API_BASE_URL}/users/`, { method: "POST", headers: headers(found.token), body: fd });
//     if (!created.ok) {
//       console.log(`❌ STEP 1 FAILED — backend said ${created.status}. Reason:`, created.body);
//       setRunning(false); return;
//     }
//     console.log(`✅ STEP 1 — user created (id ${created.body.id})`);
//     console.log("   Full response:", created.body);

//     // Step 2: re-read what was saved
//     const saved = await call(`${API_BASE_URL}/users/${created.body.id}/`, { headers: headers(found.token) });
//     const u = saved.body;
//     const check = (label: string, v: unknown) => console.log(`   ${v ? "✅" : "⚠️ NOT SAVED"}  ${label}: ${v ?? "—"}`);
//     console.log("📋 STEP 2 — what the backend actually kept:");
//     if (photo) check("photo", u.photo);
//     check("middle_name", u.middle_name); check("sex", u.sex); check("phone", u.phone);
//     check("address", u.address); check("city", u.city); check("state", u.state);
//     check("country", u.country); check("date_of_birth", u.date_of_birth);
//     if (role === "Student") { check("class_group", u.class_group); check("admission_number", u.admission_number); }
//     if (role === "Teacher") { check("employment_number", u.employment_number); check("date_of_employment", u.date_of_employment); }

//     // Step 3: parent children check
//     if (role === "Parent") {
//       const login = await call(`${API_BASE_URL}/auth/signin/`, {
//         method: "POST",
//         headers: { "X-Tenant-Domain": TENANT_DOMAIN, "Content-Type": "application/json" },
//         body: JSON.stringify({ user: username, password }),
//       });
//       if (!login.ok) console.log("⚠️ STEP 3 — couldn't log in as the new parent:", login.body);
//       else {
//         const dash = await call(`${API_BASE_URL}/dashboard/parent/`, { headers: headers(login.body.token) });
//         const n = dash.body?.children?.length ?? 0;
//         console.log(n > 0
//           ? `✅ STEP 3 — children linked: ${n}`
//           : "⚠️ STEP 3 — parent has NO children. Backend ignored 'children' in this format.");
//       }
//     }
//     console.log("🏁 DONE. Copy everything above and paste it to me.");
//     setRunning(false);
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-100 w-72 bg-white rounded-2xl card-shadow border border-border-line02 p-4 flex flex-col gap-2.5 text-sm">
//       <p className="font-semibold text-text-primary">🧪 FormData test</p>
//       <p className="text-xs text-text-secondary">{ready}</p>
//       <select value={role} onChange={(e) => setRole(e.target.value as Role)}
//         className="px-2.5 py-2 rounded-lg border border-border-line02 bg-bg-input">
//         {["Student", "Teacher", "Parent", "Admin"].map((r) => <option key={r}>{r}</option>)}
//       </select>
//       <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} className="text-xs" />
//       <button type="button" onClick={run} disabled={running}
//         className="px-3 py-2 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-hover disabled:opacity-50">
//         {running ? "Running..." : "Send test"}
//       </button>
//       <p className="text-xs text-text-muted">Results appear in the console.</p>
//     </div>
//   );
// };

// export default DebugUserFormData;