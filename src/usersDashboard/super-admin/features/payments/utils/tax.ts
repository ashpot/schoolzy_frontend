export const TAX_RATE = 0.07;

// Amounts are tax-inclusive: split the 7% VAT back out of the total.
export const splitTax = (total: number) => {
  const tax = Math.round((total * TAX_RATE) / (1 + TAX_RATE));
  return { subtotal: total - tax, tax, total };
};