import { CalendarCheck } from "lucide-react";

export default function AttendanceEmptyState() {
  return (
    <div className="bg-white rounded-2xl card-shadow h-full min-h-[420px] flex-center flex-col text-center p-6">
      <span className="w-14 h-14 rounded-full bg-blue-50 flex-center mb-4">
        <CalendarCheck size={22} className="text-brand-primary" />
      </span>
      <p className="text-body font-semibold text-text-primary">Ready to take attendance</p>
      <p className="text-body-small text-text-muted mt-1">
        Select a class, group and date above, then click <span className="font-medium text-text-secondary">Load Students</span>
      </p>
    </div>
  );
}