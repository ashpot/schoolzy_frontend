import type { Denominator, DenominatorResponse } from "../types";

export function toDenominator(r: DenominatorResponse): Denominator {
  return {
    id: String(r.id),
    denominator: Number(r.denominator),
    className: r.class_name,
    classId: r.target_class,
    sectionName: r.section_name,
  };
}