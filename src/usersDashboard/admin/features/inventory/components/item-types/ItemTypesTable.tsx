import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Layers, Trash2 } from "lucide-react";
import type { ItemType } from "../../types";
import { TYPE_COLORS } from "../../data/mockData";
import { useDeleteItemType } from "../../hooks/useInventory";
import { staggerContainer, rowVariant } from "../../animations/variants";
import Button from "@/shared/ui/Button";

const PAGE_SIZE = 8;

interface Props {
  types: ItemType[];
  onDelete: (id: string) => void;
}

export default function ItemTypesTable({ types, onDelete }: Props) {
  const [search, setSearch]   = useState("");
  const [page, setPage]       = useState(1);
  const deleteMutation        = useDeleteItemType();

  const filtered = types.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );
  const total     = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage  = Math.min(page, totalPages);
  const slice     = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => onDelete(id) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-brand-primary" />
          <span className="font-semibold text-text-primary text-sm">Item Types List</span>
          <span className="ml-1 text-xs font-semibold bg-blue-50 text-brand-primary rounded-full px-2 py-0.5">
            {types.length}
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search…"
            className="pl-8 pr-3 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-48"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-line02 bg-bg-input">
            <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3 w-10">#</th>
            <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-36">Name</th>
            <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3">Description</th>
            <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3">Actions</th>
          </tr>
        </thead>
        <motion.tbody key={safePage} variants={staggerContainer} initial="hidden" animate="show">
          {slice.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex-center">
                    <Layers size={22} className="text-brand-primary" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">No item types found</p>
                  <p className="text-xs text-text-muted">Add a type using the form on the left</p>
                </div>
              </td>
            </tr>
          ) : (
            slice.map((type, idx) => (
              <motion.tr
                key={type.id}
                variants={rowVariant}
                className="border-b border-border-line02 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-5 py-3.5 text-text-muted text-xs">{(safePage - 1) * PAGE_SIZE + idx + 1}</td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${TYPE_COLORS[type.name] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                    {type.name}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-text-secondary text-xs leading-relaxed max-w-xs">
                  {type.description}
                </td>
                <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleDelete(type.id); }}
                      className="px-2! py-2!"
                      leftIcon={<Trash2 size={15} />}
                    >
                      {""}
                    </Button>
                </td>
              </motion.tr>
            ))
          )}
        </motion.tbody>
      </table>

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-border-line02">
          <span className="text-xs text-text-muted">
            Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, total)} of {total} types
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-7 h-7 rounded-lg border border-border-line02 flex-center text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition text-xs"
            >‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition ${
                  p === safePage
                    ? "bg-brand-primary text-white"
                    : "border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary"
                }`}
              >{p}</button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-7 h-7 rounded-lg border border-border-line02 flex-center text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition text-xs"
            >›</button>
          </div>
        </div>
      )}
    </div>
  );
}