interface Props {
  label:  string;
  color?: "blue" | "purple" | "green" | "amber";
}

const colorMap = {
  blue:   "bg-blue-50   text-blue-700   border-blue-100",
  purple: "bg-purple-50 text-purple-700 border-purple-100",
  green:  "bg-green-50  text-green-700  border-green-100",
  amber:  "bg-amber-50  text-amber-700  border-amber-100",
};

export default function FilterPill({ label, color = "blue" }: Props) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colorMap[color]}`}>
      {label}
    </span>
  );
}