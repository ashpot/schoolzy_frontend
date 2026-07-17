import { type Variants } from "framer-motion";

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 1,
    position: "absolute",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
    },
  }),
};