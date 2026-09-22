import { Pencil } from "lucide-react";

interface EditButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function EditButton({ onClick, disabled }: EditButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      disabled={disabled}
      className="p-1.5 rounded-lg text-text-muted hover:text-brand-primary hover:bg-blue-50 transition-colors disabled:opacity-40"
    >
      <Pencil size={15} />
    </button>
  );
}