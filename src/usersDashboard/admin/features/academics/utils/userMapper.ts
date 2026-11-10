import { formatDate, titleCase } from "@/usersDashboard/admin/features/learning/shared/utils/lessonNoteMapper";
import type { ScoreFilters, ScoreResponse, ScoreRow, UserLiteResponse } from "../types/manageScore";

// Safety net: correct even if the server ignores a filter param
export const matchesFilters = (r: ScoreResponse, f: ScoreFilters) =>
  String(r.class_group) === f.classGroupId &&
  String(r.term) === f.termId &&
  String(r.subject) === f.subjectId &&
  String(r.assessment_type) === f.assessmentTypeId;

export function toScoreRows(raw: ScoreResponse[], users: UserLiteResponse[]): ScoreRow[] {
  const byId = new Map(users.map((u) => [u.id, u]));
  const nameOf = (id: number) => {
    const u = byId.get(id);
    return u ? titleCase(`${u.first_name} ${u.last_name}`.trim()) : "";
  };

  return raw
    .map((r) => ({
      id: r.id,
      studentId: r.user,
      recordId: r.student_session_record,
      fullName: nameOf(r.user) || "Unknown student",
      admissionNumber: byId.get(r.user)?.admission_number ?? "",
      addedBy: nameOf(r.added_by) || "—",
      dateUploaded: formatDate(r.date_added),
      score: r.score,
    }))
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
}