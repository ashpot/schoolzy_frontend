import { useMemo, useRef, useState } from "react";
import { useLoadScoresheet, useSaveScores } from "./useUploadResults";
import { buildPayload, toInputs } from "../utils/scoresheetMapper";
import { countChanged, countProblems } from "../utils/scoreSheetMath";
import type { SaveSummary, ScoreInputs, Scoresheet, ScoresheetSetup } from "../types/uploadResults";

// Owns the loaded scoresheet and what the user has typed into it
export function useScoresheetSession() {
  const loadMutation = useLoadScoresheet();
  const saveMutation = useSaveScores();

  const [setup, setSetup] = useState<ScoresheetSetup | null>(null);
  const [sheet, setSheet] = useState<Scoresheet | null>(null);
  const [inputs, setInputs] = useState<ScoreInputs>({});
  const [original, setOriginal] = useState<ScoreInputs>({}); // values as last loaded or saved
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<SaveSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | undefined>();
  const loadId = useRef(0); // ignores stale responses

  const changedCount = useMemo(() => (sheet ? countChanged(sheet, inputs, original) : 0), [sheet, inputs, original]);
  const problemCount = useMemo(() => (sheet ? countProblems(sheet, inputs, original) : 0), [sheet, inputs, original]);

  // Own loading state: a mutation observer can be detached by a remount and stay "pending" forever
  const load = async (values: ScoresheetSetup) => {
    const id = ++loadId.current;
    setLoading(true);
    setLoadError(undefined);
    try {
      const data = await loadMutation.mutateAsync(values);
      if (id !== loadId.current) return;
      const initial = toInputs(data);
      setSetup(values);
      setSheet(data);
      setInputs(initial);
      setOriginal(initial);
      setSearch("");
      setSaved(null);
    } catch (e) {
      if (id !== loadId.current) return;
      setLoadError(e instanceof Error ? e.message : "Couldn't load the scoresheet");
    } finally {
      if (id === loadId.current) setLoading(false);
    }
  };

  const clear = () => {
    loadId.current += 1;
    setSetup(null);
    setSheet(null);
    setInputs({});
    setOriginal({});
    setSearch("");
    setSaved(null);
    setLoading(false);
    setLoadError(undefined);
    saveMutation.reset();
  };

  const setScore = (studentId: number, colId: number, value: string) => {
    setInputs((prev) => ({ ...prev, [String(studentId)]: { ...prev[String(studentId)], [String(colId)]: value } }));
    setSaved(null);
    if (saveMutation.isError) saveMutation.reset();
  };

  const resetChanges = () => setInputs(original);

  const save = async () => {
    if (!setup || !sheet || changedCount === 0 || problemCount > 0) return;
    const snapshot = inputs; // edits made while saving stay marked as unsaved
    try {
      const res = await saveMutation.mutateAsync(buildPayload(setup, sheet, snapshot, original));
      setOriginal(snapshot);
      setSaved({ created: res.created, updated: res.updated });
    } catch {
      /* shown through saveError */
    }
  };

  return {
    sheet, inputs, original, search, saved, changedCount, problemCount,
    loading, loadError,
    isSaving: saveMutation.isPending,
    saveError: saveMutation.error?.message,
    load, clear, setScore, resetChanges, save, setSearch,
  };
}