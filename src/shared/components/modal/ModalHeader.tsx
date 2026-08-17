import { type ReactNode } from "react";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  subtitle?: ReactNode;
  variant?: "success" | "info" | "warning";
}

const variantMap = {
  success: { icon: CheckCircle2, bg: "bg-success/10", color: "text-success" },
  info:    { icon: Info,          bg: "bg-blue-50",    color: "text-brand-primary" },
  warning: { icon: AlertTriangle, bg: "bg-amber-50",   color: "text-warning" },
};

export default function ModalHeader({ title, subtitle, variant = "info" }: ModalHeaderProps) {
  const { icon: Icon, bg, color } = variantMap[variant];

  return (
    <div className="flex flex-col items-center text-center gap-2 mb-5">
      <div className={`w-12 h-12 rounded-full ${bg} flex-center`}>
        <Icon size={24} className={color} />
      </div>
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
    </div>
  );
}