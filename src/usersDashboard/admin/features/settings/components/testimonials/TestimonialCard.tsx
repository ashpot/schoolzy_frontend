import { motion } from "framer-motion";
import { Quote, Trash2 } from "lucide-react";
import { useState } from "react";
import { cardVariant } from "../../animations/variants";
import { useDeleteTestimonial } from "../../hooks/useSettings";
import type { Testimonial } from "../../types";

const PORTFOLIO_COLORS: Record<string, string> = {
  Parent:    "bg-blue-50 text-blue-600 border-blue-100",
  Alumni:    "bg-green-50 text-green-700 border-green-100",
  Student:   "bg-amber-50 text-amber-600 border-amber-100",
  Staff:     "bg-purple-50 text-purple-600 border-purple-100",
  Guardian:  "bg-pink-50 text-pink-600 border-pink-100",
  Community: "bg-indigo-50 text-indigo-600 border-indigo-100",
};

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];
function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}
function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

interface Props {
  testimonial: Testimonial;
  onDelete: (id: string) => void;
}

export default function TestimonialCard({ testimonial, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const mutation = useDeleteTestimonial();
  const isLong = testimonial.comment.length > 140;
  const displayText = expanded || !isLong
    ? testimonial.comment
    : testimonial.comment.slice(0, 140) + "…";

  return (
    <motion.div variants={cardVariant} className="bg-white rounded-2xl card-shadow p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {testimonial.photo
            ? <img src={testimonial.photo} alt={testimonial.fullName} className="w-11 h-11 rounded-full object-cover" />
            : (
              <div className={`w-11 h-11 rounded-full flex-center text-sm font-semibold ${avatarColor(testimonial.fullName)}`}>
                {getInitials(testimonial.fullName)}
              </div>
            )
          }
          <div>
            <p className="text-sm font-semibold text-text-primary">{testimonial.fullName}</p>
            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border mt-0.5 ${PORTFOLIO_COLORS[testimonial.portfolio] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
              {testimonial.portfolio}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => mutation.mutate(testimonial.id, { onSuccess: () => onDelete(testimonial.id) })}
          disabled={mutation.isPending}
          className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors disabled:opacity-40"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Quote */}
      <div>
        <Quote size={16} className="text-brand-primary/30 mb-1.5" />
        <p className="text-sm text-text-secondary leading-relaxed">{displayText}</p>
        {isLong && (
          <button type="button" onClick={() => setExpanded(!expanded)}
            className="text-xs font-medium text-brand-primary mt-1.5 hover:underline">
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <p className="text-xs text-text-muted mt-auto">{testimonial.createdAt}</p>
    </motion.div>
  );
}