import { motion } from "framer-motion";
import { useState } from "react";
import { Star } from "lucide-react";
import { fadeUp, staggerContainer } from "../animations/variants";
import { mockNewsPosts } from "../data/mockData";
import type { NewsPost, NewsCategory } from "../types";
import NewsForm from "../components/news-events/NewsForm";
import PostCard from "../components/news-events/PostCard";

const CATEGORY_FILTERS = ["All", "News", "Events", "Announcements", "Sports", "Academic"] as const;

export default function NewsEventsPage() {
  const [posts, setPosts] = useState<NewsPost[]>(mockNewsPosts);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || p.category === (activeFilter as NewsCategory);
    return matchSearch && matchFilter;
  });

  const featured = filtered.filter((p) => p.featured);
  const allPosts  = filtered.filter((p) => !p.featured);

  const handleDelete = (id: string) => setPosts((prev) => prev.filter((p) => p.id !== id));

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">News &amp; Events</h1>
        <p className="text-body-small text-text-secondary mt-1">Publish and manage news, announcements, and school events</p>
      </div>

      {/* Form */}
      <NewsForm onSuccess={(p) => setPosts((prev) => [p, ...prev])} />

      {/* Feed */}
      <div className="space-y-4">
        {/* Search + category filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts by title, content, or author…"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-border-line02 rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all card-shadow"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all ${
                  activeFilter === f
                    ? "bg-brand-primary text-white"
                    : "bg-white border border-border-line02 text-text-secondary hover:border-brand-primary/50 hover:text-brand-primary card-shadow"
                }`}
              >
                {f}
              </button>
            ))}
            <span className="text-xs text-text-muted bg-white border border-border-line02 rounded-xl px-3 py-2 card-shadow">
              {filtered.length} posts
            </span>
          </div>
        </div>

        {/* Featured section */}
        {featured.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star size={15} className="text-yellow-500 fill-yellow-400" />
              <span className="text-xs font-semibold text-text-primary uppercase tracking-widest">Featured</span>
            </div>
            <motion.div
              variants={staggerContainer} initial="hidden" animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {featured.map((p) => (
                <PostCard key={p.id} post={p} featured onDelete={handleDelete} />
              ))}
            </motion.div>
          </div>
        )}

        {/* All Posts section */}
        {allPosts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-primary uppercase tracking-widest">All Posts</span>
            </div>
            <motion.div
              variants={staggerContainer} initial="hidden" animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {allPosts.map((p) => (
                <PostCard key={p.id} post={p} onDelete={handleDelete} />
              ))}
            </motion.div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl card-shadow p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex-center mx-auto mb-3">
              <span className="text-xl">📰</span>
            </div>
            <p className="text-sm font-medium text-text-primary">No posts found</p>
            <p className="text-xs text-text-muted mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}