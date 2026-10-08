import { useState } from "react";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { fadeUp } from "../animations/variants";
import type { FormTeacherAssignment } from "../types";
import { mockAssignments, mockClasses, mockTeachers } from "../data/mockData";
import SplitLayout from "../components/shared/SplitLayout";
import StatPill from "../components/shared/StatPill";
import FormTeacherStats from "../components/assign-form-teacher/FormTeacherStats";
import FormTeacherForm from "../components/assign-form-teacher/FormTeacherForm";
import FormTeacherTable from "../components/assign-form-teacher/FormTeacherTable";

export default function AssignFormTeacherPage() {
  const [assignments, setAssignments] = useState<FormTeacherAssignment[]>(mockAssignments);

  const handleAdd = (a: FormTeacherAssignment) => setAssignments((p) => [a, ...p]);
  const handleDelete = (id: string) => setAssignments((p) => p.filter((a) => a.id !== id));

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Assign Class Form Teacher</h1>
          <p className="text-body-small text-text-secondary mt-1">
            Assign a dedicated form teacher to each class
          </p>
        </div>
        <StatPill icon={Link2} label={`${assignments.length} assigned`} />
      </div>
      <FormTeacherStats
        totalClasses={mockClasses.length}
        totalTeachers={mockTeachers.length}
        assigned={assignments.length}
      />
      <SplitLayout
        left={<FormTeacherForm onSuccess={handleAdd} />}
        right={<FormTeacherTable assignments={assignments} onDelete={handleDelete} />}
      />
    </motion.div>
  );
}



// import React, { useEffect, useState } from "react";
// import { API_BASE_URL } from "@/shared/config/api";
// import { getTenant } from "@/shared/utils/tenant";

// const authHeaders = () => {
//   const tenant = getTenant();
//   const token = localStorage.getItem("schoolzy_token");
//   return {
//     "Content-Type": "application/json",
//     ...(tenant ? { "X-Tenant-Domain": `${tenant}.schoolzy.com.ng` } : {}),
//     ...(token ? { Authorization: `Token ${token}` } : {}),
//   } as Record<string, string>;
// };

// async function call(path: string, init: RequestInit = {}) {
//   try {
//     const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers: authHeaders() });
//     const text = await res.text();
//     let body: any = text;
//     try { body = JSON.parse(text); } catch { /* not JSON */ }
//     return { ok: res.ok, status: res.status, body };
//   } catch (e) {
//     return { ok: false, status: 0, body: `Network/CORS error: ${String(e)}` };
//   }
// }

// // Readable error text; trims Django HTML 500 pages down to the exception line
// function explain(body: any): string {
//   if (typeof body === "string") {
//     const m = body.match(/<pre class="exception_value">([\s\S]*?)<\/pre>/);
//     return m ? `SERVER ERROR: ${m[1].trim()}` : body.slice(0, 200);
//   }
//   if (body && typeof body === "object") {
//     return Object.entries(body)
//       .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(" | ") : JSON.stringify(v)}`)
//       .join(" ; ");
//   }
//   return String(body);
// }

// interface Picked {
//   teacher?: any; classGroup?: any; students: any[]; term?: any; section?: any; klass?: any;
// }

// const DebugEndpointsBatch: React.FC = () => {
//   const [picked, setPicked] = useState<Picked | null>(null);
//   const [ready, setReady] = useState("Loading test data from the backend...");
//   const [running, setRunning] = useState(false);

//   // Step 0: gather every ID the tests need
//   useEffect(() => {
//     (async () => {
//       const [users, groups, terms, sections, classes] = await Promise.all([
//         call("/users/"), call("/sections/class-groups/"), call("/academics/terms/"),
//         call("/sections/sections/"), call("/sections/classes/"),
//       ]);
//       const failed = [["users", users], ["class-groups", groups], ["terms", terms],
//         ["sections", sections], ["classes", classes]].filter(([, r]: any) => !r.ok);
//       if (failed.length) {
//         setReady(`❌ Could not load: ${failed.map(([n, r]: any) => `${n} (${r.status})`).join(", ")}`);
//         return;
//       }
//       const p: Picked = {
//         teacher: users.body.find((u: any) => u.role === "Teacher"),
//         students: users.body.filter((u: any) => u.role === "Student").slice(0, 3),
//         classGroup: groups.body[0], term: terms.body[0],
//         section: sections.body[0], klass: classes.body[0],
//       };
//       const missing = Object.entries({ teacher: p.teacher, classGroup: p.classGroup, term: p.term,
//         section: p.section, klass: p.klass }).filter(([, v]) => !v).map(([k]) => k);
//       if (!p.students.length) missing.push("student");
//       setPicked(p);
//       setReady(missing.length ? `⚠️ Nothing found for: ${missing.join(", ")}` : "✅ Ready — all test data found");
//     })();
//   }, []);

//   const run = async () => {
//     if (!picked) return;
//     setRunning(true);
//     console.clear();
//     const stamp = Date.now().toString().slice(-6);
//     const { teacher, classGroup, students, term, section, klass } = picked;

//     console.log("🧪 BATCH TEST — 4 endpoints fired at once");
//     console.log("📌 Test data picked automatically:");
//     console.table({
//       teacher: teacher ? `${teacher.first_name} ${teacher.last_name} (id ${teacher.id})` : "NONE",
//       class_group: classGroup ? `${classGroup.name} (id ${classGroup.id})` : "NONE",
//       students: students.map((s) => s.id).join(", ") || "NONE",
//       term: term ? `${term.name} (id ${term.id})` : "NONE",
//       section: section ? `${section.title} (id ${section.id})` : "NONE",
//       class: klass ? `${klass.name} (id ${klass.id})` : "NONE",
//     });

//     const post = (path: string, data: object) =>
//       call(path, { method: "POST", body: JSON.stringify(data) });

//     // Fire all four at the same time
//     const [assign, result, psycho, denom] = await Promise.all([
//       // 1. Assign class to (form) teacher
//       teacher && classGroup
//         ? post("/academics/assigned-classes/", { class_group: classGroup.id, teacher: teacher.id })
//         : null,
//       // 2. Student result: try up to 3 students, stop at the first non-403
//       (async () => {
//         if (!term || !students.length) return null;
//         const tries: { student: number; status: number; msg: string }[] = [];
//         for (const s of students) {
//           const r = await call(`/results/students/${s.id}/results/?term=${term.id}`);
//           tries.push({ student: s.id, status: r.status, msg: r.ok ? "OK" : explain(r.body) });
//           if (r.status !== 403) return { ...r, tries };
//         }
//         return { ok: false, status: 403, body: tries[tries.length - 1].msg, tries };
//       })(),
//       // 3. Add psychomotive evaluation item
//       section
//         ? post("/academics/psychomotive-evaluation/", { title: `DBG Test ${stamp}`, section: section.id })
//         : null,
//       // 4. Add class average denominator
//       klass ? post("/sections/class-average-denominator/", { denominator: 12, target_class: klass.id }) : null,
//     ]);

//     // Extra probes: do list endpoints exist? (needed to build tables for these pages)
//     const [probeAssigned, probePsycho, probeDenom] = await Promise.all([
//       call("/academics/assigned-classes/"),
//       call("/academics/psychomotive-evaluation/"),
//       call("/sections/class-average-denominator/"),
//     ]);

//     const tests: [string, any, object | null][] = [
//       ["1. Assign class to teacher  POST /academics/assigned-classes/", assign,
//         teacher && classGroup ? { class_group: classGroup.id, teacher: teacher.id } : null],
//       ["2. Student result  GET /results/students/<id>/results/?term=", result, null],
//       ["3. Add psychomotive item  POST /academics/psychomotive-evaluation/", psycho,
//         section ? { title: `DBG Test ${stamp}`, section: section.id } : null],
//       ["4. Add class avg denominator  POST /sections/class-average-denominator/", denom,
//         klass ? { denominator: 12, target_class: klass.id } : null],
//     ];

//     const summary: Record<string, string> = {};
//     tests.forEach(([label, r, sent]) => {
//       console.group(label);
//       if (!r) {
//         console.log("⏭️ Skipped — required test data was not found");
//         summary[label] = "⏭️ skipped (missing data)";
//       } else {
//         if (sent) console.log("📤 Sent:", sent);
//         console.log(`${r.ok ? "✅" : "❌"} Status ${r.status}`);
//         if (r.tries) r.tries.forEach((t: any) => console.log(`   student ${t.student}: ${t.status} ${t.msg}`));
//         console.log(r.ok ? "📥 Response:" : "📥 Backend says:", r.ok ? r.body : explain(r.body));
//         summary[label] = r.ok ? `✅ ${r.status}` : `❌ ${r.status}: ${explain(r.body).slice(0, 120)}`;
//       }
//       console.groupEnd();
//     });

//     console.group("🔎 Probes: do GET list endpoints exist?");
//     const probes: Record<string, string> = {
//       "GET /academics/assigned-classes/": probeAssigned.ok ? `✅ ${probeAssigned.status} (${Array.isArray(probeAssigned.body) ? probeAssigned.body.length + " items" : "object"})` : `❌ ${probeAssigned.status}`,
//       "GET /academics/psychomotive-evaluation/": probePsycho.ok ? `✅ ${probePsycho.status} (${Array.isArray(probePsycho.body) ? probePsycho.body.length + " items" : "object"})` : `❌ ${probePsycho.status}`,
//       "GET /sections/class-average-denominator/": probeDenom.ok ? `✅ ${probeDenom.status} (${Array.isArray(probeDenom.body) ? probeDenom.body.length + " items" : "object"})` : `❌ ${probeDenom.status}`,
//     };
//     console.table(probes);
//     if (probeAssigned.ok) console.log("assigned-classes sample:", probeAssigned.body);
//     if (probePsycho.ok) console.log("psychomotive sample:", probePsycho.body);
//     if (probeDenom.ok) console.log("denominator sample:", probeDenom.body);
//     console.groupEnd();

//     console.log("━━━━━━━━ SUMMARY ━━━━━━━━");
//     console.table(summary);
//     console.log("🏁 DONE. Copy everything above and paste it to me.");
//     setRunning(false);
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-[100] w-72 bg-white rounded-2xl card-shadow border border-border-line02 p-4 flex flex-col gap-2.5 text-sm">
//       <p className="font-semibold text-text-primary">🧪 Batch endpoint test</p>
//       <p className="text-xs text-text-secondary">{ready}</p>
//       <button type="button" onClick={run} disabled={running || !picked}
//         className="px-3 py-2 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-hover disabled:opacity-50">
//         {running ? "Running..." : "Run all 4 tests"}
//       </button>
//       <p className="text-xs text-text-muted">Results appear in the console.</p>
//     </div>
//   );
// };

// export default DebugEndpointsBatch;