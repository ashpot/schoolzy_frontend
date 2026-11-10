import { useMemo, useState } from "react";
import { useSaveAllScores, useSaveScore } from "./useManageScore";
import { scoreError } from "../utils/scoreEditing";
import type { EditableScoreRow, ScoreRow } from "../types/manageScore";

type Saved = { id: number; score: number };

// Holds what the user typed and which values count as "saved". Both are keyed by score id,
// so a background refetch or a filter change never wipes them.
export function useScoreEditor(serverRows: ScoreRow[] | undefined, max: number | null) {
  const rowMutation = useSaveScore();
  const allMutation = useSaveAllScores();
  const [saved, setSaved] = useState<Record<number, number>>({});
  const [drafts, setDrafts] = useState<Record<number, string>>({}); // only rows that differ from saved
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState<string | undefined>();

  const rows = useMemo<EditableScoreRow[]>(
    () =>
      (serverRows ?? []).map((r) => {
        const score = saved[r.id] ?? r.score;
        const draft = drafts[r.id];
        const dirty = draft !== undefined;
        return {
          ...r, score, dirty,
          draft: draft ?? String(score),
          error: dirty ? scoreError(draft, max) : "",
          overMax: max !== null && score > max,
        };
      }),
    [serverRows, saved, drafts, max]
  );

  const dirtyRows = rows.filter((r) => r.dirty);
  const errorCount = dirtyRows.filter((r) => r.error).length;

  const setDraft = (id: number, value: string) => {
    const current = rows.find((r) => r.id === id)?.score;
    setDrafts((prev) => {
      const next = { ...prev };
      if (value === String(current)) delete next[id];
      else next[id] = value;
      return next;
    });
    setError(undefined);
  };

  const commit = (items: Saved[]) => {
    setSaved((prev) => ({ ...prev, ...Object.fromEntries(items.map((i) => [i.id, i.score])) }));
    // Keep a draft if the user kept typing while the save was running
    setDrafts((prev) => {
      const next = { ...prev };
      items.forEach((i) => { if (i.id in next && Number(next[i.id]) === i.score) delete next[i.id]; });
      return next;
    });
  };

  const saveRow = async (id: number) => {
    const row = rows.find((r) => r.id === id);
    if (!row || !row.dirty || row.error) return;
    const item = { id, score: Number(row.draft) };
    setSavingId(id);
    setError(undefined);
    try {
      await rowMutation.mutateAsync(item);
      commit([item]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save the score");
    } finally {
      setSavingId(null);
    }
  };

  const saveAll = async () => {
    if (dirtyRows.length === 0 || errorCount > 0) return;
    const items = dirtyRows.map((r) => ({ id: r.id, score: Number(r.draft) }));
    setError(undefined);
    try {
      await allMutation.mutateAsync(items);
      commit(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save the scores");
    }
  };

  const resetAll = () =>
    setDrafts((prev) => {
      const next = { ...prev };
      rows.forEach((r) => delete next[r.id]);
      return next;
    });

  return {
    rows, dirtyCount: dirtyRows.length, errorCount, savingId, error,
    savingAll: allMutation.isPending,
    setDraft, saveRow, saveAll, resetAll,
  };
}

export type ScoreEditor = ReturnType<typeof useScoreEditor>;