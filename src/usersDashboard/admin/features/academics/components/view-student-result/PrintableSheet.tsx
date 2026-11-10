import React from "react";
import type { PsychomotiveScore, ResultComments, SchoolProfile, StudentResult } from "../../types/studentResult";
import { fmt, formatLongDate, gradeBadge, ordinal } from "../../utils/resultFormat";
import PrintableGradeScale from "./PrintableGradeScale";
import PrintableLetterhead from "./PrintableLetterHead";
import { SCORE_REMARKS } from "../../utils/studentResultConstant";

interface Props {
  result: StudentResult;
  school?: SchoolProfile;
  psychomotive: PsychomotiveScore[];
  comments: ResultComments;
}

const head = "bg-text-nav text-white";
const cell = "px-3 py-2";

const PrintableSheet: React.FC<Props> = ({ result, school, psychomotive, comments }) => {
  const { student, term, summary, assessments, subjects, performance } = result;
  const position = summary.position === null ? "—"
    : `${ordinal(summary.position)}${summary.studentsCount ? ` out of ${summary.studentsCount}` : ""}`;

  const info = [
    ["Student Name", student.fullName], ["Admission No.", student.admissionNo || "—"],
    ["Class", student.className || "—"], ["Section", student.section || "—"],
    ["Term", term.name], ["Session", term.session],
    ["Position in Class", position],
    ["Overall Grade", [summary.grade, summary.remark].filter(Boolean).join(" — ") || "—"],
  ];

  const signature = (title: string, text: string, name: string, sigLabel: string) => (
    <div className="border border-border-line02 rounded-xl p-5 print-avoid-break">
      <h4 className="text-xs font-semibold text-text-muted tracking-wide mb-2">{title}</h4>
      <p className="text-sm italic text-text-secondary min-h-6">{text || "No comment added."}</p>
      <div className="flex items-end justify-between mt-6 pt-3 border-t border-border-line02">
        <span className="text-xs text-text-muted">{sigLabel}{name ? ` — ${name}` : ""}</span>
        <div className="w-40 border-b border-text-muted" />
      </div>
    </div>
  );

  return (
    <div className="px-8 py-8 flex flex-col gap-6 text-text-primary">
      <PrintableLetterhead school={school} />

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 bg-bg-input rounded-xl p-5 text-sm print-avoid-break">
        {info.map(([label, value]) => (
          <p key={label}><span className="text-text-muted">{label}: </span><span className="font-medium capitalize">{value}</span></p>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 tracking-wide">ACADEMIC PERFORMANCE</h4>
        <table className="w-full text-sm border border-border-line02">
          <thead className={head}>
            <tr>
              <th className={`${cell} text-left`}>#</th>
              <th className={`${cell} text-left`}>Subject</th>
              {assessments.map((a) => <th key={a.id} className={`${cell} text-left`}>{a.name} /{a.percentage}</th>)}
              <th className={`${cell} text-left`}>Total</th>
              <th className={`${cell} text-left`}>Grade</th>
              <th className={`${cell} text-left`}>Position</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => (
              <tr key={s.key} className="border-t border-border-line02">
                <td className={cell}>{i + 1}</td>
                <td className={`${cell} font-medium capitalize`}>{s.name}</td>
                {assessments.map((a) => <td key={a.id} className={cell}>{fmt(s.scores[a.code])}</td>)}
                <td className={`${cell} font-semibold`}>{fmt(s.total)}</td>
                <td className={cell}><span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeBadge(s.grade)}`}>{s.grade || "—"}</span></td>
                <td className={cell}>{ordinal(s.position)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-brand-primary bg-blue-50 font-semibold">
              <td className={cell} colSpan={2 + assessments.length}>Summary</td>
              <td className={`${cell} text-brand-primary`}>{fmt(summary.total)}</td>
              <td className={`${cell} text-brand-primary`} colSpan={2}>
                Avg: {summary.average === null ? "—" : `${fmt(summary.average)}%`} · {summary.grade || "—"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-6 print-avoid-break">
        <div>
          <h4 className="text-sm font-semibold mb-3 tracking-wide">PSYCHOMOTIVE EVALUATION</h4>
          <table className="w-full text-sm border border-border-line02">
            <thead className={head}>
              <tr>
                <th className={`${cell} text-left`}>Skill</th>
                <th className={`${cell} text-left`}>Score /5</th>
                <th className={`${cell} text-left`}>Remark</th>
              </tr>
            </thead>
            <tbody>
              {psychomotive.map((p) => (
                <tr key={p.skill} className="border-t border-border-line02">
                  <td className={cell}>{p.skill}</td>
                  <td className={`${cell} font-semibold text-brand-primary`}>{p.score || "—"}</td>
                  <td className={cell}>{SCORE_REMARKS[p.score] ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 tracking-wide">PERFORMANCE SUMMARY</h4>
          <div className="border border-border-line02 rounded-lg divide-y divide-border-line02 text-sm">
            {[["Subjects Offered", summary.subjectsOffered], ["Subjects Passed", performance.passed],
              ["Subjects Failed", performance.failed], ["Pass Rate", `${fmt(performance.passRate)}%`]].map(([l, v]) => (
              <div key={l as string} className="flex items-center justify-between px-3 py-2.5">
                <span className="text-text-secondary">{l}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {signature("CLASS TEACHER'S COMMENT", comments.classTeacherComment, result.comments.formTeacher.teacher, "Class Teacher's Signature")}
      {signature("PRINCIPAL'S COMMENT", comments.principalComment, result.comments.headTeacher.teacher, "Principal's Signature")}

      <PrintableGradeScale />

      <p className="text-xs text-text-muted text-center pt-4 border-t border-border-line02">
        Generated on {formatLongDate(result.generatedAt)} · {school?.name ?? "School"} Official Result Sheet
        {!term.published && " · PROVISIONAL (not yet published)"}
      </p>
    </div>
  );
};

export default PrintableSheet;