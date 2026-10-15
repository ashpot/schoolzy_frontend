import type { FileType, LessonNote, LessonNoteResponse } from "../../types";

// Backend casing is inconsistent ("mathematics" vs "Junior secondary school one a")
export const titleCase = (s?: string | null) =>
  s ? s.toLowerCase().replace(/(^|\s)(\S)/g, (_, sp: string, ch: string) => sp + ch.toUpperCase()) : "";

export function fileTypeFromUrl(url: string): FileType {
  const ext = url.split("?")[0].split(".").pop()?.toUpperCase();
  const known: FileType[] = ["PDF", "DOC", "DOCX", "PPT", "PPTX"];
  return known.find((t) => t === ext) ?? "FILE";
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export function toLessonNote(r: LessonNoteResponse, userMap: Map<number, string>): LessonNote {
  return {
    id: String(r.id),
    title: r.title,
    subjectId: r.subject,
    subject: titleCase(r.subject_name) || "—",
    classGroupId: r.class_group,
    class: titleCase(r.class_group_name),
    teacherId: r.teacher,
    teacher: userMap.get(r.teacher) ?? "Unknown",
    dateUploaded: formatDate(r.date_added),
    fileUrl: r.note,
    fileType: r.note ? fileTypeFromUrl(r.note) : null,
    description: r.content ?? "",
    status: r.status,
  };
}