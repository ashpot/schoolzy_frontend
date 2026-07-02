import { useEffect, useRef } from "react";
import { useInView, useAnimation } from "framer-motion";

export function useScrollAnimation(amount = 0.1): {
  ref: React.RefObject<HTMLDivElement | null>;
  controls: ReturnType<typeof useAnimation>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls };
}