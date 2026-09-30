import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { slideFromLeft, slideFromRight } from "../animations/variants";
import type { SubjectTeacherAssignment } from "../types";
import AcademicsListPanel from "../components/shared/AcademicsListPanel";
import DeleteButton from "../components/shared/DeleteButton";
import EditModal, { type EditField } from "@/shared/modal/EditModal";
import PageHeader from "@/shared/ui/PageHeader";
import Button from "@/shared/ui/Button";
import EditButton from "@/shared/ui/EditButton";
import SubjectAssignForm from "../components/subject-teachers/SubjectAssignForm";

const ASSIGNMENT_EDIT_FIELDS: EditField<SubjectTeacherAssignment>[] = [
  { key: "class", label: "Class" },
  { key: "subjectName", label: "Subject Name" },
  { key: "teacher", label: "Teacher" },
];

const PAGE_SIZE = 8;

const SubjectTeachersPage: React.FC = () => {
  // No GET endpoint exists for this resource yet — table is session-only,
  // populated purely from what's been assigned since the page loaded.
  const [assignments, setAssignments] = useState<SubjectTeacherAssignment[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingAssignment, setEditingAssignment] = useState<SubjectTeacherAssignment | null>(null);

  const handleAdd = (rows: SubjectTeacherAssignment[]) => {
    setAssignments((prev) => [...rows, ...prev]);
  };

  const handleDelete = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSaveEdit = (updated: SubjectTeacherAssignment) => {
    // TODO: no PATCH endpoint for this resource in the doc yet
    setAssignments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setEditingAssignment(null);
  };

  const filtered = assignments.filter(
    (a) =>
      a.class.toLowerCase().includes(search.toLowerCase()) ||
      a.subjectName.toLowerCase().includes(search.toLowerCase()) ||
      a.teacher.toLowerCase().includes(search.toLowerCase())
  );
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    {
      key: "num",
      header: "#",
      className: "w-12",
      render: (_: SubjectTeacherAssignment, i: number) => (
        <span className="text-text-muted text-xs">{String((page - 1) * PAGE_SIZE + i + 1).padStart(2, "0")}</span>
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
      render: (row: SubjectTeacherAssignment) => (
        <span className={`text-xs font-medium ${row.elective === "Yes" ? "text-brand-primary" : "text-text-muted"}`}>
          {row.elective}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      className: "text-right",
      render: (row: SubjectTeacherAssignment) => (
        <div className="flex justify-end items-center gap-1">
          <EditButton onClick={() => setEditingAssignment(row)} />
          <DeleteButton onConfirm={() => handleDelete(row.id)} />
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
          <Button className="border-brand-primary/20 bg-brand-primary/5" variant="outline" leftIcon={<Users className="w-4 h-4 text-brand-primary" />}>
            <span className="text-sm text-brand-primary font-lato">{total} assignments this session</span>
          </Button>
        }
      />

      <div className="grid xl:grid-cols-[400px_1fr] gap-5">
        <motion.div variants={slideFromLeft} initial="hidden" animate="show" className="bg-white rounded-2xl card-shadow h-fit">
          <SubjectAssignForm onSuccess={handleAdd} />
        </motion.div>

        <motion.div variants={slideFromRight} initial="hidden" animate="show">
          <AcademicsListPanel
            title="Assigned Subjects"
            count={total}
            columns={columns}
            data={paged}
            total={total}
            page={page}
            search={search}
            section="All"
            isLoading={false}
            onSearch={(v) => { setSearch(v); setPage(1); }}
            onPageChange={setPage}
            onSectionChange={() => {}}
            searchPlaceholder="Search..."
          />
        </motion.div>
      </div>

      <EditModal<SubjectTeacherAssignment>
        isOpen={editingAssignment !== null}
        title="Assignment"
        fields={ASSIGNMENT_EDIT_FIELDS}
        initialData={editingAssignment}
        onSave={handleSaveEdit}
        onCancel={() => setEditingAssignment(null)}
      />
    </div>
  );
};

export default SubjectTeachersPage;