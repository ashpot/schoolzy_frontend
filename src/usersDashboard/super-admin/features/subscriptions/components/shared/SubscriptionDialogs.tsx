import { AnimatePresence } from "framer-motion";
import type { MenuKey, Subscription } from "../../types";
import ChangePlanModal from "./ChangePlanModal";
import SubActionModal from "./SubActionModal";

export interface DialogTarget {
  key: Exclude<MenuKey, "view">;
  sub: Subscription;
}

export default function SubscriptionDialogs({ target, onClose }: { target: DialogTarget | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {target &&
        (target.key === "upgrade" || target.key === "downgrade" ? (
          <ChangePlanModal key={`${target.key}-${target.sub.id}`} direction={target.key} sub={target.sub} onClose={onClose} />
        ) : (
          <SubActionModal key={`${target.key}-${target.sub.id}`} action={target.key} sub={target.sub} onClose={onClose} />
        ))}
    </AnimatePresence>
  );
}