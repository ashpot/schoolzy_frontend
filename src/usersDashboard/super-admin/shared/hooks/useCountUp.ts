import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

// Counts from 0 to `target`. Skips the animation when the user prefers reduced motion.
export function useCountUp(target: number, duration = 0.9) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, duration, reduce]);

  return reduce ? target : value;
}