import type { LucideIcon } from "lucide-react";

interface HintPill {
  icon:  LucideIcon;
  label: string;
}

interface Props {
  icon:        LucideIcon;
  title:       string;
  description: React.ReactNode;
  hintPills?:  HintPill[];
}

export default function EmptyState({ icon: Icon, title, description, hintPills }: Props) {
  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex-center mb-4">
          <Icon size={28} className="text-brand-primary" />
        </div>
        <p className="font-semibold text-text-primary mb-1">{title}</p>
        <p className="text-body-small text-text-secondary">{description}</p>
        {hintPills && hintPills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {hintPills.map(({ icon: PillIcon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-text-secondary border border-border-line02">
                <PillIcon size={12} />{label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}