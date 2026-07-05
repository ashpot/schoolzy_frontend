import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Tag, Search, TagsIcon, Trash2 } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { useDeleteFeeType } from "../../hooks/useFinances";
import FeeTypeBadge from "../shared/FeeTypeBadge";
// import DeleteButton from "@/shared/ui/DeleteButton";
import type { FeeType } from "../../types";
import Button from "@/shared/ui/Button";

interface FeeTypeTableProps {
  items: FeeType[];
  onDelete: (id: string) => void;
}

const PAGE_SIZE = 8;

export default function FeeTypeTable({ items, onDelete }: FeeTypeTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const deleteMutation = useDeleteFeeType();

  const filtered = useMemo(
    () => items.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const start = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, filtered.length);

  const colorIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item, i) => map.set(item.id, i));
    return map;
  }, [items]);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => onDelete(id) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-brand-primary" />
          <span className="font-semibold text-text-primary">Fee Types List</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            {items.length}
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8 pr-3 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary placeholder:text-text-muted outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-44 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-line02 bg-gray-50/60">
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Description</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-text-muted uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <TagsIcon size={22} className="text-brand-primary" />
                    </div>
                    <p className="font-medium text-text-primary">No fee types yet</p>
                    <p className="text-text-muted text-xs">Add one using the form on the left</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((item, idx) => (
                <motion.tr
                  key={item.id}
                  variants={rowVariant}
                  className="border-b border-border-line02 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-text-muted font-medium">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-4 py-4">
                    <FeeTypeBadge name={item.name} index={colorIndexMap.get(item.id) ?? idx} />
                  </td>
                  <td className="px-4 py-4 text-text-secondary text-sm max-w-xs">
                    {item.description}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                          className="px-2! py-2!"
                          leftIcon={<Trash2 size={15} />}
                        >
                          {""}
                        </Button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing <span className="font-semibold text-text-primary">{start}–{end}</span> of{" "}
          <span className="font-semibold text-text-primary">{filtered.length}</span> types
        </p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)}
              className={`w-7 h-7 flex-center rounded-lg text-sm font-medium transition-all ${n === page ? "bg-brand-primary text-white" : "border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">›</button>
        </div>
      </div>
    </div>
  );
}