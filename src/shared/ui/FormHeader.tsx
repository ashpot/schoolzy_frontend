import type { LucideIcon } from "lucide-react";

interface FormHeaderProps {
  icon: LucideIcon;
  title: string;
}

export default function FormHeader({ icon: Icon, title }: FormHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
        <Icon size={14} className="text-brand-primary" />
      </div>
      <h3 className="font-semibold text-text-primary">{title}</h3>
    </div>
  );
}