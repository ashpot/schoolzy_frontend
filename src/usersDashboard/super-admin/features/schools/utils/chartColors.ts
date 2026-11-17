// Mirrors the sa-* tokens in index.css (Recharts needs real colour strings).
export const DETAIL_CHART = {
  blue: "hsla(205, 83%, 45%, 1)",
  blueSoft: "hsla(205, 83%, 45%, 0.22)",
  green: "hsla(142, 71%, 40%, 1)",
  greenFill: "hsla(142, 71%, 40%, 0.1)",
  axis: "hsla(220, 6%, 63%, 1)",
  grid: "hsla(240, 6%, 93%, 1)",
};

export const axisTick = { fontSize: 11, fill: DETAIL_CHART.axis };

export const tooltipStyle = {
  borderRadius: 12,
  border: `1px solid ${DETAIL_CHART.grid}`,
  boxShadow: "0 2px 12px 0 hsla(215, 50%, 23%, 0.08)",
  fontSize: 12,
};