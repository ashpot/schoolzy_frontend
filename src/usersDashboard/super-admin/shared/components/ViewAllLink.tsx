import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ViewAllLink({ to }: { to: string }) {
  return (
    <Link to={to} className="flex shrink-0 items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
      View all <ChevronRight size={14} aria-hidden />
    </Link>
  );
}