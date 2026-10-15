import type { LessonNote, LessonNoteFilters } from "../../types";

export const EMPTY_FILTERS: LessonNoteFilters = { classGroup: "", subject: "", teacher: "", search: "" };

// Filters compare ids (not labels), so backend casing never matters
export function filterLessonNotes(notes: LessonNote[], f: LessonNoteFilters): LessonNote[] {
  const q = f.search.trim().toLowerCase();
  return notes.filter(
    (n) =>
      (!f.classGroup || String(n.classGroupId) === f.classGroup) &&
      (!f.subject || String(n.subjectId) === f.subject) &&
      (!f.teacher || String(n.teacherId) === f.teacher) &&
      (!q || n.title.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q))
  );
}