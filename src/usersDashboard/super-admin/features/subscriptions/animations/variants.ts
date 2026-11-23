import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export const rowVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

export const menuVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -6 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
};

export const backdropVariant: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const drawerVariant: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { type: "spring", stiffness: 320, damping: 36 } },
  exit: { x: "100%", transition: { duration: 0.2, ease: "easeIn" } },
};