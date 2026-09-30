import { useState } from "react";
import { CheckSquare } from "lucide-react";
import {
  useClassGroupsList,
  useTeacherOptionsList,
  useSectionsList,
  useSubjectsBySection,
  useAssignSubjectTeacher,
} from "../../hooks/useAcademics";
import type { SubjectTeacherAssignment } from "../../types";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../shared/FormHeader";

interface TeacherOption {
  id: number;
  first_name: string;
  last_name: string;
}

interface Props {
  onSuccess: (rows: SubjectTeacherAssignment[]) => void;
}

export default function SubjectAssignForm({ onSuccess }: Props) {
  const [classGroupId, setClassGroupId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [classGroupError, setClassGroupError] = useState("");
  const [teacherError, setTeacherError] = useState("");
  const [subjectError, setSubjectError] = useState("");

  const { data: classGroups, isLoading: groupsLoading } = useClassGroupsList();
  const { data: teachers, isLoading: teachersLoading } = useTeacherOptionsList();
  const { data: sections } = useSectionsList();

  const selectedGroup = classGroups?.find((g) => String(g.id) === classGroupId);
  const sectionId = selectedGroup
    ? sections?.find((s) => s.title.toUpperCase() === selectedGroup.section_name.toUpperCase())?.id ?? null
    : null;

  const { data: subjects, isLoading: subjectsLoading } = useSubjectsBySection(sectionId);
  const assignMutation = useAssignSubjectTeacher();

  const classGroupOptions = (classGroups ?? []).map((g) => ({ value: String(g.id), label: g.name }));

  const teacherOptions = (teachers ?? []).map((t: TeacherOption) => ({
    value: String(t.id),
    label: `${t.first_name} ${t.last_name}`,
  }));

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
    setSubjectError("");
  };

  const handleClassGroupChange = (value: string) => {
    setClassGroupId(value);
    setClassGroupError("");
    setSelectedSubjectIds([]); // subjects depend on the section — clear stale picks
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!classGroupId) { setClassGroupError("Please select a class group"); valid = false; }
    if (!teacherId) { setTeacherError("Please select a teacher"); valid = false; }
    if (selectedSubjectIds.length === 0) { setSubjectError("Select at least one subject"); valid = false; }
    if (!valid) return;

    const teacher = teachers?.find((t: TeacherOption) => String(t.id) === teacherId);
    const className = selectedGroup?.name ?? "";
    const teacherName = teacher ? `${teacher.first_name} ${teacher.last_name}` : "";
    const chosenSubjects = (subjects ?? []).filter((s) => selectedSubjectIds.includes(s.id));

    assignMutation.mutate(
      {
        teacherId,
        class_group: Number(classGroupId),
        subjects: selectedSubjectIds.map(Number),
      },
      {
        onSuccess: () => {
          // Response only gives { message, total_assigned } — build the
          // display rows from what was actually selected, one row per subject.
          const newRows: SubjectTeacherAssignment[] = chosenSubjects.map((subj) => ({
            id: `${Date.now()}-${subj.id}`,
            class: className,
            subjectName: subj.subjectName,
            teacher: teacherName,
            elective: subj.elective ? "Yes" : "No",
          }));
          onSuccess(newRows);

          setTeacherId("");
          setClassGroupId("");
          setSelectedSubjectIds([]);
        },
      }
    );
  };

  return (
    <>
      <FormHeader title="Assign Subject" icon={<CheckSquare className="w-3.5 h-3.5 text-brand-primary" />} />
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-5">
        <FormSelect
          name="classGroup"
          label="Class group"
          value={classGroupId}
          onChange={(e) => handleClassGroupChange(e.target.value)}
          error={classGroupError}
          options={classGroupOptions}
          isLoading={groupsLoading}
          placeholder={groupsLoading ? "Loading class groups..." : "Select class group"}
        />

        <FormSelect
          name="teacher"
          label="Teacher"
          value={teacherId}
          onChange={(e) => { setTeacherId(e.target.value); setTeacherError(""); }}
          error={teacherError}
          options={teacherOptions}
          isLoading={teachersLoading}
          placeholder={teachersLoading ? "Loading teachers..." : "Select teacher"}
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-label leading-4.5 tracking-wide">Subjects</label>
            {selectedSubjectIds.length > 0 && (
              <span className="text-[11px] font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                {selectedSubjectIds.length} Selected
              </span>
            )}
          </div>

          {!classGroupId ? (
            <p className="text-xs text-text-muted px-2 py-3 text-center">Select a class group to see its subjects</p>
          ) : subjectsLoading ? (
            <p className="text-xs text-text-muted px-2 py-3 text-center">Loading subjects…</p>
          ) : (subjects ?? []).length === 0 ? (
            <p className="text-xs text-text-muted px-2 py-3 text-center">No subjects found for this class group's section</p>
          ) : (
            <div className="rounded-xl border border-border-line02 bg-bg-input p-2 grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto">
              {(subjects ?? []).map((subj) => {
                const isChecked = selectedSubjectIds.includes(subj.id);
                return (
                  <button
                    type="button"
                    key={subj.id}
                    onClick={() => toggleSubject(subj.id)}
                    className={`flex items-start gap-2 px-2.5 py-2 rounded-lg text-left transition-all ${
                      isChecked
                        ? "bg-brand-primary/10 border border-brand-primary/30"
                        : "bg-white border border-border-line02 hover:border-brand-primary/30"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 mt-0.5 rounded shrink-0 flex items-center justify-center border transition-colors ${isChecked ? "bg-brand-primary border-brand-primary" : "border-border-line02 bg-white"}`}>
                      {isChecked && (
                        <svg className="w-2 h-2 text-white" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className={`text-[11px] font-semibold font-lato leading-tight ${isChecked ? "text-brand-primary" : "text-text-nav"}`}>
                        {subj.subjectName}
                      </p>
                      <p className="text-[10px] text-text-muted font-mono">{subj.code}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {(subjects ?? []).length > 0 && (
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setSelectedSubjectIds((subjects ?? []).map((s) => s.id))} className="text-xs text-brand-primary font-semibold hover:underline">
                Select all
              </button>
              <span className="text-border-line02">·</span>
              <button type="button" onClick={() => setSelectedSubjectIds([])} className="text-xs text-text-muted font-semibold hover:text-text-secondary">
                Clear
              </button>
            </div>
          )}
          {subjectError && <p className="text-xs text-danger">{subjectError}</p>}
        </div>

        <SubmitButton label="Assign Subjects" isLoading={assignMutation.isPending} />
      </form>
    </>
  );
}