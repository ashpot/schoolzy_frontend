import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import type { FieldValues } from "react-hook-form";
import { cn } from "@/shared/utils/cn";
import { slideFromRight, listStagger, rowFadeUp } from "../../animations/variants";
import type { ColumnDef } from "../../types";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditModal, { type EditField } from "@/shared/modal/EditModal";
import EditButton from "@/shared/ui/EditButton";

interface UserListPanelProps<T extends FieldValues & { id: string }> {
  title: string;
  count: number;
  searchPlaceholder: string;
  columns: ColumnDef<T>[];
  data: T[];
  total: number;
  page: number;
  perPage: number;
  isLoading?: boolean;
  isDeleting?: boolean;
  isSaving?: boolean;
  getRowLabel?: (row: T) => string;
  editFields?: EditField<T>[];
  editTitle?: string;
  onSearch: (q: string) => void;
  onPageChange: (p: number) => void;
  onDelete: (id: string) => void;
  onEdit?: (updated: T) => void;
}

function UserListPanel<T extends FieldValues & { id: string }>({
  title, count, searchPlaceholder, columns,
  data, total, page, perPage, isLoading, isDeleting, isSaving,
  getRowLabel, editFields, editTitle,
  onSearch, onPageChange, onDelete, onEdit,
}: UserListPanelProps<T>) {
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);
  const [editingRow, setEditingRow] = useState<T | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleConfirmDelete = () => {
    if (pendingDelete) {
      onDelete(pendingDelete.id);
      setPendingDelete(null);
    }
  };

  const handleSaveEdit = (updated: T) => {
    onEdit?.(updated);
    setEditingRow(null);
  };

  const resolveLabel = (row: T) =>
    getRowLabel ? getRowLabel(row) : "this record";

  const canEdit = Boolean(editFields && editFields.length > 0 && onEdit);

  return (
    <motion.div
      ref={ref}
      variants={slideFromRight}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="bg-white rounded-2xl border border-border-line02 card-shadow overflow-hidden flex flex-col"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02 gap-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <h2 className="section-title">{title}</h2>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-lato font-bold"
          >
            {count}
          </motion.span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="relative max-w-48 w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              value={search}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-3 py-2 text-xs font-lato rounded-lg border border-border-line02 bg-bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border-line02 bg-white text-xs font-lato text-text-muted hover:bg-bg-soft transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
            <ChevronLeft className="w-3 h-3 rotate-90" />
          </motion.button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full min-w-max text-sm font-lato">
          <thead>
            <tr className="bg-bg-soft border-b border-border-line02">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn("text-left px-5 py-3 text-xs font-medium text-text-muted uppercase tracking-wide whitespace-nowrap", col.className)}
                >
                  {col.header}
                </th>
              ))}
              <th className="text-left px-5 py-3 text-xs font-medium text-text-muted uppercase tracking-wide whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <AnimatePresence mode="wait">
            <motion.tbody
              key={page + search}
              variants={listStagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="divide-y divide-border-line02"
            >
              {isLoading
                ? Array.from({ length: perPage }).map((_, i) => (
                    <motion.tr key={i} variants={rowFadeUp}>
                      {Array.from({ length: columns.length + 1 }).map((_, j) => (
                        <td key={j} className="px-5 py-3.5">
                          <div className="h-4 bg-border-line02 rounded animate-pulse" />
                        </td>
                      ))}
                    </motion.tr>
                  ))
                : data.map((row) => (
                    <motion.tr
                      key={row.id}
                      variants={rowFadeUp}
                      whileHover={{ backgroundColor: "hsla(0,0%,97%,1)" }}
                      className="cursor-default transition-colors"
                    >
                      {columns.map((col) => (
                        <td key={col.key} className={cn("px-5 py-3.5 whitespace-nowrap", col.className)}>
                          {col.render(row)}
                        </td>
                      ))}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          {canEdit && (
                            <EditButton onClick={() => setEditingRow(row)} />
                          )}
                          <motion.button
                            whileHover={{ scale: 1.18 }}
                            whileTap={{ scale: 0.88 }}
                            onClick={() => setPendingDelete(row)}
                            className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing{" "}
          <span className="font-medium text-text-primary">
            {total === 0 ? 0 : (page - 1) * perPage + 1}–{Math.min(page * perPage, total)}
          </span>{" "}
          of <span className="font-medium text-text-primary">{total}</span>
        </p>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-border-line02 text-text-muted hover:bg-bg-soft disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </motion.button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(i + 1)}
              className={cn(
                "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-colors",
                page === i + 1
                  ? "bg-brand-primary text-white shadow-sm"
                  : "border border-border-line02 text-text-muted hover:bg-bg-soft"
              )}
            >
              {i + 1}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-border-line02 text-text-muted hover:bg-bg-soft disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={pendingDelete !== null}
        itemLabel={pendingDelete ? resolveLabel(pendingDelete) : ""}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      {canEdit && (
        <EditModal<T>
          isOpen={editingRow !== null}
          title={editTitle ?? title}
          fields={editFields!}
          initialData={editingRow}
          isSaving={isSaving}
          onSave={handleSaveEdit}
          onCancel={() => setEditingRow(null)}
        />
      )}
    </motion.div>
  );
}

export default UserListPanel;