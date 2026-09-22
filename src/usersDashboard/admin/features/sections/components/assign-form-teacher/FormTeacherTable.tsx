import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Search, Trash2 } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { getClassBadgeColor } from "../../utils/colors";
import type { FormTeacherAssignment } from "../../types";
import { useDeleteAssignment } from "../../hooks/useSections";
import NumberSpan from "../shared/NumberSpan";
import EditModal, { type EditField } from "@/shared/modal/EditModal";
import EditButton from "@/shared/ui/EditButton";
import DeleteConfirmModal from "../../../users/components/shared/DeleteConfirmModal";

interface Props { assignments: FormTeacherAssignment[]; onDelete: (id: string) => void; }

const PAGE_SIZE = 8;
const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) => name.replace(/^(Mrs?|Ms)\.?\s/, "").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const ASSIGNMENT_EDIT_FIELDS: EditField<FormTeacherAssignment>[] = [
  { key: "className", label: "Class" },
  { key: "teacherName", label: "Teacher Name" },
  { key: "subject", label: "Subject" },
];

export default function FormTeacherTable({ assignments, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);
  const [editingAssignment, setEditingAssignment] = useState<FormTeacherAssignment | null>(null);
  const [pendingDelete, setPendingDelete] = useState<FormTeacherAssignment | null>(null);

  const deleteMutation = useDeleteAssignment();

  const filtered   = assignments.filter((a) => a.className.toLowerCase().includes(search.toLowerCase()) || a.teacherName.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleConfirmDelete = () => {
    if (pendingDelete) {
      deleteMutation.mutate(pendingDelete.id, {
        onSuccess: () => {
          onDelete(pendingDelete.id);
          setPendingDelete(null);
        },
      });
    }
  };

  const handleSaveEdit = (updated: FormTeacherAssignment) => {
    // TODO: Replace with actual API call e.g. api.patch(`/academics/assigned-classes/${updated.id}/`, updated)
    console.log("Saving edited form teacher assignment:", updated);
    setEditingAssignment(null);
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <UserCheck size={16} className="text-brand-primary" />
          <h2 className="section-title">Class Form Teachers</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-semibold">{assignments.length}</span>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search assignments..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-44 transition-all" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-border-line02">
              {["#", "Class", "Teacher", "Assigned By", "Actions"].map((h) => (
                <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show" key={page}>
            {paginated.map((a, i) => (
              <motion.tr key={a.id} variants={rowVariant} className="border-b border-border-line02 hover:bg-gray-50/50">
                <td className="py-3.5 px-4 text-sm text-text-muted">
                  <NumberSpan number={(page - 1) * PAGE_SIZE + i + 1}/>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getClassBadgeColor(a.className)}`}>
                    {a.className}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex-center text-xs font-bold shrink-0 ${avatarColor(a.teacherName)}`}>
                      {getInitials(a.teacherName)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary leading-tight">{a.teacherName}</p>
                      <p className="text-xs text-text-muted">{a.subject}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <p className="text-sm font-medium text-text-primary">{a.assignedBy}</p>
                  <p className="text-xs text-text-muted">{a.assignedAt}</p>
                </td>
                <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <EditButton onClick={() => setEditingAssignment(a)} />
                    <button
                      type="button"
                      onClick={() => setPendingDelete(a)}
                      disabled={deleteMutation.isPending}
                      className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} assignments</p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 flex-center rounded-lg text-sm hover:bg-gray-100 disabled:opacity-30">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 flex-center rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-brand-primary text-white" : "hover:bg-gray-100 text-text-secondary"}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-7 h-7 flex-center rounded-lg text-sm hover:bg-gray-100 disabled:opacity-30">›</button>
          </div>
        )}
      </div>

      <EditModal<FormTeacherAssignment>
        isOpen={editingAssignment !== null}
        title="Assignment"
        fields={ASSIGNMENT_EDIT_FIELDS}
        initialData={editingAssignment}
        onSave={handleSaveEdit}
        onCancel={() => setEditingAssignment(null)}
      />

      <DeleteConfirmModal
        isOpen={pendingDelete !== null}
        itemLabel={pendingDelete ? `${pendingDelete.teacherName} — ${pendingDelete.className}` : ""}
        isDeleting={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}