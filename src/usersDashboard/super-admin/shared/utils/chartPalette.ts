// Recharts needs real colour strings. These mirror the sa-* tokens in index.css.
export const PALETTE = {
  blue: "hsla(205, 83%, 45%, 1)",
  blueSoft: "hsla(205, 83%, 45%, 0.25)",
  blueFill: "hsla(205, 83%, 45%, 0.1)",
  green: "hsla(142, 71%, 40%, 1)",
  amber: "hsla(38, 92%, 48%, 1)",
  purple: "hsla(262, 83%, 58%, 1)",
  red: "hsla(0, 84%, 60%, 1)",
  redSoft: "hsla(0, 84%, 60%, 0.3)",
  orange: "hsla(24, 90%, 50%, 1)",
  teal: "hsla(174, 72%, 36%, 1)",
  axis: "hsla(220, 6%, 63%, 1)",
  grid: "hsla(240, 6%, 93%, 1)",
};

export const axisTick = { fontSize: 11, fill: PALETTE.axis };

export const tooltipStyle = {
  borderRadius: 12,
  border: `1px solid ${PALETTE.grid}`,
  boxShadow: "0 2px 12px 0 hsla(215, 50%, 23%, 0.08)",
  fontSize: 12,
};