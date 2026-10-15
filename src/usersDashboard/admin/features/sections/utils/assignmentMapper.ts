import type { AssignedClassResponse, ClassGroupListItem, FormTeacherAssignment } from "../types";

export function toAssignment(
  r: AssignedClassResponse,
  groups: Map<number, ClassGroupListItem>,
  users: Map<number, string>
): FormTeacherAssignment {
  const group = groups.get(r.class_group);
  return {
    id: String(r.id),
    classGroupId: r.class_group,
    teacherId: r.teacher,
    className: group?.name ?? `Class group #${r.class_group}`,
    classFormTeacher: group?.form_teacher_name ?? null,
    teacherName: users.get(r.teacher) ?? `User #${r.teacher}`,
    assignedBy: users.get(r.assigned_by) ?? `User #${r.assigned_by}`,
    assignedAt: new Date(r.date_created).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    }),
  };
}