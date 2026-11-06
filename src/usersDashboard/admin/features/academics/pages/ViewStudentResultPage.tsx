// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { slideFromLeft } from "../animations/variants";
// import { useLoadStudentResult } from "../hooks/useAcademics";
// import PageHeader from "@/shared/ui/PageHeader";
// import FormInput from "@/shared/ui/FormInput";
// import FormSelect from "@/shared/ui/FormSelect";
// import SubmitButton from "@/shared/ui/SubmitButton";
// import FormHeader from "../components/shared/FormHeader";
// import { mockStudentResult } from "../data/mockData";
// import type { StudentResultData } from "../types/studentResult";
// import StudentResultHeader from "../components/view-student-result/StudentResultHeader";
// import ResultStatCards from "../components/view-student-result/ResultStatCards";
// import RemarkBanner from "../components/view-student-result/RemarkBanner";
// import ResultActionsBar from "../components/view-student-result/ResultActionsBar";
// import AttendanceSummaryModal from "../components/view-student-result/AttendanceSummaryModal";
// import PsychomotiveModal from "../components/view-student-result/PsychomotiveModal";
// import ResultCommentModal from "../components/view-student-result/ResultCommentModal";
// import PrintableResultModal from "../components/view-student-result/PrintableResultModal";
// import SubjectResultsTable from "../components/view-student-result/SubjectResultsTable";


// const schema = z.object({
//   studentName: z.string().min(1, "Student name is required"),
//   term: z.string().min(1, "Please select a term"),
//   session: z.string().min(1, "Please select a session"),
// });
// type FormValues = z.infer<typeof schema>;

// const ViewStudentResultPage: React.FC = () => {
//   const [result, setResult] = useState<StudentResultData | null>(null);
//   const [activeModal, setActiveModal] = useState<"attendance" | "psychomotive" | "comment" | "printable" | null>(null);
//   const loadMutation = useLoadStudentResult();

//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: { studentName: "", term: "", session: "" },
//   });

//   const onSubmit = (values: FormValues) => {
//     loadMutation.mutate(values, {
//       onSuccess: () => {
//         // TODO: Replace mock result with the actual loaded result from the API response
//         setResult(mockStudentResult);
//       },
//     });
//   };

//   const termOptions = [
//     { value: "First Term", label: "First Term" },
//     { value: "Second Term", label: "Second Term" },
//     { value: "Third Term", label: "Third Term" },
//   ];

//   const sessionOptions = [
//     { value: "2025/2026", label: "2025/2026" },
//     { value: "2024/2025", label: "2024/2025" },
//     { value: "2023/2024", label: "2023/2024" },
//   ];

//   return (
//     <div className="flex flex-col gap-6">
//       <PageHeader
//         title="View Student Result"
//         subtitle="Search for a student and load their academic result for any term."
//         showAdd={false}
//       />

//       <motion.div variants={slideFromLeft} initial="hidden" animate="show" className="bg-white rounded-2xl card-shadow">
//         <FormHeader title="Search Student Result" icon={<Search className="w-4 h-4 text-brand-primary" />} />
//         <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
//           <div className="grid md:grid-cols-3 gap-4 mb-5">
//             <FormInput label="Search Student" placeholder="Enter student name"
//               isLoading={loadMutation.isPending} error={errors.studentName?.message} {...register("studentName")} />
//             <FormSelect label="Session" placeholder="Select session" options={sessionOptions}
//               isLoading={loadMutation.isPending} error={errors.session?.message} {...register("session")} />
//             <FormSelect label="Term" placeholder="Select term" options={termOptions}
//               isLoading={loadMutation.isPending} error={errors.term?.message} {...register("term")} />
//           </div>
//           <SubmitButton label="Load Search Results" isLoading={loadMutation.isPending} className="w-50" />
//         </form>
//       </motion.div>

//       {!result && (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
//           className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center">
//           <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
//             <Search className="w-9 h-9 text-brand-primary" />
//           </div>
//           <h3 className="text-lg font-semibold text-text-nav mb-2">No results loaded yet</h3>
//           <p className="text-sm text-text-muted max-w-md">
//             Select a student, term, and session above then click{" "}
//             <span className="font-semibold text-text-nav">Load Search Results</span>
//           </p>
//         </motion.div>
//       )}

//       {result && (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
//           <StudentResultHeader result={result} onPrint={() => window.print()} />
//           <ResultStatCards result={result} />
//           <RemarkBanner result={result} />
//           <SubjectResultsTable result={result} />
//           <ResultActionsBar
//             onOpenAttendance={() => setActiveModal("attendance")}
//             onOpenComment={() => setActiveModal("comment")}
//             onOpenPsychomotive={() => setActiveModal("psychomotive")}
//             onOpenPrintable={() => setActiveModal("printable")}
//           />
//         </motion.div>
//       )}

//       {result && (
//         <>
//           <AttendanceSummaryModal
//             isOpen={activeModal === "attendance"}
//             initialValues={result.attendance}
//             onClose={() => setActiveModal(null)}
//             onSaved={(attendance) => setResult({ ...result, attendance })}
//           />
//           <PsychomotiveModal
//             isOpen={activeModal === "psychomotive"}
//             initialValues={result.psychomotive}
//             onClose={() => setActiveModal(null)}
//             onSaved={(psychomotive) => setResult({ ...result, psychomotive })}
//           />
//           <ResultCommentModal
//             isOpen={activeModal === "comment"}
//             initialValues={result.comments}
//             onClose={() => setActiveModal(null)}
//             onSaved={(comments) => setResult({ ...result, comments })}
//           />
//           <PrintableResultModal
//             isOpen={activeModal === "printable"}
//             result={result}
//             onClose={() => setActiveModal(null)}
//           />
//         </>
//       )}
//     </div>
//   );
// };
// export default ViewStudentResultPage;


import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/shared/config/api";
import { getTenant } from "@/shared/utils/tenant";

interface CallOpts { method?: string; json?: unknown; token?: string | null; noAuth?: boolean }

async function call(path: string, opts: CallOpts = {}) {
  const tenant = getTenant();
  const token = opts.token ?? localStorage.getItem("schoolzy_token");
  const headers = {
    "Content-Type": "application/json",
    ...(tenant ? { "X-Tenant-Domain": `${tenant}.schoolzy.com.ng` } : {}),
    ...(token && !opts.noAuth ? { Authorization: `Token ${token}` } : {}),
  } as Record<string, string>;
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: opts.method ?? "GET",
      headers,
      body: opts.json !== undefined ? JSON.stringify(opts.json) : undefined,
    });
    const text = await res.text();
    let body: any = text;
    try { body = JSON.parse(text); } catch { /* not JSON */ }
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    return { ok: false, status: 0, body: `Network/CORS error: ${String(e)}` };
  }
}

function explain(body: any): string {
  if (typeof body === "string") {
    const m = body.match(/<pre class="exception_value">([\s\S]*?)<\/pre>/);
    return m ? `SERVER ERROR: ${m[1].trim()}` : body.slice(0, 300);
  }
  return JSON.stringify(body).slice(0, 400);
}

interface StudentOpt { id: number; label: string; groupId: number | null; groupName: string }
interface Opt { id: number; label: string }

const inputCls =
  "w-full px-2 py-1.5 rounded-lg border border-border-line02 bg-bg-input text-xs text-text-primary focus:border-brand-primary focus:outline-none";
const primaryBtn =
  "px-3 py-2 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-hover disabled:opacity-50";
const outlineBtn =
  "px-3 py-2 rounded-lg border border-brand-primary text-brand-primary font-medium hover:bg-bg-input disabled:opacity-50";

const resultPath = (student: string | number, term: string) =>
  `/results/students/${student}/results/?term=${term}`;

const DebugStudentResult: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lookupError, setLookupError] = useState("");
  const [students, setStudents] = useState<StudentOpt[]>([]);
  const [terms, setTerms] = useState<Opt[]>([]);
  const [subjects, setSubjects] = useState<Opt[]>([]);
  const [student, setStudent] = useState("");
  const [term, setTerm] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("5");

  // Optional: run tests 1-2 as another user (student/parent) without logging out of the app
  const [altUser, setAltUser] = useState("");
  const [altPass, setAltPass] = useState("");
  const [altToken, setAltToken] = useState<string | null>(null);
  const [altLabel, setAltLabel] = useState("");

  const loadLookups = async () => {
    setLoading(true);
    setLookupError("");
    const [u, t, s, sub] = await Promise.all([
      call("/users/"),
      call("/academics/terms/"),
      call("/academics/sessions/"),
      call("/academics/subjects/"),
    ]);
    const failed = [["users", u], ["terms", t]].filter(([, r]: any) => !r.ok || !Array.isArray(r.body));
    if (failed.length) {
      setLookupError(failed.map(([p, r]: any) => `${p} → ${r.status}: ${explain(r.body)}`).join(" | "));
      setLoading(false);
      return;
    }

    const studentOpts: StudentOpt[] = u.body
      .filter((x: any) => x.role === "Student")
      .map((x: any) => ({
        id: x.id,
        groupId: x.class_group?.id ?? null, // class_group is a nested object (or null)
        groupName: x.class_group?.name ?? "no class group",
        label: `${x.first_name} ${x.last_name} (#${x.id}, ${x.class_group?.name ?? "no group"}${x.is_active ? "" : ", inactive"})`,
      }));

    const sessionName = new Map<number, string>(
      (s.ok && Array.isArray(s.body) ? s.body : []).map((x: any) => [x.id, x.name])
    );
    const termOpts: Opt[] = [...t.body]
      .sort((a: any, b: any) => Number(b.is_active) - Number(a.is_active) || b.id - a.id)
      .map((x: any) => ({
        id: x.id,
        label: `${x.name} · ${sessionName.get(x.session) ?? `session ${x.session}`}${x.is_active ? " ★active" : ""}`,
      }));
    const subjectOpts: Opt[] = (sub.ok && Array.isArray(sub.body) ? sub.body : []).map((x: any) => ({
      id: x.id,
      label: `${x.name} (#${x.id})`,
    }));

    const firstStudent = studentOpts.find((x) => x.groupId !== null) ?? studentOpts[0];
    setStudents(studentOpts);
    setTerms(termOpts);
    setSubjects(subjectOpts);
    setStudent(firstStudent ? String(firstStudent.id) : "");
    setTerm(termOpts[0] ? String(termOpts[0].id) : "");
    setSubject(subjectOpts[0] ? String(subjectOpts[0].id) : "");

    let me: any = null;
    try { me = JSON.parse(localStorage.getItem("schoolzy_user") ?? "null"); } catch { /* ignore */ }
    console.log("📦 Lookups:", { students: studentOpts.length, terms: termOpts, subjects: subjectOpts.length });
    console.log("👤 Logged-in app user (localStorage schoolzy_user):", me);
    setLoading(false);
  };

  useEffect(() => { loadLookups(); }, []);

  const selected = students.find((x) => String(x.id) === student);

  // ── Sign in as another user (probe only; the app's stored token is untouched) ──
  const loginAlt = async () => {
    setRunning(true);
    console.clear();
    console.log(`🧪 SIGN IN AS "${altUser}" (probe only)`);
    const r = await call("/auth/signin/", { method: "POST", json: { user: altUser, password: altPass }, noAuth: true });
    if (r.ok && r.body?.token) {
      setAltToken(r.body.token);
      setAltLabel(`${r.body.user?.username ?? altUser} (${r.body.user?.role ?? "?"})`);
      console.log("✅ Signed in as:", r.body.user);
    } else {
      console.log(`❌ ${r.status}:`, explain(r.body));
    }
    setAltPass("");
    setRunning(false);
  };

  const clearAlt = () => { setAltToken(null); setAltLabel(""); };

  // ── Shape analysis of a 200 response ─────────────────────────────
  const analyze = (b: any) => {
    console.log("Top-level keys:", Object.keys(b ?? {}).join(", "));
    console.log("student:", b.student);
    console.log("term:", b.term);
    console.log("assessment_types:", b.assessment_types);
    console.log("summary:", b.summary);
    console.log("comments:", b.comments);
    console.log("calendar:", b.calendar, "| generated:", b.generated);
    console.log("performance:", b.performance);

    const subs: any[] = b.subjects ?? [];
    console.log(`subjects: ${subs.length} | summary.subjects_offered: ${b.summary?.subjects_offered}`,
      subs.length === (b.summary?.subjects_offered ?? 0) ? "✅ match" : "⚠️ mismatch");
    if (subs.length) {
      const keys = new Set<string>();
      subs.forEach((x) => Object.keys(x).forEach((k) => keys.add(k)));
      console.log("Subject keys (union):", [...keys].join(", "));
      console.log("First subject (full):\n" + JSON.stringify(subs[0], null, 2));
      console.table(subs.map((x) => ({ ...x, scores: JSON.stringify(x.scores ?? x.assessments ?? null) })));
    } else {
      console.log("⚠️ subjects is empty, so the per-subject shape can't be confirmed. Use test 4 to seed scores.");
    }
    console.log("Grade/remark/position:", b.summary?.grade, b.summary?.remark, b.summary?.class_position,
      "| class_average:", b.summary?.class_average);
  };

  const who = () => (altToken ? `alt user ${altLabel}` : "the app's logged-in account");

  // ── 1. Single student result ─────────────────────────────────────
  const runOne = async () => {
    setRunning(true);
    console.clear();
    const path = resultPath(student, term);
    console.log(`🧪 STUDENT RESULT as ${who()}\nGET ${path}`);
    const r = await call(path, { token: altToken });
    console.group(`${r.ok ? "✅" : "❌"} → ${r.status}`);
    if (!r.ok) {
      console.log("Backend says:", explain(r.body));
      if (r.status === 403) console.log("➡️ Permission rule. Try 'sign in as' a student or parent and rerun.");
    } else {
      analyze(r.body);
    }
    console.groupEnd();
    console.log("🏁 DONE. Copy everything above and paste it to me.");
    setRunning(false);
  };

  // ── 2. Sweep every student ───────────────────────────────────────
  const runSweep = async () => {
    setRunning(true);
    console.clear();
    console.log(`🧪 SWEEP ${students.length} students for term #${term} as ${who()}`);
    const results = await Promise.all(students.map((s) => call(resultPath(s.id, term), { token: altToken })));
    console.table(
      students.map((s, i) => ({
        id: s.id,
        student: s.label.split(" (")[0],
        group: s.groupName,
        status: results[i].status,
        error: results[i].ok ? "" : explain(results[i].body).slice(0, 80),
        subjects: results[i].ok ? results[i].body?.subjects?.length : "—",
      }))
    );
    const tally: Record<number, number> = {};
    results.forEach((r) => { tally[r.status] = (tally[r.status] ?? 0) + 1; });
    console.log("Status tally:", tally);
    console.log("🏁 DONE. Copy everything above and paste it to me.");
    setRunning(false);
  };

  // ── 3. Class result for the same group (known to work) ───────────
  const runClass = async () => {
    setRunning(true);
    console.clear();
    const gid = selected?.groupId;
    if (!gid) { console.log("❌ This student has no class group."); setRunning(false); return; }
    console.log(`🧪 CLASS RESULT for group #${gid}, term #${term}\nGET /results/classes/${gid}/?term=${term}`);
    const r = await call(`/results/classes/${gid}/?term=${term}`, { token: altToken });
    console.group(`${r.ok ? "✅" : "❌"} → ${r.status}`);
    if (!r.ok) {
      console.log("Backend says:", explain(r.body));
    } else {
      console.log("statistics:", r.body.statistics);
      console.log("assessment_types:", r.body.assessment_types);
      const rows: any[] = r.body.students ?? [];
      console.log(`students: ${rows.length}`);
      const withSubjects = rows.find((x) => (x.subjects ?? []).length > 0);
      console.log(withSubjects
        ? "First student with subjects:\n" + JSON.stringify(withSubjects.subjects[0], null, 2)
        : "⚠️ No student has subjects yet (empty everywhere)");
      console.table(rows.map((x) => ({
        id: x.student?.id, name: x.student?.full_name, subjects: x.subjects?.length,
        total: x.summary?.total, average: x.summary?.average, grade: x.summary?.grade, position: x.summary?.class_position,
      })));
    }
    console.groupEnd();
    console.log("🏁 DONE. Copy everything above and paste it to me.");
    setRunning(false);
  };

  // ── 4. Seed scores so subjects[] has data (creates real records) ──
  const runSeed = async () => {
    setRunning(true);
    console.clear();
    const gid = selected?.groupId;
    if (!gid) { console.log("❌ This student has no class group."); setRunning(false); return; }
    console.log(`🧪 SEED SCORES  group #${gid}, subject #${subject}, term #${term}, score ${score} per assessment`);

    const sheetPath = `/results/scoresheet/?term=${term}&class_group=${gid}&subject=${subject}`;
    const sheet = await call(sheetPath);
    console.log(`${sheet.ok ? "✅" : "❌"} scoresheet → ${sheet.status}`, sheet.ok ? "" : explain(sheet.body));
    if (!sheet.ok) { setRunning(false); return; }

    const types: any[] = sheet.body.assessment_types ?? [];
    const rows: any[] = sheet.body.students ?? [];
    console.log(`scoresheet: ${rows.length} students, ${types.length} assessment types`);
    if (!rows.length || !types.length) {
      console.log("⚠️ Nothing to score (no students or no assessment types for this subject/group).");
      setRunning(false);
      return;
    }

    // Doc lists this as GET /results/bulk/ with a body; a body implies POST. Unverified.
    const payload = [{
      subject: Number(subject),
      term: Number(term),
      class_group: gid,
      students: rows.map((s) => ({
        id: s.id,
        student_session_record_id: s.student_session_record_id,
        score: types.map((t) => ({ assessment_type: t.id, score: Number(score) })),
      })),
    }];
    console.log("Sending JSON:", payload);
    const post = await call("/results/bulk/", { method: "POST", json: payload });
    console.group(`${post.ok ? "✅" : "❌"} bulk upload → ${post.status}`);
    console.log(post.ok ? post.body : `Backend says: ${explain(post.body)}`);
    console.groupEnd();
    if (post.ok) console.log("➡️ Now run test 1 and test 3 again; subjects should be populated.");
    console.log("🏁 DONE. Copy everything above and paste it to me.");
    setRunning(false);
  };

  const ready = !loading && !lookupError && student && term;

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-80 max-h-[90vh] overflow-y-auto bg-white rounded-2xl card-shadow border border-border-line02 p-4 flex flex-col gap-2.5 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-text-primary">🧪 Student result probes</p>
        <button type="button" onClick={loadLookups} disabled={loading}
          className="text-xs text-brand-primary hover:underline disabled:opacity-50">
          {loading ? "Loading..." : "↻ Reload"}
        </button>
      </div>

      {lookupError && <p className="text-xs text-danger break-words">❌ {lookupError}</p>}

      <label className="text-xs text-text-muted">Student</label>
      <select className={inputCls} value={student} onChange={(e) => setStudent(e.target.value)} disabled={loading}>
        {!students.length && <option value="">No students found</option>}
        {students.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
      </select>

      <label className="text-xs text-text-muted">Term</label>
      <select className={inputCls} value={term} onChange={(e) => setTerm(e.target.value)} disabled={loading}>
        {!terms.length && <option value="">No terms found</option>}
        {terms.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
      </select>

      <p className="text-xs text-text-muted">
        Calling as: <span className="font-medium text-text-primary">{altToken ? altLabel : "app account"}</span>
      </p>

      <button type="button" onClick={runOne} disabled={running || !ready} className={primaryBtn}>
        {running ? "Running..." : "1. Get student result"}
      </button>
      <button type="button" onClick={runSweep} disabled={running || !ready} className={outlineBtn}>
        2. Sweep ALL students
      </button>
      <button type="button" onClick={runClass} disabled={running || !ready} className={outlineBtn}>
        3. Class result (same group)
      </button>

      <div className="border-t border-border-line02 pt-2.5 flex flex-col gap-2">
        <p className="text-xs font-medium text-label">Test as another user (optional)</p>
        <input className={inputCls} placeholder="username or email" value={altUser} onChange={(e) => setAltUser(e.target.value)} />
        <input className={inputCls} type="password" placeholder="password" value={altPass} onChange={(e) => setAltPass(e.target.value)} />
        <div className="flex gap-2">
          <button type="button" onClick={loginAlt} disabled={running || !altUser || !altPass} className={`${outlineBtn} flex-1`}>
            Sign in (probe only)
          </button>
          {altToken && <button type="button" onClick={clearAlt} className={`${outlineBtn} flex-1`}>Clear</button>}
        </div>
      </div>

      <div className="border-t border-border-line02 pt-2.5 flex flex-col gap-2">
        <p className="text-xs font-medium text-label">Seed scores (creates real records)</p>
        <select className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} disabled={loading}>
          {!subjects.length && <option value="">No subjects found</option>}
          {subjects.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
        </select>
        <input className={inputCls} type="number" min={0} value={score} onChange={(e) => setScore(e.target.value)}
          placeholder="score per assessment" />
        <button type="button" onClick={runSeed} disabled={running || !ready || !subject} className={outlineBtn}>
          4. Seed scores for this group
        </button>
      </div>

      <p className="text-xs text-text-muted">Tests 1–3 are read-only. Test 4 writes data. Results appear in the console.</p>
    </div>
  );
};

export default DebugStudentResult;