import type {
  RawStudentResult, RawUser, StudentResult, StudentSearchItem, SubjectRow,
} from "../types/studentResult";

const num = (v: unknown): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};
const str = (v: unknown): string => (v === null || v === undefined ? "" : String(v));

export function mapSearchStudent(u: RawUser): StudentSearchItem {
  const cg = u.class_group;
  const fullName = `${u.first_name} ${u.last_name}`.trim();
  return {
    id: String(u.id),
    fullName,
    admissionNo: str(u.admission_number),
    className: cg && typeof cg === "object" ? cg.name : "",
    photo: str(u.photo),
    haystack: [fullName, u.username, u.admission_number].filter(Boolean).join(" ").toLowerCase(),
  };
}

export function mapStudentResult(raw: RawStudentResult): StudentResult {
  const assessments = (raw.assessment_types ?? []).map((a) => ({
    id: a.id, name: a.name, code: a.code, percentage: Number(a.terminal_percentage) || 0,
  }));

  const subjects: SubjectRow[] = (raw.subjects ?? []).map((s, i) => ({
    key: `${str(s.subject_id)}-${i}`, // the backend can repeat a subject id, so the index keeps keys unique
    subjectId: num(s.subject_id),
    name: str(s.subject),
    teacher: str(s.teacher),
    scores: Object.fromEntries(
      assessments.map((a) => [a.code, num(s[a.code] ?? s[a.code.toLowerCase()])])
    ),
    total: num(s.total),
    average: num(s.average),
    grade: str(s.grade),
    remark: str(s.remark),
    position: num(s.position),
  }));

  return {
    student: {
      id: String(raw.student.id),
      fullName: raw.student.full_name,
      admissionNo: str(raw.student.admission_number),
      photo: str(raw.student.photo),
      gender: str(raw.student.gender),
      className: str(raw.student.class_group),
      section: str(raw.student.section),
    },
    term: {
      id: String(raw.term.id), name: raw.term.name,
      session: raw.term.session, published: Boolean(raw.term.published),
    },
    assessments,
    summary: {
      subjectsOffered: Number(raw.summary?.subjects_offered) || 0,
      total: num(raw.summary?.total),
      average: num(raw.summary?.average),
      grade: str(raw.summary?.grade),
      remark: str(raw.summary?.remark),
      position: num(raw.summary?.class_position),
      studentsCount: num(raw.summary?.students_count),
    },
    comments: {
      formTeacher: {
        comment: str(raw.comments?.form_teacher?.comment),
        teacher: str(raw.comments?.form_teacher?.teacher),
      },
      headTeacher: {
        comment: str(raw.comments?.head_teacher?.comment),
        teacher: str(raw.comments?.head_teacher?.teacher),
      },
    },
    subjects,
    performance: {
      passed: Number(raw.performance?.passed_subjects) || 0,
      failed: Number(raw.performance?.failed_subjects) || 0,
      passRate: Number(raw.performance?.pass_rate) || 0,
    },
    generatedAt: str(raw.generated?.generated_at),
  };
}