import type { AttendanceStatusValue } from "../../types";

const STATUS_STYLES: Record<Exclude<AttendanceStatusValue, null>, string> = {
  Present: "bg-green-600 text-white",
  Absent: "bg-danger text-white",
  Late: "bg-warning text-white",
};

export default function AttendanceStatusToggle({
  value,
  onChange,
}: {
  value: AttendanceStatusValue;
  onChange: (status: Exclude<AttendanceStatusValue, null>) => void;
}) {
  const options: Exclude<AttendanceStatusValue, null>[] = ["Present", "Absent", "Late"];

  return (
    <div className="flex items-center gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            value === opt ? STATUS_STYLES[opt] : "bg-bg-input text-text-secondary hover:bg-gray-200"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}