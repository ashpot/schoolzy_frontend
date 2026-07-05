import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, CheckSquare } from "lucide-react";
import { slideFromLeft, slideFromRight } from "../animations/variants";
import { useSubjectTeachersList, useAssignSubjectTeacher, useDeleteSubjectTeacher } from "../hooks/useAcademics";
import { mockTeachers, mockClasses, mockSubjects } from "../data/mockData";
import type { SubjectTeacherAssignment, SchoolSection } from "../types";
import AcademicsListPanel from "../components/shared/AcademicsListPanel";
import DeleteButton from "../components/shared/DeleteButton";
import PageHeader from "@/shared/ui/PageHeader";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormSelect from "@/shared/ui/FormSelect";
import { fieldFadeUp } from "@/shared/utils/animations";
import FormHeader from "../components/shared/FormHeader";

const AVAILABLE_SUBJECTS = mockSubjects.slice(0, 16);

const SubjectTeachersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<SchoolSection | "All">("All");

  const [teacherId, setTeacherId] = useState("");
  const [classId, setClassId] = useState("");
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [teacherError, setTeacherError] = useState("");
  const [classError, setClassError] = useState("");
  const [subjectError, setSubjectError] = useState("");

  const { data, isLoading } = useSubjectTeachersList(page, search, section);
  const assignMutation = useAssignSubjectTeacher();
  const deleteMutation = useDeleteSubjectTeacher();

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
    setSubjectError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!teacherId) { setTeacherError("Please select a teacher"); valid = false; }
    if (!classId) { setClassError("Please select a class"); valid = false; }
    if (selectedSubjectIds.length === 0) { setSubjectError("Select at least one subject"); valid = false; }
    if (!valid) return;

    const teacher = mockTeachers.find((t) => t.value === teacherId)!;
    const cls = mockClasses.find((c) => c.value === classId)!;
    const selectedSubjects = AVAILABLE_SUBJECTS.filter((s) => selectedSubjectIds.includes(s.id));

    assignMutation.mutate(
      {
        teacherId,
        teacherName: teacher.label,
        classId,
        className: cls.label,
        subjectIds: selectedSubjectIds,
        subjectNames: selectedSubjects.map((s) => s.subjectName),
      },
      {
        onSuccess: () => {
          setTeacherId("");
          setClassId("");
          setSelectedSubjectIds([]);
        },
      }
    );
  };

  const columns = [
    {
      key: "num",
      header: "#",
      className: "w-12",
      render: (_: SubjectTeacherAssignment, i: number) => (
        <span className="text-text-muted text-xs">{String((page - 1) * 8 + i + 1).padStart(2, "0")}</span>
      ),
    },
    {
      key: "class",
      header: "Class",
      render: (row: SubjectTeacherAssignment) => <span className="font-semibold text-text-nav">{row.class}</span>,
    },
    {
      key: "subjectName",
      header: "Subject Name",
      render: (row: SubjectTeacherAssignment) => <span className="font-medium">{row.subjectName}</span>,
    },
    {
      key: "teacher",
      header: "Teacher",
      render: (row: SubjectTeacherAssignment) => <span className="text-text-secondary">{row.teacher}</span>,
    },
    {
      key: "elective",
      header: "Elective",
      render: (row: SubjectTeacherAssignment) => <span className="text-text-muted text-xs">{row.elective}</span>,
    },
    {
      key: "action",
      header: "Action",
      className: "text-right",
      render: (row: SubjectTeacherAssignment) => (
        <div className="flex justify-end">
          <DeleteButton onConfirm={() => deleteMutation.mutate(row.id)} isLoading={deleteMutation.isPending} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Subject Teachers"
        subtitle="Assign teachers to subjects across classes"
        addLabel="Add Subject"
        showAdd={false}
        freeStyleButton={
          <Button
            className="border-brand-primary/20 bg-brand-primary/5"
            variant="outline"
            leftIcon={<Users className="w-4 h-4 text-brand-primary"/>}>
            <span className="text-sm text-brand-primary font-lato">
            {data?.total ?? 0} assignments active
          </span>
          </Button>
        }
      />

      <div className="grid xl:grid-cols-[400px_1fr] gap-5">
        {/* Form */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden" animate="show"
          className="bg-white rounded-2xl card-shadow h-fit"
        >
          <FormHeader
            title="Assign Subject"
            icon={<CheckSquare className="w-3.5 h-3.5 text-brand-primary" />}
          />
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-5">
            {/* Teacher */}
            <FormSelect
              label="Teacher"
              name="teacher"
              value={teacherId}
              onChange={(e) => { setTeacherId(e.target.value); setTeacherError(""); }}
              error={teacherError}
              options={mockTeachers}
              placeholder="Select teacher"
            />

            {/* Class */}
            <FormSelect
              label="Class"
              name="class"
              value={classId}
              onChange={(e) => { setClassId(e.target.value); setClassError(""); }}
              error={classError}
              options={mockClasses}
              placeholder="Select class"
            />

            {/* Subject checkbox grid */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-label leading-4.5 tracking-wide">Subjects</label>
                {selectedSubjectIds.length > 0 && (
                  <span className="text-[11px] font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                    {selectedSubjectIds.length} Selected
                  </span>
                )}
              </div>

              <div className="rounded-xl border border-border-line02 bg-bg-input p-2 grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto">
                {AVAILABLE_SUBJECTS.map((subj) => {
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

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setSelectedSubjectIds(AVAILABLE_SUBJECTS.map((s) => s.id))} className="text-xs text-brand-primary font-semibold hover:underline">
                  Select all
                </button>
                <span className="text-border-line02">·</span>
                <button type="button" onClick={() => setSelectedSubjectIds([])} className="text-xs text-text-muted font-semibold hover:text-text-secondary">
                  Clear
                </button>
              </div>
              {subjectError && <p className="text-xs text-danger">{subjectError}</p>}
            </div>
            <motion.div variants={fieldFadeUp}>
              <SubmitButton
                label="Assign Subjects"
                isLoading={assignMutation.isPending} />
            </motion.div>
          </form>
        </motion.div>

        {/* List */}
        <motion.div variants={slideFromRight} initial="hidden" animate="show">
          <AcademicsListPanel
            title="Assigned Subjects"
            count={data?.total ?? 0}
            columns={columns}
            data={data?.items ?? []}
            total={data?.total ?? 0}
            page={page}
            search={search}
            section={section}
            isLoading={isLoading}
            onSearch={setSearch}
            onPageChange={setPage}
            onSectionChange={setSection}
            searchPlaceholder="Search..."
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectTeachersPage;