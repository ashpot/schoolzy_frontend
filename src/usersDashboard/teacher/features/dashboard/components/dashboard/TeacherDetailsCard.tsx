import { Mail, Phone, BookOpen } from "lucide-react";
import { useTeacherDetails } from "../../hooks/useDashboard";
import { avatarColor, getInitials } from "../../utils/avatar";

export default function TeacherDetailsCard() {
  const { data: teacher, isLoading } = useTeacherDetails();

  if (isLoading || !teacher) {
    return (
      <div className="bg-white rounded-2xl card-shadow p-6 animate-pulse">
        <div className="h-40 bg-bg-input rounded-xl" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-8 h-8 rounded-lg bg-blue-50 flex-center">
          <BookOpen size={16} className="text-brand-primary" />
        </span>
        <h2 className="section-title">Teacher Details</h2>
      </div>

      <div className="flex flex-col items-center text-center mb-6">
        <div
          className={`w-16 h-16 rounded-full flex-center text-lg font-semibold mb-3 ${avatarColor(
            teacher.name
          )}`}
        >
          {getInitials(teacher.name)}
        </div>
        <h3 className="text-body font-semibold text-text-primary">{teacher.name}</h3>
        <span className="mt-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-medium">
          {teacher.role}
        </span>
      </div>

      <div className="border-t border-border-line02 pt-4 space-y-4">
        <DetailRow icon={<BookOpen size={14} />} label="Class Assigned" value={teacher.classAssigned} />
        <DetailRow icon={<Mail size={14} />} label="Email Address" value={teacher.email} />
        <DetailRow icon={<Phone size={14} />} label="Phone Number" value={teacher.phone} />
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-8 h-8 rounded-lg bg-bg-input flex-center text-text-muted shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-text-muted uppercase tracking-wide">{label}</p>
        <p className="text-body-small text-text-primary mt-0.5">{value}</p>
      </div>
    </div>
  );
}