import { Save } from "lucide-react";
import type { Student } from "../../types";
import Button from "@/shared/ui/Button";

interface Props {
  student:   Student;
  grade:     string | null;
  onSave:    React.MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
}

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

const gradeStyles: Record<string, string> = {
  A: "border border-blue-200 bg-blue-50 text-blue-700",
  B: "border border-green-200 bg-green-50 text-green-700",
  C: "border border-yellow-200 bg-yellow-50 text-yellow-700",
  D: "border border-amber-200 bg-amber-50 text-amber-700",
  F: "border border-red-200 bg-red-50 text-red-700",
};

const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) => name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

export default function OmittedFooter({ student, grade, onSave, isLoading }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-line02 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex-center text-xs font-bold shrink-0 ${avatarColor(student.name)}`}>
            {getInitials(student.name)}
          </div>
          <span className="text-sm font-medium text-text-primary">{student.name}</span>
          {grade && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${gradeStyles[grade]}`}>
              Grade {grade}
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="primary"
          leftIcon={<Save size={14} />}
          isLoading={isLoading}
          onClick={onSave}
        >
          Save Result
        </Button>
      </div>
    </div>
  );
}