import { GraduationCap, BookOpen, Hash } from "lucide-react";
import type { LoadedRecord } from "../../types";
import { classOptions, classGroupOptions, subjectOptions } from "../../data/mockData";

interface Props { record: LoadedRecord; }

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) => name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

export default function StudentProfileCard({ record }: Props) {
  const { student } = record;
  const classLabel   = classOptions.find((o) => o.value === record.class)?.label           ?? record.class;
  const groupLabel   = classGroupOptions.find((o) => o.value === record.classGroup)?.label ?? record.classGroup;
  const subjectLabel = subjectOptions.find((o) => o.value === record.subject)?.label       ?? record.subject;

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border-line02 bg-gray-50/40">
      <div className={`w-14 h-14 rounded-2xl flex-center text-lg font-bold shrink-0 ${avatarColor(student.name)}`}>
        {getInitials(student.name)}
      </div>
      <div>
        <p className="font-semibold text-text-primary text-base leading-tight">{student.name}</p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            <GraduationCap size={11} />{classLabel} {groupLabel}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
            <BookOpen size={11} />{subjectLabel}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <Hash size={11} />{student.studentId}
          </span>
        </div>
      </div>
    </div>
  );
}