import { ClipboardList } from "lucide-react";

export default function EmptyOmittedState() {
  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex-center mb-4">
          <ClipboardList size={28} className="text-brand-primary" />
        </div>
        <p className="font-semibold text-text-primary mb-1">
          No student record loaded
        </p>
        <p className="text-body-small text-text-secondary">
          Select a class, group, subject and student above, then click{" "}
          <span className="font-semibold text-text-primary">Load Student Record</span>
        </p>
      </div>
    </div>
  );
}