import { motion } from "framer-motion";
import { Eye, Trash2, User, Clock } from "lucide-react";
import { cardVariant } from "../../animations/variants";
import { useDeleteNewsPost } from "../../hooks/useSettings";
import type { NewsPost, NewsCategory } from "../../types";

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  News:          "bg-blue-50 text-blue-600 border-blue-100",
  Events:        "bg-purple-50 text-purple-600 border-purple-100",
  Announcements: "bg-amber-50 text-amber-600 border-amber-100",
  Sports:        "bg-green-50 text-green-700 border-green-100",
  Academic:      "bg-indigo-50 text-indigo-600 border-indigo-100",
};

interface Props {
  post: NewsPost;
  onDelete: (id: string) => void;
  featured?: boolean;
}

export default function PostCard({ post, onDelete, featured = false }: Props) {
  const mutation = useDeleteNewsPost();

  return (
    <motion.div variants={cardVariant}
      className={`bg-white rounded-2xl card-shadow overflow-hidden flex flex-col ${featured ? "min-h-80" : ""}`}
    >
      {/* Cover image */}
      {post.coverPhoto ? (
        <div className="relative h-40 overflow-hidden">
          <img src={post.coverPhoto} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            {post.featured && (
              <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-yellow-400/90 text-yellow-900 rounded-full backdrop-blur-sm">
                ⭐ Featured
              </span>
            )}
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${CATEGORY_STYLES[post.category]}`}>
              {post.category}
            </span>
          </div>
        </div>
      ) : (
        <div className="h-28 bg-linear-to-br from-blue-50 to-indigo-50 flex-center">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${CATEGORY_STYLES[post.category]}`}>
            {post.category}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">{post.title}</h3>
        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed flex-1">{post.content}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border-line02 mt-1">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1"><User size={11} />{post.author}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{post.createdAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <button type="button"
              className="p-1.5 rounded-lg text-text-muted hover:text-brand-primary hover:bg-blue-50 transition-colors">
              <Eye size={13} />
            </button>
            <button type="button"
              onClick={() => mutation.mutate(post.id, { onSuccess: () => onDelete(post.id) })}
              disabled={mutation.isPending}
              className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors disabled:opacity-40">
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}