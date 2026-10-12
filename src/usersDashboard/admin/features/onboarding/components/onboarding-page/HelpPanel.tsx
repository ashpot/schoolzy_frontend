import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { OnboardingRecommendation } from "../../types";
import { mapRoute } from "../../utils/routeMap";

// TODO: export these from WhatsAppFab and import here to avoid duplication
const WHATSAPP_URL = `https://wa.me/2348127870201?text=${encodeURIComponent(
  "Hello Schoolzy, I need help setting up my school."
)}`;

interface Props {
  recommendations: OnboardingRecommendation[];
}

export default function HelpPanel({ recommendations }: Props) {
  return (
    <aside className="space-y-5">
      <div>
        <h2 className="section-title">Need help</h2>
        <p className="text-body-small text-text-secondary mt-1">
          Set up your school as quickly as possible.
        </p>
      </div>

      {/* TODO: replace with the Getting Started video when it's ready */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl bg-brand-primary p-6 text-center text-white hover:bg-brand-hover transition-colors"
      >
        <MessageCircle size={40} />
        <span className="text-lg font-semibold">Talk to our team</span>
        <span className="text-sm text-white/80">We'll walk you through setup on WhatsApp</span>
      </a>

      {recommendations.length > 0 && (
        <div className="rounded-2xl border border-border-line02 bg-white p-4 card-shadow">
          <h3 className="text-sm font-semibold text-text-primary">Recommended for you</h3>
          <ul className="mt-3 space-y-2">
            {recommendations.map((r) => (
              <li key={`${r.step}-${r.title}`}>
                <Link
                  to={mapRoute(r.action.route)}
                  className="flex items-center justify-between gap-2 rounded-lg bg-bg-input px-3 py-2 text-sm text-text-nav hover:text-brand-primary transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{r.title}</span>
                    <span className="block truncate text-xs text-text-muted">{r.step}</span>
                  </span>
                  <ArrowRight size={14} className="shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}