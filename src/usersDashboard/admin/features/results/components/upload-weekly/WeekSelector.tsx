interface Props {
  selectedWeek: number;
  onChange:     (week: number) => void;
}

export default function WeekSelector({ selectedWeek, onChange }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-label">Select Week *</label>
        <span className="text-xs font-medium px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
          Week {selectedWeek} selected · Max score: 10
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
          <button key={w} type="button" onClick={() => onChange(w)}
            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
              selectedWeek === w
                ? "bg-brand-primary text-white shadow-sm"
                : "border border-border-line02 text-text-secondary hover:border-brand-primary hover:text-brand-primary"
            }`}>
            {w}
          </button>
        ))}
      </div>
    </div>
  );
}