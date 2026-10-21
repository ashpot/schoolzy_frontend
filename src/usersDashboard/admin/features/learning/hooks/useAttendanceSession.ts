import { useEffect, useRef, useState } from "react";
import { useLoadAttendanceStudents, useSaveAttendance } from "./useAttendance";
import { clearDraft, readDraft, writeDraft } from "../shared/utils/attendanceDraft";
import { localDateString } from "../shared/utils/attendanceMapper";
import type {
  AttendanceDraft, AttendanceSession, AttendanceStatus, AttendanceStudent,
} from "../types";

// Owns the in-progress attendance session and mirrors it to localStorage
// so leaving the page (or refreshing) never loses unsaved marks.
export function useAttendanceSession() {
  const loadMutation = useLoadAttendanceStudents();
  const saveMutation = useSaveAttendance();
  const [initialDraft] = useState<AttendanceDraft | null>(readDraft);

  const [session, setSession] = useState<AttendanceSession | null>(null);
  const [students, setStudents] = useState<AttendanceStudent[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [resumed, setResumed] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Own loading/error state: a mutation observer can be detached by a remount
  // (StrictMode, fast back-navigation) and would leave isPending stuck forever.
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | undefined>();
  const loadId = useRef(0); // ignores stale responses if load() is called again

  useEffect(() => {
    if (!session || saved) return;
    const marks = Object.fromEntries(students.map((s) => [s.id, s.status]));
    writeDraft({ ...session, marks, dirty, search, page });
  }, [session, students, dirty, saved, search, page]);

  // draft present → restore the saved marks on top of a fresh student list
  const load = async (classGroupId: string, className: string, draft?: AttendanceDraft) => {
    const id = ++loadId.current;
    const date = draft?.date ?? localDateString();
    setLoading(true);
    setLoadError(undefined);
    try {
      const { students: fresh, prefilled: existing } = await loadMutation.mutateAsync({
        classGroupId: Number(classGroupId),
        date,
      });
      if (id !== loadId.current) return;
      const marks = draft?.marks ?? {};
      setStudents(fresh.map((s) => (marks[s.id] ? { ...s, status: marks[s.id] } : s)));
      setSession({ classGroupId, className, date });
      setDirty(draft?.dirty ?? false);
      setSaved(false);
      setPrefilled(existing);
      setResumed(!!draft);
      setSearch(draft?.search ?? "");
      setPage(draft?.page ?? 1);
    } catch (e) {
      if (id !== loadId.current) return;
      setLoadError(e instanceof Error ? e.message : "Couldn't load students");
    } finally {
      if (id === loadId.current) setLoading(false);
    }
  };

  const discard = () => {
    loadId.current += 1; // invalidate any in-flight load
    clearDraft();
    setSession(null);
    setStudents([]);
    setDirty(false);
    setSaved(false);
    setPrefilled(false);
    setResumed(false);
    setSearch("");
    setPage(1);
    setLoading(false);
    setLoadError(undefined);
  };

  const edit = (fn: (prev: AttendanceStudent[]) => AttendanceStudent[]) => {
    setStudents(fn);
    setDirty(true);
    setSaved(false);
  };

  const toggleStatus = (id: string, status: AttendanceStatus) =>
    edit((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const next: AttendanceStatus = s.status === status ? "unmarked" : status;
        return { ...s, status: next };
      })
    );

  const markAllPresent = () =>
    edit((prev) => prev.map((s) => ({ ...s, status: "present" as const })));

  const resetAll = () =>
    edit((prev) => prev.map((s) => ({ ...s, status: "unmarked" as const })));

  const save = () => {
    if (!session) return;
    saveMutation.mutate(
      { classGroupId: Number(session.classGroupId), date: session.date, students },
      {
        onSuccess: () => {
          setDirty(false);
          setSaved(true);
          setPrefilled(true);
          setResumed(false);
        },
      }
    );
  };

  const changeSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return {
    initialDraft, session, students, dirty, saved, prefilled, resumed, search, page,
    locked: session !== null && !saved,
    isLoading: loading,
    loadError,
    isSaving: saveMutation.isPending,
    saveError: saveMutation.error?.message,
    load, discard, save, toggleStatus, markAllPresent, resetAll,
    setSearch: changeSearch,
    setPage,
  };
}