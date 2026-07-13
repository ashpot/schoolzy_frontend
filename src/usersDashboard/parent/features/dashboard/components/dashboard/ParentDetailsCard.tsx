import { MapPin, Mail, Phone, User } from "lucide-react";
import type { ParentDetails } from "../../types";

export default function ParentDetailsCard({ parent }: { parent: ParentDetails }) {
  const initials = parent.name
    .replace("Mrs.", "")
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-bg-input flex-center">
          <User size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Parent Details</h2>
      </div>

      <div className="flex flex-col items-center text-center border-b border-border-line02 pb-6 mb-6">
        <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex-center text-xl font-semibold mb-3">
          {initials}
        </div>
        <p className="font-semibold text-text-primary">{parent.name}</p>
        <span className="font-semibold mt-1 px-2.5 py-0.5 rounded-full text-xs bg-blue-50 text-brand-primary">
          {parent.gender}
        </span>
      </div>

      <div className="space-y-4 font-semibold">
        <DetailRow icon={MapPin} label="Address" value={parent.address} />
        <DetailRow icon={Mail} label="Email Address" value={parent.email} />
        <DetailRow icon={Phone} label="Phone Number" value={parent.phone} />
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-bg-input flex-center shrink-0">
        <Icon size={14} className="text-text-muted" />
      </div>
      <div>
        <p className="text-xs text-text-muted uppercase">{label}</p>
        <p className="text-body text-text-primary">{value}</p>
      </div>
    </div>
  );
}