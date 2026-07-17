import { GraduationCap, BookOpen, ClipboardList, Hash } from "lucide-react";
import type { UploadFilterValues } from "../../schemas/uploadAssessment";
import { assessmentTypeOptions, classGroupOptions, classOptions, subjectOptions } from "../../data/mockData";

interface Props {
  filters:  UploadFilterValues;
  maxScore: number;
}

const pill = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border";

export default function FilterPills({ filters, maxScore }: Props) {
  const classLabel   = classOptions.find((o) => o.value === filters.class)?.label           ?? filters.class;
  const groupLabel   = classGroupOptions.find((o) => o.value === filters.classGroup)?.label ?? filters.classGroup;
  const subjectLabel = subjectOptions.find((o) => o.value === filters.subject)?.label       ?? filters.subject;
  const typeLabel    = assessmentTypeOptions.find((o) => o.value === filters.assessmentType)?.label ?? filters.assessmentType;

  return (
    <div className="flex flex-wrap gap-2">
      <span className={`${pill} bg-blue-50 text-blue-700 border-blue-100`}>
        <GraduationCap size={12} />
        {classLabel} {groupLabel}
      </span>
      <span className={`${pill} bg-purple-50 text-purple-700 border-purple-100`}>
        <BookOpen size={12} />
        {subjectLabel}
      </span>
      <span className={`${pill} bg-amber-50 text-amber-700 border-amber-100`}>
        <ClipboardList size={12} />
        {typeLabel}
      </span>
      <span className={`${pill} bg-green-50 text-green-700 border-green-100`}>
        <Hash size={12} />
        Max Score: {maxScore}
      </span>
    </div>
  );
}