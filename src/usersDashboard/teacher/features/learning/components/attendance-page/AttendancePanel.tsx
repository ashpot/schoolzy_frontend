import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCheck } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { avatarColor, getInitials } from "../../utils/avatar";
import AttendanceStatusToggle from "./AttendanceStatusToggle";
import type { AttendanceStudent, AttendanceStatusValue } from "../../types";
import SubmitButton from "@/shared/ui/SubmitButton";

const PAGE_SIZE = 10;

export default function AttendancePanel({
  className,
  students,
  onSave,
  isSaving,
}: {
  className: string;
  students: AttendanceStudent[];
  onSave: (students: AttendanceStudent[]) => void;
  isSaving: boolean;
}) {
  const [roster, setRoster] = useState<AttendanceStudent[]>(students);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [justSaved, setJustSaved] = useState(false);

  const filtered = roster.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = useMemo(() => {
    const present = roster.filter((s) => s.status === "Present").length;
    const absent = roster.filter((s) => s.status === "Absent").length;
    const late = roster.filter((s) => s.status === "Late").length;
    const unmarked = roster.length - present - absent - late;
    return { present, absent, late, unmarked, marked: present + absent + late };
  }, [roster]);

  const updateStatus = (id: string, status: Exclude<AttendanceStatusValue, null>) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    setRoster((prev) => prev.map((s) => (s.id === id ? { ...s, status, timeMarked: now } : s)));
  };

  const markAllPresent = () => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    setRoster((prev) => prev.map((s) => ({ ...s, status: "Present", timeMarked: now })));
  };

  const handleSave = () => {
    onSave(roster);
    setJustSaved(true);
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="p-6 pb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <h2 className="section-title">{className}</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-medium">
            {roster.length} Students
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={markAllPresent}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
          >
            <CheckCheck size={14} /> Mark All Present
          </button>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search student..."
              className="pl-8 pr-3 py-2 text-sm rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-56"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pb-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Pill color="bg-green-50 text-green-700">{counts.present} Present</Pill>
          <Pill color="bg-red-50 text-danger">{counts.absent} Absent</Pill>
          <Pill color="bg-amber-50 text-warning">{counts.late} Late</Pill>
          <Pill color="bg-gray-100 text-text-muted">{counts.unmarked} Unmarked</Pill>
        </div>
        {counts.unmarked > 0 && (
          <p className="text-xs text-warning">{counts.unmarked} students not yet marked</p>
        )}
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-text-muted">Marking progress</p>
          <p className="text-xs text-text-muted">{counts.marked}/{roster.length}</p>
        </div>
        <div className="h-1.5 rounded-full bg-bg-input overflow-hidden flex">
          <div className="h-full bg-green-600" style={{ width: `${(counts.present / roster.length) * 100}%` }} />
          <div className="h-full bg-danger" style={{ width: `${(counts.absent / roster.length) * 100}%` }} />
          <div className="h-full bg-warning" style={{ width: `${(counts.late / roster.length) * 100}%` }} />
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-t border-border-line02 text-xs text-text-muted uppercase tracking-wide">
            <th className="text-left font-medium px-6 py-3">#</th>
            <th className="text-left font-medium px-6 py-3">Student Name</th>
            <th className="text-left font-medium px-6 py-3">Attendance Status</th>
            <th className="text-left font-medium px-6 py-3">Time Marked</th>
          </tr>
        </thead>
        <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
          {pageItems.map((s, i) => (
            <motion.tr key={s.id} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
              <td className="px-6 py-4 text-body-small text-text-muted">{(page - 1) * PAGE_SIZE + i + 1}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex-center text-xs font-semibold ${avatarColor(s.name)}`}>
                    {getInitials(s.name)}
                  </div>
                  <div>
                    <p className="text-body-small text-text-primary font-medium">{s.name}</p>
                    <p className="text-xs text-text-muted">{s.admissionNumber}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <AttendanceStatusToggle value={s.status} onChange={(status) => updateStatus(s.id, status)} />
              </td>
              <td className="px-6 py-4 text-body-small text-text-muted">{s.timeMarked ?? "--:--"}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} students
        </p>
        <div className="flex items-center gap-1">
          <button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-2.5 py-1.5 rounded-lg text-text-muted hover:bg-bg-input disabled:opacity-40">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} type="button" onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-xs font-medium ${p === page ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-bg-input"}`}>{p}</button>
          ))}
          <button type="button" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-2.5 py-1.5 rounded-lg text-text-muted hover:bg-bg-input disabled:opacity-40">›</button>
        </div>
      </div>

      {/* Sticky save footer */}
      <div className="sticky bottom-0 flex items-center justify-between px-6 py-4 border-t border-border-line02 bg-white">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Pill color="bg-green-50 text-green-700">{counts.present} Present</Pill>
          <Pill color="bg-red-50 text-danger">{counts.absent} Absent</Pill>
          <Pill color="bg-amber-50 text-warning">{counts.late} Late</Pill>
          <span>{counts.unmarked} Unmarked</span>
        </div>
        <div className="flex items-center gap-3">
          {justSaved && !isSaving && (
            <span className="text-xs text-green-600 font-medium">Draft auto-saved</span>
          )}
          <button
            type="button"
            onClick={() => setRoster(students)}
            className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:bg-bg-input transition-colors"
          >
            Reset
          </button>
          <SubmitButton label="Save Attendance" isLoading={isSaving} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}

function Pill({ color, children }: { color: string; children: React.ReactNode }) {
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>{children}</span>;
}