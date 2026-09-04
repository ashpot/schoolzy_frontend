import React from "react";
import { X } from "lucide-react";
import AvatarInitials from "./AvatarInitials";
import type { AssignedChild } from "../../schemas";

interface ChildChipProps {
  child: AssignedChild;
  onRemove: (id: string) => void;
}

const ChildChip: React.FC<ChildChipProps> = ({ child, onRemove }) => (
  <div className="flex items-center gap-2.5 bg-brand-primary/5 border border-brand-primary/20 rounded-xl px-3 py-2.5">
    <AvatarInitials name={child.name} />
    <span className="text-sm text-text-primary font-semibold">{child.name}</span>
    <span className="text-sm text-brand-primary font-medium">· {child.classLabel}</span>
    <button
      type="button"
      onClick={() => onRemove(child.id)}
      className="ml-auto w-5 h-5 rounded-full flex-center text-brand-primary hover:bg-brand-primary/10 transition-colors"
    >
      <X size={14} />
    </button>
  </div>
);

export default ChildChip;