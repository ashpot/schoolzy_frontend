import { useState } from "react";
import { motion } from "framer-motion";
import { BookMarked, Search } from "lucide-react";
import { useMySubjects } from "../../hooks/useDashboard";
import { staggerContainer, rowVariant } from "../../animations/variants";

export default function MySubjectsCard() {
  const { data: subjects = [], isLoading } = useMySubjects();
  const [search, setSearch] = useState("");

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
            <BookMarked size={16} className="text-brand-primary" />
          </span>
          <h2 className="section-title">My Subjects</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-medium">
            {subjects.length}
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subject..."
            className="pl-8 pr-3 py-2 text-sm rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-48"
          />
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-t border-border-line02 text-xs text-text-muted uppercase tracking-wide">
            <th className="text-left font-medium px-6 py-3">Subject Name</th>
            <th className="text-left font-medium px-6 py-3">Code</th>
            <th className="text-left font-medium px-6 py-3">Class</th>
          </tr>
        </thead>
        <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
          {!isLoading &&
            filtered.map((s) => (
              <motion.tr
                key={s.id}
                variants={rowVariant}
                className="border-t border-border-line02 hover:bg-gray-50/50"
              >
                <td className="px-6 py-4 text-body-small text-text-primary">{s.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-semibold">
                    {s.code}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {s.classes.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-full bg-bg-input text-text-secondary text-xs"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
              </motion.tr>
            ))}
        </motion.tbody>
      </table>

      {!isLoading && filtered.length === 0 && (
        <div className="py-10 text-center text-body-small text-text-muted">No subjects found.</div>
      )}
    </div>
  );
}