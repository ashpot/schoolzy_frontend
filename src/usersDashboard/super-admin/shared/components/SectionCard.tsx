import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ title, subtitle, action, children, className }: SectionCardProps) {
  return (
    <section className={cn("rounded-3xl border border-border-line02 bg-white p-6 lg:p-8", className)}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}