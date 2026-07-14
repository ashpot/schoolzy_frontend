import { CalendarCheck } from "lucide-react";
import { useRecentAttendance } from "../../hooks/useAttendance";

export default function RecentAttendanceList() {
  const { data: records = [], isLoading } = useRecentAttendance();

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center gap-2 p-6 pb-4">
        <h2 className="section-title">Recent Attendance</h2>
        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-medium">
          Last 5 Records
        </span>
      </div>

      <div className="divide-y divide-border-line02">
        {!isLoading &&
          records.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-blue-50 flex-center shrink-0">
                  <CalendarCheck size={16} className="text-brand-primary" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-body-small font-semibold text-text-primary">{r.className}</p>
                    <span className="px-2 py-0.5 rounded-full bg-bg-input text-text-secondary text-xs">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs">{r.present} Present</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-danger text-xs">{r.absent} Absent</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-warning text-xs">{r.late} Late</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-body font-bold text-green-600">{r.rate}%</p>
                <p className="text-xs text-text-muted">{r.totalStudents} students</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}