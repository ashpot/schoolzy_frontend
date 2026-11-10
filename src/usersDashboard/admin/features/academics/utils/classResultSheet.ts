import type { ClassResultResponse, ClassSheet, SheetColumn, SheetRow } from "../types/classResult";

// Assumption: every subject is marked out of 100 (matches the Figma: 4 subjects = 400)
export const MARKS_PER_SUBJECT = 100;

const num = (v: unknown, fallback = 0): number => {
  const n = Number(v);
  return v === null || v === undefined || v === "" || Number.isNaN(n) ? fallback : n;
};

export function buildClassSheet(raw: ClassResultResponse): ClassSheet {
  const columns = new Map<string, SheetColumn>();

  const rows: SheetRow[] = raw.students.map((s) => {
    const scores: Record<string, number> = {};
    for (const sub of s.subjects ?? []) {
      const key = String(sub.subject_id ?? sub.subject);
      // The backend can repeat a subject (one row per teacher): keep the first, never sum
      if (!(key in scores)) scores[key] = num(sub.total);
      if (!columns.has(key)) columns.set(key, { key, name: String(sub.subject ?? "Subject") });
    }
    const offered = num(s.summary.subjects_offered);
    return {
      id: String(s.student.id),
      name: s.student.full_name,
      admissionNo: s.student.admission_number ?? "",
      photo: s.student.photo ?? "",
      scores,
      subjectsOffered: offered,
      marksObtainable: offered * MARKS_PER_SUBJECT,
      total: num(s.summary.total),
      average: num(s.summary.average),
      grade: s.summary.grade ?? "",
      position: s.summary.class_position ?? null,
      passedAll: offered > 0 && num(s.performance?.failed_subjects) === 0,
    };
  });

  const withSubjects = rows.filter((r) => r.subjectsOffered > 0);
  const top = rows.reduce<SheetRow | null>((best, r) => (!best || r.total > best.total ? r : best), null);

  return {
    meta: {
      className: raw.class.name,
      section: raw.class.section,
      termName: raw.term.name,
      session: raw.term.session,
      published: Boolean(raw.term.published),
    },
    columns: [...columns.values()].sort((a, b) => a.name.localeCompare(b.name)),
    rows,
    stats: {
      students: num(raw.statistics?.students, rows.length),
      classAverage: num(raw.statistics?.class_average),
      topStudent: top && top.total > 0 ? top.name : null,
      passRate: withSubjects.length
        ? Math.round((withSubjects.filter((r) => r.passedAll).length / withSubjects.length) * 100)
        : null,
    },
  };
}