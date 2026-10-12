import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import type { OnboardingItem } from "../../types";
import { getIcon, getSortedItems } from "../../utils/onboardingUtils";
import { mapRoute } from "../../utils/routeMap";

interface Props {
  items: Record<string, OnboardingItem>;
  locked: boolean;
}

export default function StepItemList({ items, locked }: Props) {
  return (
    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {getSortedItems(items).map(([key, item]) => {
        const Icon = getIcon(item.icon);
        const body = (
          <>
            <Icon size={15} className="shrink-0 text-text-muted" />
            <span className="flex-1 truncate">{item.title}</span>
            {item.completed ? (
              <Check size={15} className="shrink-0 text-success" />
            ) : (
              <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-text-muted" />
            )}
          </>
        );
        const base = "flex items-center gap-2 rounded-lg border border-border-line02 bg-bg-input px-3 py-2 text-sm";

        return (
          <li key={key}>
            {locked ? (
              <div className={`${base} text-text-muted`}>{body}</div>
            ) : (
              <Link
                to={mapRoute(item.action.route)}
                title={item.action.label}
                className={`${base} text-text-nav hover:border-brand-primary hover:text-brand-primary transition-colors`}
              >
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}