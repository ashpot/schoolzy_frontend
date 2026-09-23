import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LandingNav from "./LandingNav";
import LandingFooter from "./LandingFooter";
import { fadeUp, staggerFast } from "../animations/variants";
import type { LegalDocument } from "../data/legalContent";
import { cn } from "@/shared/utils/cn";

interface LegalPageLayoutProps {
  document: LegalDocument;
}

function renderBody(body: string) {
  return body.split("\n\n").map((block, i) => {
    if (block.includes("\n- ")) {
      const [lead, ...rest] = block.split("\n- ");
      return (
        <div key={i} className="mb-4">
          {lead && !lead.startsWith("- ") && (
            <p className="text-body text-text-secondary leading-relaxed mb-2">{lead}</p>
          )}
          <ul className="space-y-1.5 pl-1">
            {(lead.startsWith("- ") ? [lead.slice(2), ...rest] : rest).map((item, j) => (
              <li key={j} className="flex gap-2 text-body-small text-text-secondary leading-relaxed">
                <span className="text-brand-primary mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <p key={i} className="text-body text-text-secondary leading-relaxed mb-4 whitespace-pre-line">
        {block}
      </p>
    );
  });
}

export default function LegalPageLayout({ document }: LegalPageLayoutProps) {
  const [activeId, setActiveId] = useState(document.sections[0]?.id);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const el = window.document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <LandingNav />

      <main className="bg-white">
        {/* Header */}
        <div className="border-b border-border-line02 bg-bg-soft">
          <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Link
                to="/"
                className="text-sm font-jakarta text-brand-primary hover:underline mb-4 inline-block"
              >
                ← Back to home
              </Link>
              <h1 className="page-title text-3xl md:text-4xl">{document.title}</h1>
              <p className="text-body-small text-text-muted mt-2">
                Last Updated: {document.lastUpdated}
              </p>
              <p className="text-body text-text-secondary leading-relaxed mt-6 max-w-3xl whitespace-pre-line">
                {document.intro}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content + TOC */}
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
            {/* Sticky table of contents */}
            <motion.aside
              variants={staggerFast}
              initial="hidden"
              animate="show"
              className="hidden lg:block"
            >
              <nav className="sticky top-24 flex flex-col gap-1 border-l border-border-line02 pl-4">
                {document.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "text-left text-xs font-jakarta py-1.5 transition-colors leading-snug",
                      activeId === section.id
                        ? "text-brand-primary font-semibold"
                        : "text-text-muted hover:text-text-secondary"
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </motion.aside>

            {/* Sections */}
            <motion.div variants={staggerFast} initial="hidden" animate="show" className="min-w-0">
              {document.sections.map((section) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  variants={fadeUp}
                  className="mb-10 scroll-mt-24"
                >
                  <h2 className="section-title mb-3">{section.title}</h2>
                  {renderBody(section.body)}
                </motion.section>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}