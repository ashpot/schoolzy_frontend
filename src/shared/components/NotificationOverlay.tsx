import React from "react";
import { X } from "lucide-react";

interface NotificationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  { title: "New student enrolled", time: "2 min ago", unread: true },
  { title: "Term report submitted", time: "1 hr ago", unread: true },
  { title: "Teacher marked attendance", time: "3 hrs ago", unread: false },
];

const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 z-50 mt-2 w-72 bg-white rounded-2xl py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-border-line02/60 animate-in fade-in-0 zoom-in-95 duration-150">
      <div className="flex items-center justify-between px-5 py-2 border-b border-border-line02/60 mb-1">
        <span className="text-sm font-semibold text-text-primary">Notifications</span>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      {notifications.map((n, i) => (
        <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-bg-soft transition-colors cursor-pointer">
          <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.unread ? "bg-brand-primary" : "bg-transparent"}`} />
          <div>
            <p className="text-sm text-text-primary">{n.title}</p>
            <p className="text-xs text-text-muted mt-0.5">{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationOverlay;