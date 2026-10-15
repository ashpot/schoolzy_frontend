import { LESSON_STATUS_FALLBACK, LESSON_STATUS_STYLES } from "../../shared/utils/constants";

export default function StatusBadge({ status }: { status: string }) {
  const style = LESSON_STATUS_STYLES[status.toLowerCase()] ?? LESSON_STATUS_FALLBACK;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {status}
    </span>
  );
}