import { titleCase } from "@/usersDashboard/admin/features/learning/shared/utils/lessonNoteMapper";
import type {
  AssessmentTypeRaw, BulkScoresPayload, ScoreInputs, Scoresheet, ScoresheetResponse, ScoresheetSetup,
} from "../types/uploadResults";
import { cellValue } from "./scoreSheetMath";


export function toScoresheet(r: ScoresheetResponse, meta: Map<number, AssessmentTypeRaw>): Scoresheet {
  return {
    classGroup: titleCase(r.class_group.name),
    subject: titleCase(r.subject.name),
    term: titleCase(r.term.name),
    session: r.term.session,
    columns: r.assessment_types.map((t) => ({
      id: t.id,
      name: titleCase(t.name),
      max: meta.get(t.id)?.base_mark ?? null, // null → no limit shown, total can't be computed
      weight: meta.get(t.id)?.terminal_percentage ?? null,
    })),
    rows: r.students
      .map((s) => ({
        studentId: s.id,
        recordId: s.student_session_record_id,
        name: titleCase(s.student_name),
        saved: Object.fromEntries(s.scores.map((x) => [x.assessment_type, x.score])),
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export function toInputs(sheet: Scoresheet): ScoreInputs {
  return Object.fromEntries(
    sheet.rows.map((r) => [
      String(r.studentId),
      Object.fromEntries(
        sheet.columns.map((c) => [String(c.id), r.saved[c.id] == null ? "" : String(r.saved[c.id])])
      ),
    ])
  );
}

// Sends only the cells that were edited and aren't empty
export function buildPayload(
  setup: ScoresheetSetup, sheet: Scoresheet, inputs: ScoreInputs, original: ScoreInputs
): BulkScoresPayload {
  const students = sheet.rows.flatMap((r) => {
    const score = sheet.columns.flatMap((c) => {
      const now = cellValue(inputs, r.studentId, c.id).trim();
      const changed = now !== cellValue(original, r.studentId, c.id);
      return now !== "" && changed ? [{ assessment_type: c.id, score: Number(now) }] : [];
    });
    return score.length ? [{ id: r.studentId, student_session_record_id: r.recordId, score }] : [];
  });
  return [{
    subject: Number(setup.subject),
    term: Number(setup.term),
    class_group: Number(setup.classGroup),
    students,
  }];
}