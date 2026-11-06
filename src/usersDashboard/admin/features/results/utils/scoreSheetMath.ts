import { computeGrade } from "./gradeUtils";
import type { ScoreInputs, SheetColumn, Scoresheet } from "../types/uploadResults";

export const cellValue = (inputs: ScoreInputs, studentId: number, colId: number) =>
  inputs[String(studentId)]?.[String(colId)] ?? "";

// "" when the cell is fine. The backend accepts any integer (it took 7 on a base mark of 3),
// so these limits live here. Delete the max check below if base_mark turns out not to be a ceiling.
export function cellError(value: string, col: SheetColumn, wasSaved: boolean): string {
  const v = value.trim();
  if (v === "") return wasSaved ? "A saved score can't be cleared" : "";
  const n = Number(v);
  if (!Number.isInteger(n)) return "Whole numbers only";
  if (n < 0) return "Can't be negative";
  if (col.max !== null && n > col.max) return `Max is ${col.max}`;
  return "";
}

const changedCells = (sheet: Scoresheet, inputs: ScoreInputs, original: ScoreInputs) =>
  sheet.rows.flatMap((r) =>
    sheet.columns
      .filter((c) => cellValue(inputs, r.studentId, c.id) !== cellValue(original, r.studentId, c.id))
      .map((c) => ({ r, c }))
  );

export const countChanged = (sheet: Scoresheet, inputs: ScoreInputs, original: ScoreInputs) =>
  changedCells(sheet, inputs, original).length;

// Only edited cells can block saving, so old values already in the database never lock the page
export const countProblems = (sheet: Scoresheet, inputs: ScoreInputs, original: ScoreInputs) =>
  changedCells(sheet, inputs, original).filter(
    ({ r, c }) =>
      cellError(cellValue(inputs, r.studentId, c.id), c, cellValue(original, r.studentId, c.id) !== "") !== ""
  ).length;

export interface RowSummary {
  filled: number;
  total: number | null; // weighted points so far
  max: number | null; // sum of the weights
  grade: string | null; // only when every column is filled
}

const round1 = (n: number) => Math.round(n * 10) / 10;

// Each score counts as (score ÷ base mark) × terminal percentage
export function summarizeRow(columns: SheetColumn[], row: Record<string, string> | undefined): RowSummary {
  const cells = columns.map((c) => ({ c, v: (row?.[String(c.id)] ?? "").trim() }));
  const filled = cells.filter(({ v }) => v !== "").length;
  const computable = columns.length > 0 && columns.every((c) => !!c.max && c.weight !== null);
  if (!computable || filled === 0) return { filled, total: null, max: null, grade: null };

  const max = columns.reduce((s, c) => s + (c.weight as number), 0);
  const raw = cells.reduce((s, { c, v }) => {
    const n = Number(v);
    return v === "" || !Number.isFinite(n) ? s : s + (n / (c.max as number)) * (c.weight as number);
  }, 0);
  const grade = filled === columns.length && max > 0 ? computeGrade(raw, max) : null;
  return { filled, total: round1(raw), max, grade };
}