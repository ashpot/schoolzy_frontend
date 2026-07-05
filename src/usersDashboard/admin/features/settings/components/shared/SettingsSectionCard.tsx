import { type LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function SettingsSectionCard({ icon: Icon, title, subtitle, children }: Props) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-border-line02">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex-center">
          <Icon size={17} className="text-brand-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">{title}</p>
          <p className="text-xs text-text-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}