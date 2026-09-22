import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Search, CheckCircle, EyeOff, Trash2 } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import type { SectionListItem } from "../../types";
import { useDeleteSection } from "../../hooks/useSections";
import NumberSpan from "../shared/NumberSpan";
import EditModal, { type EditField } from "@/shared/modal/EditModal";
import EditButton from "@/shared/ui/EditButton";
import DeleteConfirmModal from "../../../users/components/shared/DeleteConfirmModal";

interface Props { sections: SectionListItem[]; }

const PAGE_SIZE = 8;

const SECTION_EDIT_FIELDS: EditField<SectionListItem>[] = [
  { key: "title", label: "Title" },
  { key: "code", label: "Code" },
];

export default function SectionsTable({ sections }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingSection, setEditingSection] = useState<SectionListItem | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SectionListItem | null>(null);

  const deleteMutation = useDeleteSection();

  const filtered = sections.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleConfirmDelete = () => {
    if (pendingDelete) {
      deleteMutation.mutate(String(pendingDelete.id), {
        onSuccess: () => setPendingDelete(null),
      });
    }
  };

  const handleSaveEdit = (updated: SectionListItem) => {
    // TODO: Replace with actual API call e.g. api.patch(`/sections/sections/${updated.id}/`, updated)
    console.log("Saving edited section:", updated);
    setEditingSection(null);
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-brand-primary" />
          <h2 className="section-title">Sections List</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-semibold">{sections.length}</span>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search sections..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-44 transition-all" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-border-line02">
              {["#", "Title", "Code", "Show Position", "Actions"].map((h) => (
                <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show" key={page}>
            {paginated.map((s, i) => (
              <motion.tr key={s.id} variants={rowVariant} className="border-b border-border-line02 hover:bg-gray-50/50">
                <td className="py-3.5 px-4 text-sm text-text-muted">
                  <NumberSpan number={(page - 1) * PAGE_SIZE + i + 1} />
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-brand-primary shrink-0" />
                    <span className="text-sm font-medium text-text-primary">{s.title}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-mono font-semibold">{s.code}</span>
                </td>
                <td className="py-3.5 px-4">
                  {s.show_position_in_result
                    ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100"><CheckCircle size={12} />Yes</span>
                    : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium border border-gray-200"><EyeOff size={12} />No</span>}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1">
                    <EditButton onClick={() => setEditingSection(s)} />
                    <button
                      type="button"
                      onClick={() => setPendingDelete(s)}
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

      {sections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-body-small text-text-secondary">No sections yet</p>
        </div>
      )}

      <div className="flex items-center justify-between px-5 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} sections</p>
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

      <EditModal<SectionListItem>
        isOpen={editingSection !== null}
        title="Section"
        fields={SECTION_EDIT_FIELDS}
        initialData={editingSection}
        onSave={handleSaveEdit}
        onCancel={() => setEditingSection(null)}
      />

      <DeleteConfirmModal
        isOpen={pendingDelete !== null}
        itemLabel={pendingDelete?.title ?? ""}
        isDeleting={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}