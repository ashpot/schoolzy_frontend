import React from "react";
import { User, X } from "lucide-react";

interface MessageOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const messages = [
  { sender: "Mrs. Adaeze", preview: "Please review the class schedule", time: "5 min ago" },
  { sender: "Mr. Emeka", preview: "Attendance has been updated", time: "30 min ago" },
];

const MessageOverlay: React.FC<MessageOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 z-50 mt-2 w-72 bg-white rounded-2xl py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-border-line02/60 animate-in fade-in-0 zoom-in-95 duration-150">
      <div className="flex items-center justify-between px-5 py-2 border-b border-border-line02/60 mb-1">
        <span className="text-sm font-semibold text-text-primary">Messages</span>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      {messages.map((m, i) => (
        <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-bg-soft transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary">{m.sender}</p>
            <p className="text-xs text-text-muted truncate">{m.preview}</p>
          </div>
          <span className="text-xs text-text-muted whitespace-nowrap">{m.time}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageOverlay;