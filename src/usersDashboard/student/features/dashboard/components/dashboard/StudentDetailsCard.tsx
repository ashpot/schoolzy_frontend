import { UserCircle, GraduationCap, BookOpen, User } from "lucide-react";
import type { StudentDetails } from "../../types";
import FormHeader from "@/shared/ui/FormHeader";

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700", "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700", "bg-indigo-100 text-indigo-700",
];
function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}
function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export default function StudentDetailsCard({ student }: { student: StudentDetails }) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={UserCircle} title="Student Details" />
      <div className="flex flex-col items-center text-center mt-4">
        <div className={`w-20 h-20 rounded-full flex-center text-2xl font-semibold mb-3 ${avatarColor(student.name)}`}>
          {getInitials(student.name)}
        </div>
        <p className="font-semibold text-lg text-text-primary">{student.name}</p>
        <span className="mt-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs">
          {student.className}
        </span>
      </div>
      <div className="mt-6 space-y-4 border-t border-border-line02 pt-5">
        <Detail icon={GraduationCap} label="Admission Number" value={student.admissionNumber} />
        <Detail icon={BookOpen} label="Current Class" value={student.currentClass} />
        <Detail icon={User} label="Form Teacher" value={student.formTeacher} />
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-bg-input flex-center text-text-muted">
        <Icon size={15} />
      </div>
      <div>
        <p className="text-xs text-text-muted uppercase">{label}</p>
        <p className="font-medium text-text-primary text-sm">{value}</p>
      </div>
    </div>
  );
}