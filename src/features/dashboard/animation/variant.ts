import type { Variants } from "framer-motion";

// Page-level stagger container
export const pageContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// Generic fade up — used everywhere
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// Faster fade up for tighter stagger lists (table rows, sale items)
export const fadeUpFast: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

// Fade only — for chart wrappers (recharts handles its own drawing)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Scale in for stat cards
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// Stagger wrapper for card grids
export const cardGrid: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

// Stagger wrapper for list items
export const listContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055 },
  },
};