// const TestimonialsPage = () => {
//   return (
//     <div>
//       <h1 className="page-title">Testimonials</h1>
//       <p className="text-body mt-2">Manage testimonials.</p>
//     </div>
//   );
// };

// export default TestimonialsPage;

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer } from "../animations/variants";
import { mockTestimonials } from "../data/mockData";
import type { Testimonial } from "../types";
import TestimonialForm from "../components/testimonials/TestimonialForm";
import TestimonialCard from "../components/testimonials/TestimonialCard";

const ALL_FILTERS = ["All", "Parent", "Alumni", "Student", "Staff", "Guardian", "Community"] as const;

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>(mockTestimonials);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = items.filter((t) => {
    const matchSearch = t.fullName.toLowerCase().includes(search.toLowerCase()) ||
      t.comment.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || t.portfolio === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Testimonials</h1>
        <p className="text-body-small text-text-secondary mt-1">Manage what parents, alumni, and students say about your school</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        {/* Left: Form */}
        <TestimonialForm onSuccess={(t) => setItems((prev) => [t, ...prev])} />

        {/* Right: Grid */}
        <div className="space-y-4">
          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or keyword…"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-border-line02 rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all card-shadow"
              />
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {ALL_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  activeFilter === f
                    ? "bg-brand-primary text-white"
                    : "bg-white border border-border-line02 text-text-secondary hover:border-brand-primary/50 hover:text-brand-primary card-shadow"
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-xs text-text-muted bg-white border border-border-line02 rounded-lg px-3 py-1.5 card-shadow">
              ⭐ {filtered.length} testimonials
            </span>
          </div>

          {/* Cards grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl card-shadow p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex-center mx-auto mb-3">
                <span className="text-xl">💬</span>
              </div>
              <p className="text-sm font-medium text-text-primary">No testimonials found</p>
              <p className="text-xs text-text-muted mt-1">Try adjusting your search or filter</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer} initial="hidden" animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {filtered.map((t) => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  onDelete={(id) => setItems((prev) => prev.filter((x) => x.id !== id))}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}